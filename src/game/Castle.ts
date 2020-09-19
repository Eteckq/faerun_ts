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

    constructor(game: Game, color: string){
        this.game = game
        this.color = color
    }

    public isDestroyed(){
        return this.health <= 0
    }

    public getHealth(){
        return this.health
    }

    public dealDamages(damage: number){
        this.health -= damage
    }

    public isLeft(){
        return this.spawn.slotNumber === 0
    }

    public setSpawn(slot: Slot){
        this.spawn = slot
    }

    public getSpawn(){
        return this.spawn
    }

    public getColor(){
        return this.color
    }

    public addRessources(ressources: number){
        this.ressources += ressources
    }

    public getRessources(){
        return this.ressources
    }

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

    public addTrainingWarrior(warrior: Guerrier){
        this.trainingWarriors.push(warrior)
    }

    public getTrainingWarriors(){
        return this.trainingWarriors
    }

}
