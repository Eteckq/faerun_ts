import Elfe from "./Elfe";


export default class ChefElfe extends Elfe {

    constructor() {
        super()
        this.type = "ChefElfe"
    }

    protected getStrength(): number{
        return super.getStrength() * 2
    }
    
    public getCost(): number {
        return super.getCost() + 2
    }
}
