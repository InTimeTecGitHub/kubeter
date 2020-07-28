import Konva from "konva"

export class Kubeter {
    private static instance: typeof Konva
    static get Instance(): typeof Konva {
        if(!this.instance) this.instance = Konva;
        return this.instance;
    }

    static set Instance(konva: typeof Konva) {
        this.instance = konva;
    }
}
