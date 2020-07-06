import Konva from "konva";
import {Node} from "./Node";

export class Service extends Node {
    delegate: any;
    private group: Konva.Group;
    constructor(lineConfig: Konva.LineConfig, image: Konva.Image) {
        super();
        this.delegate = new Konva.Line(lineConfig);
        this.group = new Konva.Group();
        this.group.add(this.delegate);
        this.group.add(image);
        this.delegate.zIndex(0);
    }

    get Group() {
        return this.group;
    }
}