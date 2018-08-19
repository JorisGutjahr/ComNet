/*
Build clean JSON Packets for Networking
And read after receiving
*/
let date = new Date;
const makePacket = (json,type) => {

  if(type=='request') {
    let time = date.now();
    return [JSON.stringify(
      'cmd':json['cmd'],
      'args':json['args'],
      'time':time,
      'id':json['id']
    ),time];
  } else {
    return JSON.stringify(
      'cmd':json['cmd'],
      'args':json['args'],
      'time':json['time'],
      'id':json['id'],
      'payload':json['payload']
    )
  }
}

const readPacket = (packet) => {
  let result = JSON.parse(packet);
  return [result,result.payload ? true,false]//Wheter it is a request or response
}
