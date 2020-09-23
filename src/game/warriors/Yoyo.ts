

import Guerrier from "./Guerrier";


export default class Yoyo extends Guerrier {
    type = "Yoyo"
    constructor() {
        super()
    }

    protected getResistance(): number{
        return 0.50
    }

    protected getStrength(): number{
        return 100
    }

    public getCost(): number {
        return 15
    }

}
