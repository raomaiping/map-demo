
// #region exportMap
export const exportMap = (map, filename = "map.png") => {
    map.once("rendercomplete", function () {
        const mapCanvas = document.createElement("canvas");
        const size = map.getSize();
        mapCanvas.width = size[0];
        mapCanvas.height = size[1];
        const mapContext = mapCanvas.getContext("2d");
        Array.prototype.forEach.call(
            map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
            (canvas) => {
                if (canvas.width > 0) {
                    const opacity =
                        canvas.parentNode.style.opacity || canvas.style.opacity;
                    mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);

                    const backgroundColor = canvas.parentNode.style.backgroundColor;
                    if (backgroundColor) {
                        mapContext.fillStyle = backgroundColor;
                        mapContext.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    let matrix;
                    const transform = canvas.style.transform;
                    if (transform) {
                        // Get the transform parameters from the style's transform matrix
                        matrix = transform
                            .match(/^matrix\(([^(]*)\)$/)[1]
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
        if (navigator.msSaveBlob) {
            // 链接下载属性不能在MS浏览器上工作
            navigator.msSaveBlob(mapCanvas.msToBlob(), filename);
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