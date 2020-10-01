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
  let color = $("#colorInput").val() // Should be in model
  localStorage.setItem("color", color)
  return color;
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

  for (let i = 0; i < slots.length; i++) {
    view.addSlot(slots[i], i);
  }
};

view.setRessources = (count) => {
  $("#ressources").html(count);
};

view.setQueueLenght = (count) => {
  $("#queueLenght").val(count);
  $("#queueSize").html(count + "/5");
};
view.earthquake = (slotId) => {
  let nbrOfSlots = $(".slot").length
  let smokeGap
  if(slotId === 0){
    smokeGap = 0
  } else {
    smokeGap = (slotId)/nbrOfSlots*100
  }

  smokeGap += 1/(nbrOfSlots*2) * 100

  console.log(smokeGap);
  let explosion = $("<div>", {
    class: "smoke",
    style: "left: " + smokeGap + "%"
  })

  explosion.html(`
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300">
	<g class="explosion" transform="matrix(1,0,0,1,150,150)">
        <g class="puff1">
		<path d="M9.87598,-37.9766 C3.95457,-34.3934 2.30926e-14,-27.8919 2.30926e-14,-20.4599 C2.30926e-14,-9.15311 9.15311,0 20.4599,0 C25.7436,0 30.5569,-1.99875 34.1857,-5.282 C37.8145,-1.99875 42.6279,-1.77636e-14 47.9115,-1.77636e-14 C59.2183,-1.77636e-14 68.3714,-9.15311 68.3714,-20.4599 C68.3714,-31.7667 59.2183,-40.9198 47.9115,-40.9198 C47.4586,-40.9198 47.0091,-40.9051 46.5635,-40.8762 C47.2353,-42.8779 47.5993,-45.0214 47.5993,-47.2505 C47.5993,-58.3021 38.6528,-67.2486 27.6012,-67.2486 C16.5497,-67.2486 7.60317,-58.3021 7.60317,-47.2505 C7.60317,-43.9027 8.42417,-40.748 9.87598,-37.9766 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="puff2">
		<path d="M-62.9253,8.68777 C-69.139,13.1392 -73.1848,20.4206 -73.1848,28.654 C-73.1848,42.2176 -62.2048,53.1976 -48.6411,53.1976 C-41.62,53.1976 -35.2911,50.2554 -30.8191,45.5357 C-26.3472,50.2554 -20.0183,53.1976 -12.9971,53.1976 C0.566467,53.1976 11.5465,42.2176 11.5465,28.654 C11.5465,15.0903 0.566467,4.11028 -12.9971,4.11028 C-13.738,4.11028 -14.4711,4.14303 -15.1951,4.20718 C-16.7812,-7.50896 -26.8126,-16.5286 -38.9664,-16.5286 C-52.2238,-16.5286 -62.9561,-5.79639 -62.9561,7.46106 C-62.9561,7.87248 -62.9457,8.28146 -62.9253,8.68777 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="puff3">
		<path d="M-31.0276,-43.3884 C-32.4649,-48.666 -36.4712,-53.1252 -42.078,-54.9005 C-50.8532,-57.6789 -60.2061,-52.8243 -62.9845,-44.0491 C-63.6233,-42.0316 -63.8586,-39.9836 -63.7356,-37.9919 C-68.114,-36.1744 -71.6895,-32.5082 -73.2338,-27.6307 C-76.0122,-18.8555 -71.1576,-9.50253 -62.3824,-6.72411 C-61.1925,-6.34735 -59.9919,-6.11095 -58.7986,-6.00564 L-58.7986,-6.00564 C-60.5285,2.26594 -55.7471,10.6549 -47.5169,13.2607 C-38.7417,16.0392 -29.3887,11.1846 -26.6103,2.40937 C-25.0458,-2.53203 -25.9016,-7.65662 -28.5149,-11.6873 C-24.0579,-13.4795 -20.4087,-17.1776 -18.8441,-22.119 C-16.0657,-30.8943 -20.9203,-40.2472 -29.6955,-43.0256 C-30.1384,-43.1659 -30.5827,-43.2866 -31.0276,-43.3884 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="puff1">
		<path d="M28.6382,22.3226 C33.8873,21.188 39.5852,22.6623 43.6681,26.7452 C50.0583,33.1354 50.0583,43.4815 43.6681,49.8717 C42.1989,51.3409 40.5207,52.4723 38.7295,53.2659 C39.126,57.9034 37.5484,62.6774 33.9965,66.2292 C27.6063,72.6195 17.2602,72.6195 10.87,66.2292 C10.0035,65.3627 9.25444,64.4234 8.62292,63.4311 L8.62292,63.4311 C2.19734,68.6799 -7.27563,68.3076 -13.2689,62.3143 C-19.6592,55.9241 -19.6592,45.578 -13.2689,39.1878 C-9.67054,35.5894 -4.81778,34.0173 -0.123348,34.4715 C-0.577524,29.777 0.994579,24.9243 4.59297,21.3259 C10.9832,14.9356 21.3293,14.9356 27.7195,21.3259 C28.042,21.6484 28.3482,21.9809 28.6382,22.3226 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="small-puff1">
		<path d="M-85.5667,-11.8716 C-86.3016,-13.0118 -87.5826,-13.7661 -89.041,-13.7661 C-91.3237,-13.7661 -93.1716,-11.9183 -93.1716,-9.6356 C-93.1716,-9.11079 -93.0739,-8.60897 -92.8957,-8.1473 C-93.7949,-7.38984 -94.3658,-6.2554 -94.3658,-4.98663 C-94.3658,-2.70396 -92.5179,-0.856084 -90.2352,-0.856084 C-89.9257,-0.856084 -89.6241,-0.890063 -89.3341,-0.954497 L-89.3341,-0.954497 C-89.1239,1.13061 -87.3655,2.75606 -85.2246,2.75606 C-82.9419,2.75606 -81.094,0.908179 -81.094,-1.37449 C-81.094,-2.65989 -81.68,-3.80741 -82.5996,-4.56475 C-81.68,-5.32208 -81.094,-6.4696 -81.094,-7.755 C-81.094,-10.0377 -82.9419,-11.8855 -85.2246,-11.8855 C-85.3398,-11.8855 -85.4539,-11.8808 -85.5667,-11.8716 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="small-puff2">
		<path d="M73.3026,-52.4816 C74.6575,-52.4152 75.9513,-51.683 76.6805,-50.42 C77.8218,-48.4431 77.1455,-45.9189 75.1686,-44.7775 C74.7141,-44.5151 74.2307,-44.3488 73.7418,-44.2723 C73.5354,-43.1149 72.8383,-42.0533 71.7396,-41.4189 C69.7627,-40.2775 67.2385,-40.9539 66.0971,-42.9308 C65.9424,-43.1988 65.821,-43.477 65.7318,-43.7603 L65.7318,-43.7603 C63.821,-42.8998 61.5341,-43.6099 60.4636,-45.464 C59.3223,-47.4409 59.9987,-49.9651 61.9755,-51.1064 C63.0887,-51.7491 64.3754,-51.8155 65.4911,-51.3977 C65.6872,-52.5728 66.388,-53.654 67.5012,-54.2967 C69.478,-55.438 72.0023,-54.7617 73.1436,-52.7848 C73.2012,-52.685 73.2542,-52.5839 73.3026,-52.4816 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="puff3">
		<path d="M-15.4113,-16.7243 L-15.4113,-16.7243 C-12.6717,-14.8572 -9.36034,-13.7661 -5.7922,-13.7661 C1.08142,-13.7661 7.00232,-17.8152 9.71743,-23.6601 C18.9029,-23.9563 26.2483,-31.4859 26.2483,-40.7439 C26.2483,-50.19 18.6015,-57.8368 9.15541,-57.8368 C6.85194,-57.8368 4.65547,-57.3821 2.65078,-56.5574 L2.65078,-56.5574 C0.393741,-63.3563 -6.01403,-68.2548 -13.5744,-68.2548 C-23.0205,-68.2548 -30.6673,-60.608 -30.6673,-51.162 C-30.6673,-49.7831 -30.5043,-48.4425 -30.1966,-47.1585 L-30.1966,-47.1585 C-37.1143,-44.9705 -42.1232,-38.504 -42.1232,-30.859 C-42.1232,-21.413 -34.4764,-13.7661 -25.0303,-13.7661 C-21.4622,-13.7661 -18.1508,-14.8572 -15.4113,-16.7243 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="puff2">
		<path d="M41.6595,35.8335 L41.6595,35.8335 C38.92,37.7005 35.6086,38.7916 32.0405,38.7916 C25.1669,38.7916 19.2459,34.7426 16.5308,28.8976 C7.34535,28.6015 1.80903e-06,21.0718 1.80903e-06,11.8138 C1.80903e-06,2.36775 7.64681,-5.27906 17.0929,-5.27906 C19.3963,-5.27906 21.5928,-4.82434 23.5975,-3.9997 L23.5975,-3.9997 C25.8545,-10.7986 32.2623,-15.6971 39.8227,-15.6971 C49.2687,-15.6971 56.9155,-8.05032 56.9155,1.39574 C56.9155,2.77465 56.7526,4.11522 56.4449,5.39926 L56.4449,5.39926 C63.3626,7.58718 68.3714,14.0537 68.3714,21.6987 C68.3714,31.1448 60.7246,38.7916 51.2786,38.7916 C47.7104,38.7916 44.399,37.7005 41.6595,35.8335 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
        <g class="small-puff1">
		<path d="M63.995,52.1629 L63.995,52.1629 C63.7172,52.7395 63.2689,53.2416 62.6723,53.586 C61.5231,54.2495 60.1423,54.1441 59.1242,53.4289 C57.5598,54.2661 55.6049,53.7162 54.7112,52.1683 C53.7994,50.589 54.3398,48.5724 55.9191,47.6606 C56.3042,47.4382 56.7154,47.3022 57.1301,47.2466 L57.1301,47.2466 C56.8512,45.892 57.4497,44.4544 58.7137,43.7246 C60.293,42.8128 62.3097,43.3532 63.2215,44.9325 C63.3546,45.163 63.4568,45.4029 63.5293,45.6473 L63.5293,45.6473 C64.8971,45.3453 66.3587,45.943 67.0967,47.2212 C68.0085,48.8005 67.4682,50.8171 65.8888,51.729 C65.2923,52.0734 64.6333,52.2106 63.995,52.1629 Z" fill="#bebebe" fill-opacity="1" stroke-width="1.66297" stroke="#000000" stroke-linecap="square" stroke-linejoin="miter" />
        </g>
	</g>
</svg>`)
  
  explosion.appendTo("#slotsContainer")

  new TimelineMax({ onComplete: ()=>{explosion.remove()}})
  .staggerFromTo(
    [".explosion", ".puff1", ".puff2", ".puff3"],
    0.2,
    {
      scale: 0.1,
      opacity: 0.5,
      transformOrigin: "center",
      ease: Circ.easeIn
    },
    {
      scale: 1,
      opacity: 1,
      transformOrigin: "center",
      ease: Circ.easeInOut
    },
    0.05,
    0.1
  )

  .staggerFromTo(
    [".small-puff1", ".small-puff2"],
    0.5,
    {
      scale: 0.3,
      transformOrigin: "center",
      ease: Circ.easeInOut
    },
    {
      scale: 1.2,
      transformOrigin: "center",
      ease: Circ.easeInOut
    },
    0,
    0.1
  )

  .staggerFromTo(
    [".explosion", ".puff1", ".puff2", ".puff3"],
    1,
    {
      scale: 1
    },
    {
      scale: 1.5,
      opacity: 0
    },
    0,
    0.33
  )
}
view.addSlot = (slot, id) => {
  let newSlot = $(`<div class="slot" onclick="controller.handleClickSlot(${id})"></div>`);

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
  let savedColor = localStorage.getItem("color")
  if(savedColor) return savedColor
  
  return hslToHex(
    360 * Math.random(),
    25 + 70 * Math.random(),
    60 + 10 * Math.random()
  );
}