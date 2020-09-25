import * as express from "express";
import GameSocket from "./socket/GameSocket";
const port = process.env.PORT || 3000
const app = express();

let http = require("http").Server(app);


new GameSocket(http)

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
}); 

const server = http.listen(port, function() {
  console.log("listening on *:" + port);
});
