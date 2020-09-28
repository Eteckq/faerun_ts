import Guerrier from "./Guerrier";


export default class Yoyo extends Guerrier {
    type = "Francis"
    constructor() {
        super()
    }

    public getResistance(): number{
        return 0.97
    }

    protected getStrength(): number{
        return 5
    }

    public getCost(): number {
        return 11
    }

}