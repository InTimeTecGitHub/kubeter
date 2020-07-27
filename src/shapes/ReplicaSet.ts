import Konva from "konva";
import { DomEvent } from "./enums/DomEvent";
import { Resource } from "./Resource";
import { Pod } from "./Pod";
import { Position } from "./Position";
import { SymImage } from "./SymImage";

export class ReplicaSet extends Resource {

    private containers: Number;
    constructor(rectConfig: Konva.RectConfig, image: SymImage) {
        super(rectConfig, image);
        this.containers = 0;
    }
    get Containers() {
        return this.containers;
    }
}
