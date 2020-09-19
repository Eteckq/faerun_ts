

import Guerrier from "./Guerrier";


export default class Nain extends Guerrier {

    constructor() {
        super()

        this.type = "Nain"
    }

    protected getResistance(): number{
        return super.getResistance()*0.5
    }

    public getCost(): number {
        return super.getCost() + 1
    }

}
