
// imports
const mosca = require('mosca');

const broker = new mosca.Server({
    port: 9000
})

// este evento se ejcuta cuando el server esta on
broker.on('ready', () => {
    console.log('Broker mosca is ready..');
})

// este evento se ejecuta cuando un cliente se conecta, publicador o suscriptor
broker.on('clientConnected', (cliente) => {
    console.log('hola');
})

// se ejecuta cuando el broker sercibe una publicación, esto es de test
broker.on('published', (packet) => {
    console.table(packet.payload)
    console.log(packet.topic);

})