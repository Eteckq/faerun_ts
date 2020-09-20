var model = {};

model.socket = io("https://faerun.herokuapp.com/");
// model.socket = io("localhost:3000");

model.bindAskPseudo = (handler) => {
  model.socket.on("askPseudo", (socket) => {
    handler();
  });
};
model.bindPlayers = (handler) => {
  model.socket.on("players", (players) => {
    handler(players);
  });
}
model.bindReset = (handler) => {
  model.socket.on("reset", () => {
    handler();
  });
}
model.bindAskTrain = (handler) => {
  model.socket.on("askTrain", (socket) => {
    handler();
  });
};
model.bindAvailibleWarriors= (handler) => {
  model.socket.on("availibleWarriors", (warriors) => {
    handler(warriors);
  });
};
model.bindWinGame= (handler) => {
  model.socket.on("winGame", (winner) => {
    handler(winner);
  });
};
model.bindSendCastles= (handler) => {
  model.socket.on("sendCastles", (castles) => {
    handler(castles);
  });
};
model.bindStartGame = (handler) => {
  model.socket.on("startGame", (socket) => {
    handler();
  });
};
model.bindRessources = (handler) => {
  model.socket.on("ressources", (count) => {
    handler(count);
  });
};
model.bindQueue = (handler) => {
  model.socket.on("queue", (warriors) => {
    handler(warriors);
  });
};
model.bindSetSlots = (handler) => {
  model.socket.on("setSlots", (slots) => {
    handler(slots);
  });
};

model.emitUserInfos = (pseudo, color) => {
  model.socket.emit("chosePseudo", {
    pseudo,
    color: color,
  });
};

model.emitAddWarriorToQueue = (id) => {
  model.socket.emit("addWarriorToQueue", id);
};
