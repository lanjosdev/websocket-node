import { useState, useRef } from 'react'

import imgGarra from './assets/maquina.png';
import './App.css'

export default function App() {
  const websocket = useRef(null);
  const [startGame, setStartGame] = useState(false);
  const [conectou, setConectou] = useState(false);
  const [erro, setErro] = useState(false);


  // useEffect(()=> {
  //   conectarWebSocket();
  // }, []);

  async function conectarWebSocket() {
    setStartGame(true);
    let videoCanvas;
    let ctx;
    let image;

    console.log('conectando...');
    websocket.current = new WebSocket("ws://10.10.0.235:5555");
    // websocket.current = new WebSocket("wss://websocket-node-dgrx.onrender.com");

    // Quando se ABRE conexão:
    websocket.current.onopen = (event)=> {
      setConectou(true);
      console.log('WebSocket connection opened:', event);
    }

    // Quando RECEBE mensagem:
    websocket.current.onmessage = (event)=> {
      // console.log('WebSocket message received:', event.data);
      videoCanvas = document.getElementById('canvasVideo');
      ctx = videoCanvas.getContext("2d");
      image = new Image();

      image.src = URL.createObjectURL(event.data);
      image.addEventListener("load", () => {
          ctx.drawImage(image, 0, 0, videoCanvas.width, videoCanvas.height);
      });
    }

    // Quando FECHA conexão:
    websocket.current.onclose = (event)=> {
      console.log('WebSocket connection closed:', event);
      setConectou(false);
      setStartGame(false);
    }

    // Quando dá ERRO:
    websocket.current.onerror = (error)=> {
      console.log('WebSocket error:', error);
      setConectou(false);
      setStartGame(false);
      setErro(true);
    }
  }
  

  // Criando um ArrayBuffer com um tamanho de 1 byte
  const buffer = new ArrayBuffer(1);
  // Criando uma visualização para manipular o buffer como um array de 8 bits sem sinal
  const view = new Uint8Array(buffer);

  function onUp() {
    view[0] = 1; // Comando 'pra cima'
    websocket.current.send(buffer);
  }
  function onDown() {
    view[0] = 2; // Comando 'pra baixo'
    websocket.current.send(buffer);
  }
  function onRight() {
    view[0] = 3; // Comando 'pra direita'
    websocket.current.send(buffer);
  }
  function onLeft() {
    view[0] = 4; // Comando 'pra esquerda'
    websocket.current.send(buffer);
  }

  function ativarGarra() {
    view[0] = 5; // Botão que aciona a garra
    websocket.current.send(buffer);
  }

  function notPress() {
    view[0] = 0; // Nenhum botão sendo apertado
    websocket.current.send(buffer);
  }


  return (
    <div className='AppContainer'>

      <h1>Game Protótipo</h1>      

      {startGame ? (
        conectou ? (
          <>
          <canvas id="canvasVideo"/>

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
          </>
        ) : (
          <div className='loading'>
            Conectando...
          </div>
        )
        
      ) : (
        <>
        <div className='ilustra'>
          <img src={imgGarra} alt="" />
        </div>

        
        <button onClick={conectarWebSocket} className='btn-jogar'>JOGAR</button> 

        {erro && <p>Erro ao conectar no servidor!</p>}
        </>
      )}      
      
    </div>
  )
}