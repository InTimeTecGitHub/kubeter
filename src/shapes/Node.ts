import Konva from "konva";
import { Position } from "./Position";

export type NodeDelegate = Konva.Group | Konva.Shape;

export abstract class Node<T extends NodeDelegate = NodeDelegate> {

    constructor(
        protected readonly delegate: T
    ) { }

    get Id(): string {
        return this.delegate.id().toString();
    }

    get X(): number {
        return this.delegate.x();
    }

    get Y(): number {
        return this.delegate.y();
    }

    get Z(): number {
        return this.delegate.zIndex();
    }

    set Z(z: number) {
        this.delegate.zIndex(z);
    }


    get Center(): Position {
        return new Position(
            this.X + this.Width * 0.5,
            this.Y + this.Height * 0.5
        );
    }

    get Position(): Position {
        return new Position(
            this.delegate.position().x,
            this.delegate.position().y);
    }

    set Position(position: Position) {
        this.delegate.position(position);
    }

    set Offset(offset: Position) {
        this.delegate.offsetX(offset.x);
        this.delegate.offsetY(offset.y);
    }

    get Offset() {
        return new Position(this.delegate.offset().x, this.delegate.offset().y);
    }

    get Width(): number {
        return this.delegate.width();
    }

    set Width(v: number) {
        this.delegate.width(v);
    }

    get Height(): number {
        return this.delegate.height();
    }

    set Height(v: number) {
        this.delegate.height(v);
    }

    get ScaleX(): number {
        return this.delegate.scaleX();
    }

    get ScaleY(): number {
        return this.delegate.scaleY();
    }

    get Scale(): number {
        let scale = this.delegate.scale();
        return scale.x || scale.y;
    }

    set Scale(scale: number) {
        this.delegate.scale({
            x: scale,
            y: scale
        });
    }

    get IsVisible() {
        return this.delegate.isVisible();
    }

    set Size(size: { width: number, height: number }) {
        this.delegate.size(size);
    }

    get Size() {
        return this.delegate.getSize();
    }

    hide = () => this.delegate.hide();
    show = () => this.delegate.show();
    add: (...el: Node[]) => NodeDelegate[] = (...el: Node[]) =>
        el.map(e => (<Konva.Group>this.delegate).add(e.delegate));
    destroy = () => {
        this.delegate.remove();
        this.delegate.destroy();
    };

    moveToTop = () => this.delegate.moveToTop();
    moveToBottom = () => this.delegate.moveToBottom();
}       
