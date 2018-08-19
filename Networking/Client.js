/*
A Peer holds data avaible and collects data.
This is the part that collects data
*/
const net = require('net');
const utils = require('../Tools/utils');


class Client {
  constructor(PORT=2090) {
    //Socket for Client side purposes
    this.clientSocket = new net.Socket();
    //Cache of all avaible Nodes (HOST)
    this.cache = [];
    //ID of the next Packet
    this.nextId = 0;
    this.PORT = PORT

    /*
    JSON Object with information of awaited responses

    Format of an entry  in the Object:
    id:{
      cmd:'',   //The Command that's waiting for
      args:'',  //The Arguments of the Command
      time:'',  //The Time it was send ( for timeout )
      callback:function //The Function that's called when the response arrives
    }
    */
    this.waitingFor = {};
    //Init data receiving
    this.clientSocket.on('data', data => {
      let packet = JSON.stringify(data);
      this.waitingFor.id.callback(packet);
      this.watingFor.remove(packet.id);
    });

    //Init Network Connection
    this.initConnection = (cache,server) => {
      this.cache = cache;
      this.server = server;//The other side of the Peer
      for(let host of this.cache) {
        //Load all Caches of the other Nodes
        this.clientSocket.connect(this.PORT,host,() => {
          //Callback after connection is established
          this.clientSocket.write(utils.makePacket(
            cmd='get_cache',
            args='',
            id=this.nextId++,
            request=true
          ))
        })
      }
    }
  }
}
module.exports = Client;
