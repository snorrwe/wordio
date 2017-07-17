import { MongoItem } from './mongo.template';

export interface Tile extends MongoItem {
    filled?: boolean;
    value: string;
    x: number;
    y: number;
}
