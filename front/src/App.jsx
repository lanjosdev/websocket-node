import { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const websocket = useRef(null);
  const [conectou, setConectou] = useState(false);


  function conectarWebSocket() {
    console.log('conectando...');
    websocket.current = new WebSocket("wss://websocket-node-dgrx.onrender.com");

    // Quando se ABRE conexão:
    websocket.current.onopen = (event)=> {
      console.log('WebSocket connection opened:', event);
      setConectou(true);
    }

    // Quando RECEBE mensagem:
    websocket.current.onmessage = (event)=> {
      console.log('WebSocket message received:', event.data);
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

  function ativarGarra() {
    console.log('ativa garra');
  }


  return (
    <div className='AppContainer'>
      <h1>Front (ReactJS)</h1>
      
      <iframe 
        src="https://dev3.rbiz.cc/playcanvas"
        loading="eager"
      >
      </iframe>

      {conectou ? (

        <div className="painel">
          <div className='controle'>
            <button onMouseDown={onUp} onTouchStart={onUp} onMouseUp={notPress} onTouchEnd={notPress}>
              <ion-icon name="caret-up"></ion-icon>
            </button>
            <div className="eixo-x">
              <button onMouseDown={onLeft} onTouchStart={onLeft} onMouseUp={notPress} onTouchEnd={notPress}>
                <ion-icon name="caret-back"></ion-icon>
              </button>
              <button onMouseDown={onRight} onTouchStart={onRight} onMouseUp={notPress} onTouchEnd={notPress}>
                <ion-icon name="caret-forward"></ion-icon>
              </button>
            </div>
            <button onMouseDown={onDown} onTouchStart={onDown} onMouseUp={notPress} onTouchEnd={notPress}>
              <ion-icon name="caret-down"></ion-icon>
            </button>
          </div>

          <div className='btn-garra'>
            <button onClick={ativarGarra}></button>
          </div>
        </div>

      ) : (

        <button onClick={conectarWebSocket} className='btn-conectar'>JOGAR</button>

      )}
      
    </div>
  )
}