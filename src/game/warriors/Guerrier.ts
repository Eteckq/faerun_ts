import Castle from "../Castle";
import DamageableEntity from "../DamageableEntity";
import Utils from "../Utils";


export default class Guerrier implements DamageableEntity{
    public static STRENGTH = 10;
    public static BASE_HEALTH = 100;

    public type: string = "Guerrier"

    private health: number;
    private castle: Castle | null


    constructor() {
        this.health = Guerrier.BASE_HEALTH
    }

    public setCastle(castle: Castle){
        this.castle = castle
    }

    public getCastle(){
        return this.castle
    }

    public getCost(): number {
        return 1
    }

    public attack(target: DamageableEntity) {
        let attackCoeff = Utils.DE()
        

        if(attackCoeff == 10){
            target.dealDamages(this.getStrength() * 10)
        } else {
            target.dealDamages(this.getStrength() + this.getStrength() * attackCoeff / 10)
        }

    }

    // Return true if the target has been killed
    public isDead(){
        return this.health <= 0
    }

    public dealDamages(damages: number){
        this.health -= Math.floor(damages * this.getResistance())
    }

    protected getStrength(): number {
        return Guerrier.STRENGTH
    }

    protected getResistance(): number {
        return 1
    }

    public getHealth(){
        return this.health
    }

    public getStats(){
        return {
            name: this.type,
            strength: this.getStrength(),
            resistance: (1 -this.getResistance()) * 100,
            cost: this.getCost()
        }
    }
}
