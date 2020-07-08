import Konva from "konva";
import { Node } from "./Node";
import { DomEvent } from "./enums/DomEvent";
import { Observable, Subject } from "rxjs";
import { KonvaEventObject } from "konva/types/Node";
import { multicast, refCount } from "rxjs/operators";

export type EventType = Event | WheelEvent;

export class Resource extends Node {

	private events = new Map<DomEvent, Observable<KonvaEventObject<EventType>>>();
	delegate: Konva.Rect;

	private group: Konva.Group;
	private image: Konva.Image;
	constructor(rectConfig: Konva.RectConfig, image: Konva.Image) {
		super();
		this.group = new Konva.Group();
		this.delegate = new Konva.Rect(rectConfig);
		this.image = image;
		this.group.add(this.delegate);
		this.group.add(this.image);
	}

	get Group() {
		return this.group;
	}

	private fromEvent = (event: DomEvent) =>
		new Observable<KonvaEventObject<EventType>>(obs => {
			this.delegate.on(event, e => obs.next(e));
			return () => {
				this.delegate.off(event);
			};
		}).pipe(multicast(new Subject()), refCount())

	observer = (event: DomEvent) => {
		let ev = this.events.get(event);
		if (!ev) {
			ev = this.fromEvent(event);
			this.events.set(event, ev);
		}
		return ev;
	}

}
