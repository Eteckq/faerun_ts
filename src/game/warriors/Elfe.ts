

import Guerrier from "./Guerrier";


export default class Elfe extends Guerrier {
    type: string  = "Elfe";

    constructor() {
        super()
    }

    protected getStrength(): number{
        return super.getStrength() + 5
    }
    
    public getCost(): number {
        return 2
    }
}
