import Konva from "konva";
import {DomEvent} from "./enums/DomEvent";
import {Resource} from "./Resource";
import {Pod} from "./Pod";
import {Position} from "./Position";

export class ReplicaSet extends Resource {

    private containers: Number;
    constructor(rectConfig: Konva.RectConfig, image: Konva.Image) {
        super(rectConfig, image);
        this.Group.draggable(true);
        this.containers = 0;
    }

    on = (eventName: DomEvent, handler: Function) =>
        this.delegate.on(eventName, (e) => handler(e.target))
    off = (eventName: string) => this.delegate.off(eventName);

    get Containers() {
        return this.containers;
    }
    
    addPods() {
        let containers = prompt("How many pods?", "0");
        if (containers != null && Number(containers) != 0) {
            this.containers = Number(containers);
            for (let it = 0; it < Number(containers); it++) {
                Konva.Image.fromURL("./assets/pod.svg", (darthNode: Konva.Image) => {
                    darthNode.setAttrs({
                        x: 55 * it,
                        y: 30,
                        scaleX: 0.7,
                        scaleY: 0.7,
                        offsetX: -10,
                        offsetY: -10,
                    });
                    this.Group.add(darthNode);
                })
            }
        }
    }
}