import Konva from "konva";
import { Resource } from "./Resource";
import { SymImage } from "../SymImage";
import { Kubeter } from "../Kubeter";

export class Namespace extends Resource {
    private rect: Konva.Rect;
    constructor(rectConfig: Konva.RectConfig, image: SymImage) {
        super({ draggable: true }, image);
        this.rect = new Kubeter.Instance.Rect(rectConfig);
        this.delegate.add(this.rect);
    }
}
