// #region exportMap
import type { Map as olMapType } from "ol";
export const exportMap = (map: olMapType | null, filename = "map.png") => {
    if (map === null) return
    map.once("rendercomplete", function () {
        const mapCanvas = document.createElement("canvas");
        const size = map.getSize() || [];
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        const mapContext = mapCanvas.getContext("2d");
        if (mapContext === null) return
        Array.prototype.forEach.call(
            map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
            (canvas: HTMLCanvasElement) => {
                if (canvas.width > 0 && canvas.parentElement !== null) {
                    const opacity =
                        canvas.parentElement.style.opacity || canvas.style.opacity;
                    mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);

                    const backgroundColor = canvas.parentElement.style.backgroundColor;
                    if (backgroundColor) {
                        mapContext.fillStyle = backgroundColor;
                        mapContext.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    let matrix: number[];
                    const transform = canvas.style.transform;
                    if (transform) {
                        // Get the transform parameters from the style's transform matrix
                        matrix = transform.match(/^matrix\(([^(]*)\)$/)![1]
                            .split(",")
                            .map(Number);
                    } else {
                        matrix = [
                            parseFloat(canvas.style.width) / canvas.width,
                            0,
                            0,
                            parseFloat(canvas.style.height) / canvas.height,
                            0,
                            0,
                        ];
                    }
                    // Apply the transform to the export map context
                    CanvasRenderingContext2D.prototype.setTransform.apply(
                        mapContext,
                        matrix
                    );
                    mapContext.drawImage(canvas, 0, 0);
                }
            }
        );
        mapContext.globalAlpha = 1;
        if ((navigator as any).msSaveBlob) {
            // 链接下载属性不能在MS浏览器上工作
            (navigator as any).msSaveBlob((mapCanvas as any).msToBlob(), filename);
        } else {
            const downloadElement = document.createElement("a");
            downloadElement.href = mapCanvas.toDataURL();
            downloadElement.download = filename;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            // 移除a标签；
            document.body.removeChild(downloadElement);
        }
    });
    map.renderSync();
};
// #endregion exportMap