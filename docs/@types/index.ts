import { Point } from 'ol/geom'
import { Coordinate } from 'ol/coordinate'
import { Vector as VectorSource } from 'ol/source'

export interface VectorLabelOptions {
    coordinate: Coordinate;
    vectorSource: VectorSource | VectorSource<Point> | null;
    name?: string;
    imageUrl?: string
}