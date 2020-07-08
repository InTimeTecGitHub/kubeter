import Konva from "konva";
import {Node} from "./Node";
import {DomEvent} from "./enums/DomEvent";
import {Observable, Subject} from "rxjs";
import {KonvaEventObject} from "konva/types/Node";
import {multicast, refCount} from "rxjs/operators";
import {Resource} from "./Resource";

export class Namespace extends Resource {

        constructor(rectConfig: Konva.RectConfig, image: Konva.Image) {
                super(rectConfig, image);
				this.Group.draggable(true);
        }
}
