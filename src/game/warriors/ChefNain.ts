
import Nain from "./Nain";


export default class ChefNain extends Nain {
    type = "ChefNain"
    constructor() {
        super()

    }

    protected getResistance(): number{
        return super.getResistance()*0.75
    }

    protected getStrength(): number{
        return super.getStrength() * 1.5
    }

    public getCost(): number {
        return 3
    }

}
