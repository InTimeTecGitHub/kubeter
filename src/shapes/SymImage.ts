import Konva from "konva";
import { Node } from "./Node";
import { Observable, Subject } from "rxjs";
import { KonvaEventObject } from "../../node_modules/konva/types/Node";
import { refCount, multicast } from "rxjs/operators";
import { DomEvent } from "./enums/DomEvent";
import { Kubeter } from "./Kubeter";

export class SymImage extends Node<Konva.Group> {

    private events = new Map<DomEvent, Observable<KonvaEventObject<DomEvent>>>();
    private readonly image: Konva.Image;

    constructor(config?: Konva.ImageConfig) {
        super(new Kubeter.Instance.Group(config));
        this.image = new Kubeter.Instance.Image(config);
        this.delegate.add(this.image)
    }

    get Image(): Konva.Image {
        return this.image;
    }

    load(url: string): Promise<SymImage> {
        if (!this.delegate) {
            throw new Error("No image set.");
        }
        return new Promise(resolve => {
            Konva.Image.fromURL(url, (img: Konva.Image) => {
                this.image.image(img.image());
                resolve(this);
            });
        });
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

    get Radius(): number {
        return 0.5 * Math.sqrt(
            (Math.pow(this.Height, 2)) +
            (Math.pow(this.Width, 2))
        );
    }
}
