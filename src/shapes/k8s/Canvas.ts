import { Resource } from "./Resource";
import Konva from "konva";
//TODO: Karma will not be able to resolve path if path is "konva/types/Stage. Investigation required."
import { StageConfig } from "../../../node_modules/konva/types/Stage";
import { DomEvent } from "../enums/DomEvent";
import { Node } from "../Node";
import { Observable, fromEvent } from "rxjs";
import { tap } from "rxjs/operators";
import { SymImage } from "../SymImage";
import { ResourceFactory } from "./ResourceFactory";
import { Kubeter } from "../Kubeter";
import { K8sCanvasID } from "../../constants";

export class Canvas extends Node<Konva.Stage> {
    private readonly layer: Konva.Layer;
    private dragTarget: string;
    private resources: Resource[] = [];
    private drop$: Observable<Event>;

    get Group() {
        return this.delegate;
    }

    resize = (h: number, w: number) => {
        var container = document.getElementById(K8sCanvasID);
        var containerWidth = container.offsetWidth;
        var scale = containerWidth / w;
        this.delegate.height(h * scale);
        this.delegate.width(w * scale);
        this.delegate.scale({ x: scale, y: scale });
        this.delegate.batchDraw();
    };

    constructor(config: StageConfig) {
        super(new Kubeter.Instance.Stage(config))
        this.layer = new Kubeter.Instance.Layer();
        this.delegate.add(this.layer);
        var con = this.delegate.container();
        con.addEventListener(DomEvent.DRAG_OVER, e => e.preventDefault());
        //@ts-expect-error
        document.getElementById("drag-items")?.addEventListener(DomEvent.DRAG_START, e => this.dragTarget = e.target?.src);

        this.drop$ = fromEvent(con, "drop").pipe(tap(e => {
            e.preventDefault();
            this.delegate.setPointersPositions(e);
        }));

        // window.onresize = () => this.resize(config.height, config.width)

        this.drop$.subscribe(async () => {
            let pos = this.Pointer;
            let img = new SymImage({
                x: pos.x,
                y: pos.y,
                image: undefined
            });
            await img.load(this.dragTarget);

            let dimensions = {
                w: this.Width * (.5 / this.Scale),
                h: this.Height * (.5 / this.Scale)
            }
            let resource = ResourceFactory.get(this.DragTargetName, img, dimensions);
            this.resources.push(resource);
            this.layer.add(resource.Group);
            this.layer.batchDraw();
        });

        //TODO: hack to resize on first window.
        this.resize(config.height, config.width);
    }

    private get DragTargetName(): string {
        return this.dragTarget.replace(`${origin}/main_window/assets/img/`, "");
    }

    private get Pointer() {
        let transform = this.delegate.getAbsoluteTransform().copy().invert();
        return transform.point(this.delegate.getPointerPosition());
    }
}
