const net = require('net');
const Client = require('./Client.js');
const Server = require('./Server.js');
class Peer {
  //A Peer is a Server and a Client for a greater Network
  constructor(entry_ips) {
    this.PORT = 2090;//For server

    //Functions that returns values to the other Nodes (for the Server)
    this.cmd_table = {
      'get_cache': () => JSON.stringify(this.cache),

    }


    /*
    The Server keeps the Data of the App avaible for the Network
    */
    this.server = net.createServer((sock) => {
      //Logging
      console.log('LOG: CONNECTED' + sock.remoteAddress + ':'
                                    + sock.remotePort);

      //Now we wait for a command that requests data
      sock.on('data',(data) => {
        let rq = JSON.parse(data);
        //Add a JSON as Header
        sock.write(
        JSON.stringify({
          'cmd':rq.cmd,
          'id':rq.id,
          'args':rq.args,
          'payload':this.cmd_table[rq.cmd](rq.args != '' ? rq.args : undefined)
        }));
      });

    }).listen(this.PORT);

    /*
    Work as a Client to request Data from the Network and Validated it
    */
    this.client = new Client(this.PORT);
    //The Client manages the cache
    this.client.initConnection(entry_ips,this.server);
    //Asks for Data from the Network
    this.client.download(cmd="",args="");


  }
}

module.exports = Peer;
const peer = new Peer('127.0.0.1');
console.log(peer.cmd_table['get_cache']());
