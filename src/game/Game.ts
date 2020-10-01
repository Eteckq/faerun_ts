import { EventEmitter } from "events";
import Castle from "./Castle";
import Player from "./Player";
import Slot from "./Slot";
import Guerrier from "./warriors/Guerrier";

var events = require('events');


export default class Game {
    private players: Player[] = [];

    private slots: Slot[] = [];

    private interval: NodeJS.Timeout;

    public eventEmitter = new EventEmitter();

    private state: "WAIT" | "PRESTART" | "STARTED" | "FINISH" = "WAIT"

    constructor(nbrOfSlots: number = 5) {
        for (let i = 0; i < nbrOfSlots; i++) {
            this.slots.push(new Slot(i));
        }
    }

    //#region GETTERS

    public getPlayers(){
        return this.players
    }

    public getSlots() {
        return this.slots;
    }

    public getCastles(){
        let castles = []
        for (const player of this.players) {
            castles.push(player.getCastle())
        }
        return castles
    }

    //#endregion

    public addPlayer(player: Player) {
        if (this.players.length < 2) {
            this.players.push(player);

            if (this.players.length == 1) {
                player.getCastle().setSpawn(this.slots[0]);
            }

            if (this.players.length == 2) {
                player.getCastle().setSpawn(this.slots[this.slots.length - 1]);
                this.startTraining();
            }
        }

        
        this.eventEmitter.emit('addPlayer');
    }

    /**
     * Start the training step
     */
    public startTraining() {
        this.state = "PRESTART"
        this.eventEmitter.emit('startTraining');
    }

    /**
     * Add a warrior in a castle
     * @param castle 
     * @param warrior 
     */
    public trainWarrior(castle: Castle, warrior: Guerrier) {
        castle.addTrainingWarrior(warrior);
        warrior.setCastle(castle);

        for (const player of this.players) {
            if (player.getCastle().getTrainingWarriors().length < 3) {
                return;
            }
        }

        this.startGame();
    }

    public endGame(){
        this.state = "FINISH"
        clearInterval(this.interval)
        this.eventEmitter.emit('endGame');
    }

    public winGame(winner: Player, looser: Player){
        this.state = "FINISH"
        clearInterval(this.interval)
        this.eventEmitter.emit('winGame', winner.getPseudo(), looser.getPseudo());

        setTimeout(() => {
            this.eventEmitter.emit('endGame');
        }, 5000);
    }

    public startGame() {
        if(this.state === "STARTED"){
            return
        }
        this.state = "STARTED"
        this.eventEmitter.emit('startGame');
        this.interval = setInterval(() => {
            this.nextTurn();
        }, 1500);
    }

    /**
     * Start next turn
     */
    public nextTurn() {
        //Move
        this.moveWarriors();

        //Fight
        this.fight();

        //Send new warriors
        this.tryToSummonWarriors();

        //Give ressources
        this.addRessourcesToCastles(1);


        this.eventEmitter.emit('nextTurn');
    }

    public earthquake(slotId: number, player: Player){
        if(player.getCastle().getRessources() >= 10){
            player.getCastle().addRessources(-10)
            this.slots[slotId].earthquake()
            this.eventEmitter.emit('earthquake', slotId);
        }
    }

    private tryToSummonWarriors() {
        for (const player of this.players) {
            let castle = player.getCastle();

            let warrior: Guerrier | null = castle.trainWarrior();

            while (warrior !== null) {
                this.summonWarrior(warrior, castle.getSpawn());
                warrior = castle.trainWarrior();
            }
        }
    }

    private summonWarrior(warrior: Guerrier, slot: Slot) {
        slot.addWarrior(warrior);
    }

    /**
     * Move left warriors to the right
     */
    private moveLeftWarriors(){
        for (let i = this.slots.length - 1; i >= 0; i--) {
            const targetSlot = this.slots[i];
            const leftSlot = this.slots[i - 1];
            if (leftSlot) {
                if (!leftSlot.hasBothSideWarriors()) {
                    if (leftSlot.hasLeftSideWarriors()) {
                        targetSlot.addWarriors(leftSlot.removeWarriors());
                    }
                }
            }
        }
    }

    /**
     * Move right warriors to the left
     */
    private moveRightWarriors(){
        for (let i = 0; i < this.slots.length; i++) {
            const targetSlot = this.slots[i];
            let rightSlot = this.slots[i + 1];
            if (rightSlot) {
                if (!rightSlot.hasBothSideWarriors()) {
                    if (rightSlot.hasRightSideWarriors()) {
                        targetSlot.addWarriors(rightSlot.removeWarriors());
                    } 
                } 
            } 
        }
    }

    private moveWarriors() {
        // Une équipe à 1 chance sur 2 d'avancer en 1er
        // Si c'est toujours la même équipe qui avance en 1er, elle a un avantage trop important
        if(Math.round(Math.random())){
            this.moveLeftWarriors()
            this.moveRightWarriors()
        } else {
            this.moveRightWarriors()
            this.moveLeftWarriors()
        }

    }


    // Pour les combats, chaques guerriers attaque le guerrier adverse le plus resistant
    private fight() {
        for (const slot of this.slots) {
            if (slot.hasBothSideWarriors()) {
                this.attackStrongestOnSlot(slot)
            }
        }
        this.attackCastleIfLeftSideIsInLastSlot()
        this.attackCastleIfRightSideIsInLastSlot()
    }

    private attackStrongestOnSlot(slot: Slot){
        for (const warrior of slot.getShuffledWarriors()) {
            let target: Guerrier
            if(!warrior.isDead()){
                if(warrior.getCastle().isLeft()){
                    target = slot.getStrongestRightWarrior()
                } else {
                    target = slot.getStrongestLeftWarrior()
                }
                if(target)
                    warrior.attack(target)
                slot.removeDeadWarriors()
            }
        }
    }

    /* private attackOnSlot(slot: Slot){
        for (const warrior of slot.getShuffledWarriors()) {
            let target: Guerrier
            if(!warrior.isDead()){
                if(warrior.getCastle().isLeft()){
                    target = slot.getRandomRightWarrior()
                } else {
                    target = slot.getRandomLeftWarrior()
                }
                warrior.attack(target)
            }
        }

        slot.removeDeadWarriors()
    } */

    private attackCastleIfLeftSideIsInLastSlot(){
        let slot = this.slots[this.slots.length-1]
        let castle = this.players[1].getCastle()

        if(slot.hasLeftSideWarriors()){
            castle.attack(slot.getStrongestLeftWarrior())
            slot.removeDeadWarriors()
            if(!slot.hasBothSideWarriors()){
                for (const warrior of slot.getWarriors()) {
                    warrior.attack(castle)
                }
                if(castle.isDestroyed()){
                    this.winGame(this.players[0], this.players[1])
                }
            }
        }

        
    }

    private attackCastleIfRightSideIsInLastSlot(){
        let slot = this.slots[0]
        let castle = this.players[0].getCastle()
        if(slot.hasRightSideWarriors()){
            castle.attack(slot.getStrongestRightWarrior())
            slot.removeDeadWarriors()
            if(!slot.hasBothSideWarriors()){
                for (const warrior of slot.getWarriors()) {
                    warrior.attack(castle)
                }
                if(castle.isDestroyed()){
                    this.winGame(this.players[1], this.players[0])
                }
            }
        }
    }

    
    /**
     * Give ressources to castles
     * @param count Number of ressources
     */
    private addRessourcesToCastles(count: number) {
        for (const player of this.players) {
            let castle = player.getCastle();
            castle.addRessources(count);
        }
    }

}
