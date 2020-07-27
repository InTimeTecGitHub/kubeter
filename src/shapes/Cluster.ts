import { Resource } from "./Resource";
import Konva from "konva";
import { StageConfig } from "konva/types/Stage";
import { DomEvent } from "./enums/DomEvent";
import { Node } from "./Node";
import { Observable, fromEvent } from "rxjs";
import { tap } from "rxjs/operators";
import { KonvaEventObject } from "konva/types/Node";
import { SymImage } from "./SymImage";
import { ResourceFactory } from "./ResourceFactory";

export class Cluster extends Node<Konva.Stage> {
    private readonly layer: Konva.Layer;
    private events = new Map<DomEvent, Observable<KonvaEventObject<DomEvent>>>();
    private dragTarget: string;
    private resources: Resource[] = [];
    private drop$: Observable<Event>;

    constructor(config: StageConfig) {
        super(new Konva.Stage(config))
        this.layer = new Konva.Layer();
        this.delegate.add(this.layer);
        var con = this.delegate.container();
        con.addEventListener(DomEvent.DRAG_OVER, e => e.preventDefault());
        //@ts-expect-error
        document.getElementById("drag-items")?.addEventListener(DomEvent.DRAG_START, e => this.dragTarget = e.target?.src);

        this.drop$ = fromEvent(con, "drop").pipe(tap(e => {
            e.preventDefault();
            this.delegate.setPointersPositions(e);
        }));

        //TODO: This should be moved out.
        this.drop$.subscribe(async (e) => {
            let pos = this.delegate.getPointerPosition()
            let img = new SymImage({
                x: pos.x,
                y: pos.y,
                image: undefined
            });
            await img.load(this.dragTarget);
            let resource = ResourceFactory.get(this.DragTargetName, img);
            this.layer.add(resource.Group);
            this.layer.batchDraw();
        });
    }

    private get DragTargetName(): string {
        return this.dragTarget.replace(`${origin}/main_window/assets/`, "");
    }
}
