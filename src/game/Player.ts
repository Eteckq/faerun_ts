import UserSocket from "../socket/UserSocket";
import Castle from "./Castle";
import Game from "./Game";

export default class Player {

    public userSocket: UserSocket
    
    private game: Game
    private castle: Castle

    private pseudo: string

    // TODO - ERREUR DE CONCEPTION - UserSocket ne devrait pas être connu du core du jeu.
    constructor(game: Game,pseudo: string, color: string, userSocket: UserSocket){
        this.game = game 
        this.userSocket = userSocket
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
