const net = require('net');

class PeerServer {
  constructor(peer) {
    this.peer = peer;
    this.server = new net.Server((sock) => {
      this.server.on('data',(data)=>{
        let packet = JSON.stringify(data);
        sock.write(JSON.stringify(peer.avaibleData[packet.name]));
      });
    });
  }
  start() {
    this.server.listen(this.peer.data.PORT);
  };
}

module.exports = PeerServer;
