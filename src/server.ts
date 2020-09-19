import * as express from "express";
import SocketManager from "./socket/SocketManager";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);


new SocketManager(http)

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
}); 

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});
