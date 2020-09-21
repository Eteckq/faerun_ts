import Elfe from "./Elfe";


export default class ChefElfe extends Elfe {
    type = "ChefElfe"
    constructor() {
        super()
    }

    protected getStrength(): number{
        return super.getStrength() * 4
    }
    
    public getCost(): number {
        return 4
    }
}
