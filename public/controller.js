var controller = {};

controller.handleAskPseudo = () => {
  view.askPseudo()
};
controller.handlePlayers = (players) => {
  view.setPlayers(players)
};
controller.handleReset = () => {
  // reset
  location.reload()
};
controller.handleAskTrain = () => {
  view.displayGame()
};
controller.handleAvailibleWarriors = (warriors) => {
  view.setTrainCards(warriors)
};
controller.handleStartGame = () => {
  view.removeStartText()
};
controller.handleSendCastles = (castles) => {
  view.setCastles(castles)
};
controller.handleWinGame= (winner) => {
  view.displayWinner(winner)
};
controller.handleRessources = (count) => {
  view.setRessources(count)
};
controller.handleEarthquake = (slotId) => {
  view.earthquake(slotId)
}
controller.handleQueue = (warriors) => {
  view.setQueue(warriors);
};
controller.handleSetSlots = (slots) => {
  view.setSlots(slots);
};
controller.handleClickSlot = (slotId) => {
  model.emitClickSlot(slotId)
}

controller.train = (id) => {
  model.emitAddWarriorToQueue(id);
};

controller.setPseudo = () => {
  let pseudo = view.getPseudo();
  let color = view.getColor();

  if (pseudo == "") {
    pseudo = "Inconnu";
  }

  view.lockPlayBtn()

  model.emitUserInfos(pseudo, color);
};
