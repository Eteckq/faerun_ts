

import Guerrier from "./Guerrier";


export default class Elfe extends Guerrier {

    constructor() {
        super()

        this.type = "Elfe"
    }

    protected getStrength(): number{
        return super.getStrength() * 2
    }
    
    public getCost(): number {
        return super.getCost() + 1
    }
}
