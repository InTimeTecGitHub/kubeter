import Konva from "konva";
import {Node} from "./Node";
import {DomEvent} from "./enums/DomEvent";

export class Secret extends Node {

    delegate: Konva.Image;
    private group: Konva.Group;
    private secretData: Object;
    constructor(image: Konva.Image) {
        super();
        this.group = new Konva.Group();
        this.delegate = image;
        this.group.add(this.delegate);
        this.secretData = {};
    }

    get Group() {
        return this.group;
    }
    
    getData = () => {
        let secretData = prompt("Paste in here the secret data in JSON format \n(Including braces)", "");
        if (secretData != null) {
            this.secretData = JSON.parse(secretData);
            return true;
        }
    }

    get SecretData() {
        return this.secretData;
    }
}