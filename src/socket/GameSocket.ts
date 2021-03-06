import {
  Server,
  Socket
} from "socket.io";
import Game from "../game/Game";
import UserSocket from "./UserSocket";

export default class GameSocket {
  io: Server;
  game: Game;

  private userSockets: UserSocket[] = []

  constructor(http: any) {
    this.io = require("socket.io")(http);
    this.createGame()

    // whenever a user connects on port 3000 via
    // a websocket, log that a user has connected
    this.io.on("connection", (socket: Socket) => {
      let userSocket = new UserSocket(socket, this.game)
      userSocket.sendPlayers()

      this.userSockets.push(userSocket)
    });


  }

  private createGame() {
    this.game = new Game(7)

    this.game.eventEmitter.on('nextTurn', this.handleNextTurnEvent)
    this.game.eventEmitter.on('startGame', this.handleStartGameEvent)
    this.game.eventEmitter.on('endGame', this.handleEndGameEvent)
    this.game.eventEmitter.on('startTraining', this.handleStartTrainingEvent)
    this.game.eventEmitter.on('addPlayer', this.handleAddPlayerEvent)
    this.game.eventEmitter.on('sendCastles', this.handleSendCastlesEvent)
    this.game.eventEmitter.on('winGame', this.handleWinGameEvent)
    this.game.eventEmitter.on("earthquake", this.handleEarthquake)
  }

  public endGame() {
    this.createGame()
    this.broadcastReset()
  }

  //#region EVENTS HANDLERS
  private handleNextTurnEvent = () => {
    this.broadcastSlots();
    this.broadcastSendRessources()
    this.broadcastSendQueue()
    this.broadcastCastles()
  }

  private handleEarthquake = (slotId: number) => {
    this.broadcastSlots();
    this.broadcastEarthquake(slotId)
  }

  private handleStartGameEvent = () => {
    this.broadcaststartGame()
    
  }

  private handleWinGameEvent= (winner: string, looser: string) => {
    this.broadcastWinGame(winner)
    console.log(looser + " lost the game");
    
  }

  private handleEndGameEvent = () => {
    this.endGame()
  }

  private handleSendCastlesEvent = () => {
    this.broadcastCastles()
  }

  private handleStartTrainingEvent = () => {
    this.broadcastSlots();
    this.broadcastAskTrain();
    this.broadcastCastles()
  }

  private handleAddPlayerEvent = () => {
    this.broadcastPlayers()
  }
  //#endregion

  //#region EMITTERS

  public broadcaststartGame() {
    this.io.emit("startGame")
  }

  public broadcastWinGame(winner: string) {
    this.io.emit("winGame", winner)
  }

  public broadcastCastles(){
      let castles = []
      for (const castle of this.game.getCastles()) {
          castles.push({
              health: castle.getHealth(),
              color: castle.getColor(),
              ressources: castle.getRessources()
          })
      }
    this.io.emit("sendCastles", castles)
  }

  public broadcastSlots() {

    let sendableSlots = []
    for (const slot of this.game.getSlots()) {
      let warriors = []

      for (const warrior of slot.getSortedWarriors()) {
        warriors.push({
          side: warrior.getCastle().isLeft() ? 'left' : 'right',
          type: warrior.type,
          health: warrior.getHealth(),
          color: warrior.getCastle().getColor()
        })
      }

      sendableSlots.push({
        warriors
      })
    }

    this.io.emit("setSlots", sendableSlots)
  }

  public broadcastEarthquake(slotId: number){
    this.io.emit("earthquake", slotId)
  }

  public broadcastSendRessources() {
    for (const userSocket of this.userSockets) {
      userSocket.sendRessource()
    }
  }

  public broadcastPlayers() {
    let players: any[] = []
        for (const player of this.game.getPlayers()) {
            players.push({
                name: player.getPseudo(),
                color: player.getCastle().getColor()
            })
        }

        this.io.emit("players", players)
  }

  public broadcastReset() {
    this.io.emit("reset")
  }

  public broadcastSendQueue() {
    for (const userSocket of this.userSockets) {
      userSocket.sendQueue()
    }
  }

  public broadcastAskTrain() {
    this.io.emit("askTrain")
  }

  //#endregion

}
