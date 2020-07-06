import Konva from "konva";
import { Node } from "./Node";

export class ConfigMap extends Node {

	delegate: Konva.Image;
	private group: Konva.Group;
	private configuration: Object;
	constructor(image: Konva.Image) {
		super();
		image.setAttrs({
			x: 100,
			y: 80,
			scaleX: 0.8,
			scaleY: 0.8,
		});
		this.group = new Konva.Group({ draggable: true });
		this.delegate = image;
		this.group.add(this.delegate);
		this.configuration = {};
	}

	get Group() {
		return this.group;
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
