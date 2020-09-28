import { Server, Socket } from "socket.io";
import Elfe from "../game/warriors/Elfe";
import Guerrier from "../game/warriors/Guerrier";
import Nain from "../game/warriors/Nain";
import Game from "../game/Game";
import Player from "../game/Player";
import ChefElfe from "../game/warriors/ChefElfe";
import ChefNain from "../game/warriors/ChefNain";
import Yoyo from "../game/warriors/Yoyo";

export default class UserSocket {
    private client: Socket;
    private game: Game;
    private player: Player = null;

    constructor(client: Socket, game: Game) {
        this.client = client;
        this.game = game;

        this.init();
    }

    init() {
        this.client.emit("askPseudo");
        this.client.once("chosePseudo", this.chosePseudo);
    }

    chosePseudo = (data: any) => {
        this.player = new Player(this.game, data.pseudo, data.color);
        this.sendMessage("Salut, " + data.pseudo + " !")
        this.sendAvailibleWarriors()
        this.client.on("addWarriorToQueue", this.addWarriorToQueue)
        this.client.on("disconnect", this.playerDisconnect)
    }

    playerDisconnect = () => {
        this.game.endGame()
    }

    addWarriorToQueue = (type: string) => {
        if (this.game.getPlayers().length !== 2) return

        let castle = this.player.getCastle()
        

        if (castle.getTrainingWarriors().length >= 5) {
            this.sendMessage("File d'attente pleine")
            return
        }

        let warrior: Guerrier

        switch (type) {
            case 'Elfe':
                warrior = new Elfe()
                break;
            case 'ChefElfe':
                warrior = new ChefElfe()
                break;
            case 'Nain':
                warrior = new Nain()
                break;
            case 'ChefNain':
                warrior = new ChefNain()
                break;
                case 'Yoyo':
                    warrior = new Yoyo()
                    break;
            default:
                break;
        }
        this.game.trainWarrior(castle, warrior)
        this.sendQueue()
    }

    public sendPlayers() {
        let players: any[] = []
        for (const player of this.game.getPlayers()) {
            players.push({
                name: player.getPseudo(),
                color: player.getCastle().getColor()
            })
        }

        this.client.emit("players", players)
    }

    public sendAvailibleWarriors(){
        let warriors = [
            new Nain().getStats(),
            new Elfe().getStats(),
            new ChefNain().getStats(),
            new ChefElfe().getStats(),
            new Yoyo().getStats(),
        ]
        this.client.emit("availibleWarriors", warriors)
    }

    public sendRessource() {
        if(this.player)
            this.client.emit("ressources", this.player.getCastle().getRessources())
    }

    public sendMessage(message: string) {
        this.client.emit("message", message)
    }

    public sendQueue() {
        if(!this.player) return
        let sendableWarriors = []
        for (const warrior of this.player.getCastle().getTrainingWarriors()) {
            sendableWarriors.push({
                type: warrior.type
            })
        }
        
        this.client.emit("queue", sendableWarriors)
    }
}
