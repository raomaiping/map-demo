import { Overlay } from "ol";
import { getLength, getArea } from "ol/sphere";
import { Style, Fill, Stroke, Circle } from "ol/style";
import { Draw } from "ol/interaction";
import { Vector } from "ol/layer"
/**
 * 创建一个新的帮助提示框（tooltip）
 * @param {Element} helpTooltipElement  帮助提示框对象
 * @param {ol.Map} map  地图实例
 */
export function createHelpTooltip({ helpTooltipElement, map }) {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    const newHelpTooltipElement = document.createElement("div");
    newHelpTooltipElement.className = "tooltip hidden";
    const helpTooltip = new Overlay({
        element: newHelpTooltipElement,
        offset: [15, 0],
        positioning: "center-left",
    });
    map.addOverlay(helpTooltip);
    return [newHelpTooltipElement, helpTooltip]
}


/**
* 创建一个新的测量工具提示框（tooltip）
* @param {Element} measureTooltipElement  测量工具提示框对象
* @param {ol.Map} map  地图实例
*/
export function createMeasureTooltip({ measureTooltipElement, map }) {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    const newMeasureTooltipElement = document.createElement("div");
    newMeasureTooltipElement.className = "tooltip tooltip-measure";
    const measureTooltip = new Overlay({
        element: newMeasureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
    });
    map.addOverlay(measureTooltip);
    return [newMeasureTooltipElement, measureTooltip]
}

/**
 * 测量长度输出
 * @param {boolean} checked 是否使用测地学方法测量
 * @param {ol.geom.LineString} line
 * @param {ol.Map} map  地图实例
 * @return {string}
 */
export function formatLength({ checked, line, map }) {
    let length;
    if (checked) {
        //若使用测地学方法测量
        const sourceProj = map.getView().getProjection(); //地图数据源投影坐标系
        length = getLength(line, {
            projection: sourceProj,
            radius: 6378137,
        });
    } else {
        length = Math.round(line.getLength() * 100) / 100; //直接得到线的长度
    }
    let output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km"; //换算成KM单位
    } else {
        output = Math.round(length * 100) / 100 + " " + "m"; //m为单位
    }
    return output; //返回线的长度
}

/**
 * 测量面积输出
 * @param {boolean} checked 是否使用测地学方法测量
 * @param {ol.geom.Polygon} polygon
 * @param {ol.Map} map  地图实例
 * @return {string}
 */
export function formatArea({ checked, polygon, map }) {
    let area;
    if (checked) {
        //若使用测地学方法测量
        const sourceProj = map.getView().getProjection(); //地图数据源投影坐标系
        const geom = /** @type {ol.geom.Polygon} */ (
            polygon.clone().transform(sourceProj, "EPSG:4326")
        ); //将多边形要素坐标系投影为EPSG:4326
        area = Math.abs(
            getArea(geom, { projection: sourceProj, radius: 6378137 })
        ); //获取面积
    } else {
        area = polygon.getArea(); //直接获取多边形的面积
    }
    let output;
    if (area > 10000) {
        output =
            Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>"; //换算成KM单位
    } else {
        output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>"; //m为单位
    }
    return output; //返回多边形的面积
}
/**
 * 绘制几何图形
 * @param {ol.source.Vector} source 测量绘制层数据源
 * @param {ol.geom.GeometryType} type 几何图形类型
 * @return 返回绘制好的几何图形
 */
export function drawGeometricFigure({ source, type }) {
    return new Draw({
        source, //测量绘制层数据源
        type, /** @type {ol.geom.GeometryType} 几何图形类型 */
        style: new Style({
            //绘制几何图形的样式
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)",
            }),
            stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.5)",
                lineDash: [10, 10],
                width: 2,
            }),
            image: new Circle({
                radius: 5,
                stroke: new Stroke({
                    color: "rgba(0, 0, 0, 0.7)",
                }),
                fill: new Fill({
                    color: "rgba(255, 255, 255, 0.2)",
                }),
            }),
        }),
    });
}

// 创建测量的绘制矢量层
export function createVector(source) {
    return new Vector({
        source,
        style: new Style({
            //图层样式
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)", //填充颜色
            }),
            stroke: new Stroke({
                color: "#ffcc33", //边框颜色
                width: 2, // 边框宽度
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: "#ffcc33",
                }),
            }),
        }),
    })
}