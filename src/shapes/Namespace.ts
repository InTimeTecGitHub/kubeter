import Konva from "konva";
import { Node } from "./Node";
import { DomEvent } from "./enums/DomEvent";
import { Observable, Subject } from "rxjs";
import { KonvaEventObject } from "konva/types/Node";
import { multicast, refCount } from "rxjs/operators";
import { Resource } from "./Resource";
import { SymImage } from "./SymImage";

export class Namespace extends Resource {

    constructor(rectConfig: Konva.RectConfig, image: SymImage) {
        super(rectConfig, image);
    }
}
