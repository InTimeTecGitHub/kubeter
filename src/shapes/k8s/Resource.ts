import Konva from "konva";
import { Node } from "../Node";
import { DomEvent } from "../enums/DomEvent";
import { Observable, Subject } from "rxjs";
import { multicast, refCount } from "rxjs/operators";
import { KonvaEventObject } from "../../../node_modules/konva/types/Node";
import { SymImage } from "../SymImage";
import { Kubeter } from "../Kubeter";

export class Resource extends Node<Konva.Group> {

    get Name() {
        return this.delegate.name;
    }

    get Group() {
        return this.delegate;
    }

    private events = new Map<DomEvent, Observable<KonvaEventObject<DomEvent>>>();
    protected image: SymImage;

    constructor(config: Konva.ContainerConfig, image?: SymImage) {
        super(new Kubeter.Instance.Group(config));
        if (image) {
            this.image = image;
            this.delegate.add(image.Image);
        }
    }

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
