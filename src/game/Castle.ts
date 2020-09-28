import Game from "./Game";
import Slot from "./Slot";
import Guerrier from "./warriors/Guerrier";
import DamageableEntity from './DamageableEntity'

export default class Castle implements DamageableEntity{ 

    private static BASE_HEALTH = 1000

    private game: Game
    private color: string

    private ressources: number = 3

    private trainingWarriors: Guerrier[] = []

    private spawn: Slot | null
    private health: number = Castle.BASE_HEALTH

    /**
     * 
     * @param game Game associate to the castle
     * @param color Color of the castle (hex format)
     */
    constructor(game: Game, color: string){
        this.game = game
        this.color = color
    }

    /**
     * @return true if the castle health is under 0
     */
    public isDestroyed(){
        return this.health <= 0
    }

    /**
     * @return Current health of the castle
     */
    public getHealth(){
        return this.health
    }

    /**
     * @param damage Damages to deal to the castle
     */
    public dealDamages(damage: number){
        this.health -= damage
    }

    /**
     * @return True if this castle belong to the left player
     */
    public isLeft(){
        return this.spawn.slotNumber === 0
    }

    /**
     * 
     * @param slot Slot used to spawn castle warriors
     */
    public setSpawn(slot: Slot){
        this.spawn = slot
    }

    /**
     * @return Spawn slot
     */
    public getSpawn(): Slot{
        return this.spawn
    }

    /**
     * @return Color of the castle (hex format)
     */
    public getColor(): string{
        return this.color
    }

    /**
     * @param ressources Number of ressources to add
     */
    public addRessources(ressources: number){
        this.ressources += ressources
    }

    /**
     * Get current ressources of the castle
     */
    public getRessources(){
        return this.ressources
    }

    /**
     * Get a random warrior to train, and return it
     * Return null if we can't train any warrior
     */
    public trainWarrior(): Guerrier | null{
        let warriors = this.getTrainingWarriors()
        //Shuffle array
        warriors.sort(() => Math.random() - 0.5);
        
        //Find a warrior to train
        for (const index in warriors) {
            let i = parseInt(index)
            let trainingWarrior = warriors[i]
            if(this.getRessources() >= trainingWarrior.getCost()){
                this.ressources -= trainingWarrior.getCost()
                return warriors.splice(i, 1)[0]
            }
        }

        return null
    }

    /**
     * 
     * @param warrior Add a warrior to the training list
     */
    public addTrainingWarrior(warrior: Guerrier){
        this.trainingWarriors.push(warrior)
    }

    /**
     * Get the training warriors list
     */
    public getTrainingWarriors(){
        return this.trainingWarriors
    }

}
