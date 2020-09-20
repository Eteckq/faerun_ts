

import Guerrier from "./Guerrier";


export default class Nain extends Guerrier {
    type = "Nain"
    constructor() {
        super()
    }

    protected getResistance(): number{
        return super.getResistance()*0.75
    }

    protected getStrength(): number{
        return super.getStrength() * 0.75
    }

    public getCost(): number {
        return 1
    }

}
