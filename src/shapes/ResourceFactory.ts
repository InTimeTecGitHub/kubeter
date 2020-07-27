import { Resource } from "./Resource";
import { Namespace } from "./Namespace";
import { SymImage } from "./SymImage";
import { Pod } from "./Pod";
import { ReplicaSet } from "./ReplicaSet";

export class ResourceFactory {
    static get(name: string, img: SymImage): Resource {
        switch (name) {
            case "ns.svg":
                return new Namespace({ draggable: true }, img);
            case "pod.svg":
                return new Pod({ draggable: true }, img);
            case "rs.svg":
                return new ReplicaSet({ draggable: true }, img);
        }
        throw new Error("Cannot find resource.");
    }
}