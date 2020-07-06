import Konva from "konva";
import {DomEvent} from "./enums/DomEvent";
import {Resource} from "./Resource";

export class Pod extends Resource {

    constructor(rectConfig: Konva.RectConfig, image: Konva.Image) {
        super(rectConfig, image);
    }

    on = (eventName: DomEvent, handler: Function) =>
        this.delegate.on(eventName, (e) => handler(e.target))
    off = (eventName: string) => this.delegate.off(eventName);
    
}