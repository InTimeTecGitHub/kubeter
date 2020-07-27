import Konva from "konva";
import { Node } from "./Node";
import { DomEvent } from "./enums/DomEvent";
import { Observable, Subject } from "rxjs";
import { multicast, refCount } from "rxjs/operators";
import { KonvaEventObject } from "konva/types/Node";
import { SymImage } from "./SymImage";

export class Resource extends Node<Konva.Group> {

    get Name() {
        return this.delegate.name;
    }

    get Group() {
        return this.delegate;
    }

    private events = new Map<DomEvent, Observable<KonvaEventObject<DomEvent>>>();
    private image: SymImage;

    constructor(config: Konva.ContainerConfig, image?: SymImage) {
        super(new Konva.Group(config));
        if (image) {
            this.image = image;
            this.delegate.add(image.Image);
        }
    }

    //TODO: use this only for testing.
    // toDataURL = () => new Promise<string>((resolve, reject) =>
    //     this.delegate.toDataURL({
    //         callback: (data: any) => {
    //             try {
    //                 var base64Data = data.replace(/^data:image\/png;base64,/, "");
    //                 resolve(base64Data);
    //             } catch (ex) {
    //                 console.log(ex);
    //                 reject(ex);
    //             }
    //         }
    //     }));

    fromEvent = (event: DomEvent) =>
        new Observable<KonvaEventObject<DomEvent>>(obs => {
            this.delegate.on(event, e => obs.next(e));
            return () => {
                this.delegate.off(event);
            };
        }).pipe(multicast(new Subject()), refCount());

    observer = (event: DomEvent) => {
        let ev = this.events.get(event);
        if (!ev) {
            ev = this.fromEvent(event);
            this.events.set(event, ev);
        }
        return ev;
    };

}
