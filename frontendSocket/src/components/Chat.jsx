import Link from 'next/link'
import { useState, useEffect } from 'react';
// import Chatroom from '../../components/chat';

export default function Chatroom({socket, user, room}) {
    const [currentMessage, setCurrentMessage]= useState("")
    const [a, setA]= useState("")
    const sendMessage= async()=>{
      if(!currentMessage) return
      const messageData={
        room, sender:{
          user, img:"/img/alt.png"
        },
        message:currentMessage,
        time:new Date()
      }
      // await socket.emit("send_message", messageData)
      setA(new Date())
      console.log(a)
    }

    useEffect(() => {
      console.log("something happened")
      // socket.on("recieve_message", messageObj=>{
      //   console.log({messageObj})
      // })
    }, [a]);

    return (
      <div>
        {[1].map((test,ind)=>
            <p key={ind}>{test}</p>
        )}
        <div>
            <input type="text" value={currentMessage}
              onChange={(e)=>setCurrentMessage(e.target.value)}
            />
            sk
            <button onClick={()=>sendMessage()}>send</button>
        </div>
      </div>
    );
}