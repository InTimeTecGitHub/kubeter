import Konva from "konva";
import { Resource } from "./Resource";
import { SymImage } from "../SymImage";

export class Service extends Resource {
    // delegate: any;
    // private group: Konva.Group;
    constructor(lineConfig: Konva.LineConfig, image: SymImage) {
        super({}, image);
        // this.delegate = new Konva.Line(lineConfig);
        // this.group = new Konva.Group();
        // this.group.add(this.delegate);
        // this.group.add(image);
        this.delegate.zIndex(0);
    }

    // get Group() {
    //     return this.group;
    // }
}