
import Nain from "./Nain";


export default class ChefNain extends Nain {

    constructor() {
        super()

        this.type = "ChefNain"
    }

    protected getResistance(): number{
        return super.getResistance()*0.5
    }

    public getCost(): number {
        return super.getCost() + 1
    }

}
