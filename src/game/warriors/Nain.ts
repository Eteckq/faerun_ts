

import Guerrier from "./Guerrier";


export default class Nain extends Guerrier {
    type = "Nain"
    constructor() {
        super()
    }

    protected getResistance(): number{
        return super.getResistance() + 0.25
    }

    protected getStrength(): number{
        return 2
    }

    public getCost(): number {
        return 1
    }

}
