import Konva from "konva";
import { Node } from "../Node";
import { Resource } from "./Resource";
import { SymImage } from "../SymImage";

export class Ingress extends Resource {
	constructor(lineConfig: Konva.LineConfig, image:SymImage) {
		super({}, image);
		this.delegate.add(this.delegate);
		// this.group.add(image);
		this.delegate.zIndex(0);
	}
}
