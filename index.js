const WebSocket = require('ws');
const server = new WebSocket.Server({
  port: 8080
});

// let sockets = [];

server.on('connection', function(ws) {
    // Adicionamos cada nova conexão/socket ao array `sockets`
    //   sockets.push(socket);
    console.log('Novo cliente conectado');
    // console.log(ws);

    // Quando você receber uma mensagem
    ws.on('message', function(msg) {
        console.log(`Recebido: ${msg}`);
        // sockets.forEach(s => s.send(msg));
        ws.send(`Eco: ${msg}`);
    });

    // Quando a conexão de um socket é fechada/disconectada, removemos o socket do array
    ws.on('close', function() {
        // sockets = sockets.filter(s => s !== socket);
        console.log('Cliente desconectado!')
    });

    ws.on('error', function(error) {
        console.error(`Erroo: ${error}`);
    });
});

console.log('Servidor WebSocket rodando na porta 8080');