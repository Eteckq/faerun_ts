import Castle from "../Castle";
import DamageableEntity from "../DamageableEntity";
import Utils from "../Utils";


export default abstract class Guerrier implements DamageableEntity{
    public static STRENGTH = 10;
    public static BASE_HEALTH = 100;

    public abstract type: string

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
        // target.dealDamages(this.getStrength())
        let attackCoeff = Utils.DE(10)
        

        if(attackCoeff == 10){
            target.dealDamages(this.getStrength() * 3)
        } else {
            target.dealDamages(this.getStrength() + this.getStrength() * attackCoeff / 10)
        }

    }

    // Return true if the target has been killed
    public isDead(){
        return this.health <= 0
    }

    public dealDamages(damages: number){
        this.health -= (damages * (1-this.getResistance()))
    }

    protected getStrength(): number {
        return Guerrier.STRENGTH
    }

    protected getResistance(): number {
        return 0
    }

    public getHealth(){
        return this.health
    }

    public getStats(){
        return {
            name: this.type,
            strength: Math.floor(this.getStrength()),
            resistance: Math.floor((this.getResistance()) * 100),
            cost: this.getCost()
        }
    }
}
