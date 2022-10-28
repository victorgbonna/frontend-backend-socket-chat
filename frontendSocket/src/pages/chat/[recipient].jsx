import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
// import Chatrecipient from '../../components/chat';


export default function ChatId({socket}) {
    const [user, setUser]=useState('')
    const router = useRouter()
    const { recipient } = router.query

    const joinRoom=()=>{
      //join with your username you inputted, only you can join this, unless someone else logs in with that same user input

        socket.emit('join_room', user)
    }

    useEffect(() => {
      //if no user is connected or no url param for the recipient
        if(!recipient || !user) return
        joinRoom()    
    }, [recipient]);

    
    return (
      <div>
        <input type="text" placeholder='username' 
        value={user} 
        onChange={(e)=>setUser(e.target.value)}/>
        <button onClick={()=>joinRoom()}>connect as this user</button>
        {/* <ChatC socket={socket} user={user} recipient={recipient}/> */}
        <ChatC socket={socket} recipient={recipient} user={user}/>
      </div>
    );
}

function ChatC({socket, recipient,user}) {
    const [currentMessage, setCurrentMessage]= useState("")
    const [messageList, setMessageList]= useState([])

    const sendMessage= async()=>{
      if(!currentMessage) return
      const messageData={
        sender:user,
        recipient,
        message:currentMessage,
        time:new Date(Date.now())
      }
      await socket.emit("send_message", messageData)
      
      setMessageList(list=> [messageData, ...list])
    }

    useEffect(() => {
      console.log("something happened")
      
      socket.on("recieve_message", messageObj=>{
        setMessageList((list)=>[messageObj,...list])
      })
    }, [socket]);

    

    return (
      <div>
        {messageList.map((msgContent,ind)=>
            <div key={ind}>
              <h2>{msgContent.message+" by "+ msgContent.sender+ " to "+msgContent.recipient}</h2>
              <p>{msgContent.time && msgContent.time.toString()}</p>
            </div>
        )}
        <div>
            <input type="text" value={currentMessage}
              onChange={(e)=>setCurrentMessage(e.target.value)}
            />
            <button onClick={()=>sendMessage()}>send</button>
        </div>
      </div>
    );
}

