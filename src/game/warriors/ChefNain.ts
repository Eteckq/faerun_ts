
import Nain from "./Nain";


export default class ChefNain extends Nain {
    type = "ChefNain"
    constructor() {
        super()

    }

    public getResistance(): number{
        return super.getResistance() + 0.25
    }

    protected getStrength(): number{
        return super.getStrength() + 5
    }

    public getCost(): number {
        return 3
    }

}
