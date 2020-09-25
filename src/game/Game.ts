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

    public startTraining() {
        this.state = "PRESTART"
        this.eventEmitter.emit('startTraining');
    }

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

    public winGame(winner: Player){
        this.state = "FINISH"
        clearInterval(this.interval)
        this.eventEmitter.emit('winGame', winner.getPseudo());

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
        }, 2000);
    }

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


    // Pour les combats, chaques guerriers attaque un guerrier adverse au hasard sur la case
    private fight() {
        this.attackCastleIfLeftSideIsInLastSlot()
        this.attackCastleIfRightSideIsInLastSlot()

        for (const slot of this.slots) {
            if (slot.hasBothSideWarriors()) {

                // Chaque équipe à une chance sur deux d'attaquer en premier
                /* if(Math.round(Math.random())){
                    this.leftSideAttackOnSlot(slot)
                    this.rightSideAttackOnSlot(slot)
                } else {
                    this.rightSideAttackOnSlot(slot)
                    this.leftSideAttackOnSlot(slot)
                } */

                this.attackOnSlot(slot)
            }
        }
    }

    private attackOnSlot(slot: Slot){
        for (const warrior of slot.getSortedWarriors()) {
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
    }

    private attackCastleIfLeftSideIsInLastSlot(){
        let slot = this.slots[this.slots.length-1]

        if(!slot.hasBothSideWarriors() && slot.hasLeftSideWarriors()){
            let castle = this.players[1].getCastle()
            for (const warrior of slot.getWarriors()) {
                warrior.attack(castle)
            }
            if(castle.isDestroyed()){
                this.winGame(this.players[0])
            }
        }

        
    }

    private attackCastleIfRightSideIsInLastSlot(){
        let slot = this.slots[0]

        if(!slot.hasBothSideWarriors() && slot.hasRightSideWarriors()){
            let castle = this.players[0].getCastle()
            for (const warrior of slot.getWarriors()) {
                warrior.attack(castle)
            }
            if(castle.isDestroyed()){
                this.winGame(this.players[1])
            }
        }
    }

    private rightSideAttackOnSlot(slot: Slot){
        for (const warrior of slot.getRightSideWarriors()) {
            if(!warrior.isDead()){
                warrior.attack(slot.getRandomLeftWarrior())
                if(slot.getRandomLeftWarrior() == null){
                    console.log("ATTAQUER LE CHATEAU");
                }
            }
        }
    }

    private leftSideAttackOnSlot(slot: Slot){
        for (const warrior of slot.getLeftSideWarriors()) {
            if(!warrior.isDead()){
                warrior.attack(slot.getRandomRightWarrior())
                if(slot.getRandomRightWarrior() == null){
                    console.log("ATTAQUER LE CHATEAU");
                }
            }
        }
    }

    private addRessourcesToCastles(count: number) {
        for (const player of this.players) {
            let castle = player.getCastle();
            castle.addRessources(count);
        }
    }

}
