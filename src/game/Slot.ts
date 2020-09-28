import Castle from "./Castle";
import Guerrier from "./warriors/Guerrier";

export default class Slot {
    
  private warriors: Guerrier[] = []
  public slotNumber: number

    constructor(slotNumber: number){
        this.slotNumber = slotNumber
    }

    public hasBothSideWarriors(): boolean{
      if(this.warriors.length == 0){
        return false
      }
      let castle: Castle = this.warriors[0].getCastle()

      for (const warrior of this.warriors) {
        if(castle !== warrior.getCastle()){
          return true
        }
      }
      
      return false
    }

    public destroyWarrior(deadWarrior: Guerrier){
      this.warriors = this.warriors.filter(warrior => warrior.getHealth() !== deadWarrior.getHealth() && warrior.type === deadWarrior.type)
    }

    public getLeftSideWarriors(){
      return this.warriors.filter(warrior => warrior.getCastle().isLeft())
    }

    public getRightSideWarriors(){
      return this.warriors.filter(warrior => !warrior.getCastle().isLeft())
    }

    public getRandomLeftWarrior(){
      return this.getLeftSideWarriors().sort(() => Math.random() - 0.5)[0]
    }

    public getRandomRightWarrior(){
      return this.getRightSideWarriors().sort(() => Math.random() - 0.5)[0]
    }

    public hasRightSideWarriors(){
      if(this.warriors.length == 0){
        return false
      }
      
      for (const warrior of this.warriors) {
        if(!warrior.getCastle().isLeft()){
          return true
        }
      }

      return false
    }

    public hasLeftSideWarriors(){
      if(this.warriors.length == 0){
        return false
      }

      for (const warrior of this.warriors) {
        if(warrior.getCastle().isLeft()){
          return true
        }
      }

      return false
    }

    public getStrongestRightWarrior(){
      let strongestWarrior: Guerrier
      let warriors = this.getRightSideWarriors()

      strongestWarrior = warriors[0]

      for (const warrior of warriors) {
        if(warrior.getResistance() > strongestWarrior.getResistance()){
          strongestWarrior = warrior
        }
      }

      return strongestWarrior
    }

    public getStrongestLeftWarrior(){
      let strongestWarrior: Guerrier
      let warriors = this.getLeftSideWarriors()

      strongestWarrior = warriors[0]

      for (const warrior of warriors) {
        if(warrior.getResistance() > strongestWarrior.getResistance()){
          strongestWarrior = warrior
        }
      }

      return strongestWarrior
    }

    public addWarrior(warrior: Guerrier){
      this.warriors.push(warrior)
    }

    /**
     * Remove all warriors on slot, and return them
     */
    public removeWarriors(){
      return this.warriors.splice(0, this.warriors.length)
    }

    public addWarriors(warriors: Guerrier[]){
      this.warriors.push(...warriors)
    }

    public getWarriors(){
      return this.warriors
    }

    public getSortedWarriors(){
      return [...this.getSortedLeftWarriors(), ...this.getSortedRightWarriors().reverse()]
    }

    public getSortedLeftWarriors(){
      return this.getLeftSideWarriors().sort((a,b) => (a.getResistance() - b.getResistance()))
    }

    public getSortedRightWarriors(){
      return this.getRightSideWarriors().sort((a,b) => (a.getResistance() - b.getResistance()))
    }

    public getShuffledWarriors(){
      return this.warriors.sort(() => Math.random() - 0.5)
    }

    public removeDeadWarriors(){
      this.warriors = this.warriors.filter(warrior => !warrior.isDead())
    }
    
  }
  