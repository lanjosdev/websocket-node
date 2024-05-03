import { useEffect } from "react";

export function VideoCanvas() {

    useEffect(()=> {
        let socket = new WebSocket("ws://10.10.0.185:5555");
        let msg = document.getElementById("msg");

        socket.addEventListener('message', (e) => {
            let ctx = msg.getContext("2d");
            let image = new Image();
            image.src = URL.createObjectURL(e.data);
            image.addEventListener("load", () => {
                ctx.drawImage(image, 0, 0, msg.width, msg.height);
            });
        });

    }, []);   
   

    return (
        <div className='VideoContainer'>

            <canvas id="msg" />

        </div>
    )
}