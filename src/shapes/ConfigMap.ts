import Konva from "konva";
import { Node } from "./Node";
import { Resource } from "./Resource";
import { SymImage } from "./SymImage";

export class ConfigMap extends Resource {

	// delegate: Konva.Image;
	// private group: Konva.Group;
	private configuration: Object;
	constructor(image: SymImage) {
		super({}, image);
		// image.setAttrs({
		// 	x: 100,
		// 	y: 80,
		// 	scaleX: 0.8,
		// 	scaleY: 0.8,
		// });
		// this.group = ;
		// this.delegate = image;
		// this.delegate.add(image);
		this.configuration = {};
	}

	storeConfig = () => {
		let configuration = prompt("Paste configuration in JSON format", "");
		if (configuration != null && configuration !== "") {
			this.configuration = JSON.parse(configuration);
			return true;
		}
	}

	get configurations() {
		return this.configuration;
	}
}
