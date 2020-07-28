import Konva from "konva";
import { Resource } from "./Resource";
import { SymImage } from "../SymImage";
import { Kubeter } from "../Kubeter";

export class Secret extends Resource {

    // delegate: Konva.Image;
    private group: Konva.Group;
    private secretData: Object;
    constructor(image: SymImage) {
        super({}, image);
        this.group = new Kubeter.Instance.Group();
        // this.delegate = image;
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