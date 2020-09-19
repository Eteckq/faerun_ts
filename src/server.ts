import * as express from "express";
import SocketManager from "./socket/SocketManager";
const port = process.env.PORT || 3000
const app = express();

let http = require("http").Server(app);


new SocketManager(http)

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
}); 

const server = http.listen(port, function() {
  console.log("listening on *:" + port);
});
