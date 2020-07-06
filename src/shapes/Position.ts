export class Position {

        get X() {
                return this.x;
        }

        get Y() {
                return this.y;
        }

        constructor(
            public x: number,
            public y: number
        ) {
        }

        equals(point: Position) {
                return this.X === point.X && this.Y === point.Y;
        }
}
