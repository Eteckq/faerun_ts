

import Guerrier from "./Guerrier";


export default class Nain extends Guerrier {
    type = "Nain"
    constructor() {
        super()
    }

    protected getResistance(): number{
        return super.getResistance()*0.5
    }

    public getCost(): number {
        return 1
    }

}
