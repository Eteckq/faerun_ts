var view = {};

view.initPage = () => {
  $("#colorInput").val(getColor());
};

view.removeStartText = () => {
  $("#waitingForPlayerQueue").hide();
};

view.setTrainCards = (warriors) => {
  $("#trainCards").empty();
  for (const warrior of warriors) {
    view.addTrainCard(warrior);
  }
};

view.addTrainCard = (warrior) => {
  $("#trainCards").append(`
  <div class='warriorCardInfo'>
  <div class="uk-card uk-card-default ">
      <div class="uk-card-header">
        <div class="cardTitle">
          <div>${warrior.name}</div>
          <div class="warriorCircle icon${warrior.name}"></div>
        </div>
      </div>
      <div class="uk-card-body">
        <p>Force: ${warrior.strength}</p>
        <p>Resistance: ${warrior.resistance}%</p>
        <p>Cout: ${warrior.cost}</p>
      </div>
      <div class="uk-card-footer" style="padding: 0">
        <a style="width: 100%; height: 100%" class="uk-button uk-button-default" onclick="controller.train('${warrior.name}')">Entrainer</a>
      </div>
    </div>
    </div>
  `);
};

view.askPseudo = () => {
  view.unlockPlayBtn();
  view.hideWinner()
  $("#game").hide();
  $("#userInfos").removeClass("hide");
};
view.displayGame = () => {
  $("#game").show();
  $("#userInfos").addClass("hide");
};

view.unlockPlayBtn = () => {
  $("#playBtn").attr("disabled", false);
  $("#playBtn").html("Play !");
};
view.lockPlayBtn = () => {
  $("#playBtn").attr("disabled", true);
  $("#playBtn").html("Attente d'un adversaire..");
};

view.setPlayers = (players) => {
  $("#playersContent").empty();

  if (players.length == 1) {
    $("#playersContent").append(`
    <p style="color: ${players[0].color}">${players[0].name}</p>
  `);
  } else if (players.length == 2) {
    $("#playersContent").append(`
      <p style="color: ${players[0].color}">${players[0].name}</p>
      <p>VS</p>
      <p style="color: ${players[1].color}">${players[1].name}</p>
    `);
  } else {
    $("#playersContent").append(`
    <p>En attente de joueur</p>
  `);
  }
};

view.getPseudo = () => {
  return $("#pseudoInput").val();
};
view.getColor = () => {
  return $("#colorInput").val();
};

view.setQueue = (warriors) => {
  if (warriors) {
    view.setQueueLenght(warriors.length);

    $("#queue").empty();

    for (const warrior of warriors) {
      $("#queue").append(`
    <div class='warriorCircle icon${warrior.type}'></div>
    `);
    }
  }
};

view.displayWinner = (winner) => {
  $("#winnerSlot").empty()
  $("#winnerSlot").show()
  $("#winnerSlot").addClass("show")

  $("#winnerSlot").append(`
    ${winner} a gagné !
  `);
};

view.hideWinner= () => {
  $("#winnerSlot").hide()
  $("#winnerSlot").removeClass("show")
};

view.setSlots = (slots) => {
  $("#slots").empty();

  for (const slot of slots) {
    view.addSlot(slot);
  }
};

view.setRessources = (count) => {
  $("#ressources").html(count);
};

view.setQueueLenght = (count) => {
  $("#queueLenght").val(count);
  $("#queueSize").html(count + "/5");
};

view.addSlot = (slot) => {
  let newSlot = $('<div class="slot"></div>');

  for (const guerrier of slot.warriors) {
    newSlot.append(`

      <div class="warrior ${guerrier.side}">
        <div class="warriorCircle icon${guerrier.type}" > </div>
        <div class='iconWarrior' style="background-color: ${guerrier.color}"></div>
        <progress class="warriorHealth" value="${guerrier.health}" max="100"></progress>
      </div>
    
      `);
  }
  $("#slots").append(newSlot);
};
view.setCastles = (castles) => {
  $("#castles").empty();

  for (const castle of castles) {
    $("#castles").append(`
      <div class='castle' style="background-color: ${castle.color};">
        
        <progress class="castleHealth" value="${castle.health}" max="1000"></progress>
      </div>
  `);
  //Ressources: ${castle.ressources}
  }
};

// Permet de générer une couleur au hasard, dans les tons pastel

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getColor() {
  return hslToHex(
    360 * Math.random(),
    25 + 70 * Math.random(),
    60 + 10 * Math.random()
  );
}