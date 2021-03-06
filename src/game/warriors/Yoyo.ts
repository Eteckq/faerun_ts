import Guerrier from "./Guerrier";


export default class Yoyo extends Guerrier {
    type = "Yoyo"
    constructor() {
        super()
    }

    public getResistance(): number{
        return 0.40
    }

    protected getStrength(): number{
        return 100
    }

    public getCost(): number {
        return 9
    }

}
