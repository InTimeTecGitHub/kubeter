import { Cluster } from "../../../src/shapes/k8s/Cluster";
import { expect } from "chai";

describe("shapes.k8s.Cluster", () => {
    const container = "container"
    before(() => {
        let div = document.createElement("div")
        div.id = container
        document.body.appendChild(div)
    })
    it("should create an empty canvas", () => {
        let cluster = new Cluster({ width: 1000, height: 1000, container: container })
        expect(cluster).to.be.not.undefined;
    });

});
