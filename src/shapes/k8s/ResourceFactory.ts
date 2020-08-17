import { Resource } from "./Resource";
import { Namespace } from "./Namespace";
import { SymImage } from "../SymImage";
import { Pod } from "./Pod";
import { ReplicaSet } from "./ReplicaSet";

export class ResourceFactory {
    static get(name: string, img: SymImage, dimensions: { w: number, h: number }): Resource {
        switch (name) {
            case "ns.svg":
                let config = {
                    x: img.X - dimensions.w / 10,
                    y: img.Y + dimensions.h / 10,
                    width: dimensions.w,
                    height: dimensions.h,
                    stroke: 'black',
                    strokeWidth: 2,
                    dashEnabled: true,
                    dash: ([2, 4])
                }
                return new Namespace(config, img);
            case "pod.svg":
                return new Pod(config, img);
            case "rs.svg":
                return new ReplicaSet(config, img);
        }
        throw new Error("Cannot find resource.");
    }
}