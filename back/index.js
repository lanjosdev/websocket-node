// Libs:
const WebSocket = require('ws');
const dotenv = require('dotenv');
dotenv.config();

// Instancia o websocket server:
const wsServer = new WebSocket.Server({
  port: process.env.PORT || 8080
});

let clientes = [];

//Evento: Quando algum cliente se conectou
wsServer.on('connection', function(ws) {
    // Limita em até dois clientes
    if(clientes.length >= 2) {
        ws.send('Já está cheio!');
        ws.close();
        return;
    } 
    else {
        clientes.push(ws);
        console.log('Novo cliente conectado ' + clientes.length);
    }
    
    // let sendJson = {
    //     "dataType":"id",
    //     "jsonData":"1"
    // };
    // ws.send(JSON.stringify(sendJson));


    // Evento: Quando recebe uma mensagem
    ws.on('message', function(msg) {
        // console.log(`Mensagem: ${msg}`);
        // sockets.forEach(s => s.send(msg));
        // ws.send(`Eco: ${msg}`);  
        wsServer.clients.forEach((client)=> client.send(msg.toString())); // Envia para todos os clientes
    });

    // Evento: Quando a conexão é fechada
    ws.on('close', function() {
        clientes = clientes.filter(client => client !== ws);
        console.log('Cliente desconectado!')
    });

    // Evento: Quando tem algum erro
    ws.on('error', function(error) {
        console.error(`Erro!: ${error}`);
    });
});

console.log(`Servidor WebSocket rodando na porta ${wsServer.options.port}`);