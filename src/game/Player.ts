import { EventEmitter } from "events";
import UserSocket from "../socket/UserSocket";
import Castle from "./Castle";
import Game from "./Game";

export default class Player {
    
    private game: Game
    private castle: Castle

    private pseudo: string

    constructor(game: Game,pseudo: string, color: string){
        this.game = game 
        this.pseudo = pseudo
        this.castle = new Castle(this.game, color)
        this.game.addPlayer(this)
    }

    public getPseudo(){
        return this.pseudo
    }

    public getCastle(){
        return this.castle
    }
    
}
