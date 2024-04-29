import { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const websocket = useRef(null);
  const [conectou, setConectou] = useState(false);


  function conectarWebSocket() {
    websocket.current = new WebSocket("ws://localhost:8080");

    // Quando se ABRE conexão:
    websocket.current.onopen = (event)=> {
      console.log('WebSocket connection opened:', event);
      setConectou(true);
    }

    // Quando RECEBE mensagem:
    websocket.current.onmessage = (event)=> {
      console.log('WebSocket message received:', event.data);
      // let message = JSON.parse(event.data);

      // if(message.eixo == 'y') {
      //   console.log(message.valor);
      // }
    }

    // Quando FECHA conexão:
    websocket.current.onclose = (event)=> {
      console.log('WebSocket connection closed:', event);
      setConectou(false);
    }

    // Quando dá ERRO:
    websocket.current.onerror = (error)=> {
      console.log('WebSocket error:', error);
      setConectou(false);
    }
  }

  function onUp() {
    let objSend = {
      eixo: 'y',
      valor: 1
    };
    websocket.current.send(JSON.stringify(objSend));
  }
  function onDown() {
    let objSend = {
      eixo: 'y',
      valor: -1
    };
    websocket.current.send(JSON.stringify(objSend));
  }
  function onRight() {
    let objSend = {
      eixo: 'x',
      valor: 1
    };
    websocket.current.send(JSON.stringify(objSend));
  }
  function onLeft() {
    let objSend = {
      eixo: 'x',
      valor: -1
    };
    websocket.current.send(JSON.stringify(objSend));
  }

  function notPress() {
    // console.log(0);
    websocket.current.send(0);
  }


  return (
    <div className='AppContainer'>
      <h1>Front</h1>
      
      <iframe 
        src="https://launch.playcanvas.com/1952045?debug=true"
        loading="eager"
        allowfullscreen="true"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation">
      </iframe>

      {conectou ? (
        <div className='controle'>
          <button onMouseDown={onUp} onMouseUp={notPress}>UP</button>
          <button onMouseDown={onDown} onMouseUp={notPress}>DOWN</button>
          <button onMouseDown={onRight} onMouseUp={notPress}>RIGHT</button>
          <button onMouseDown={onLeft} onMouseUp={notPress}>LEFT</button>
        </div>
      ) : (
        <button onClick={conectarWebSocket}>Conectar</button>
      )}
      
    </div>
  )
}