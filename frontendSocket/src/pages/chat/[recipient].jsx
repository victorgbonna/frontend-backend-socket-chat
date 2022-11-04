import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

//look at how the socket was imported to a component. 
export default function ChatId({socket}) {
    const [user, setUser]=useState('')
    const router = useRouter()
    const { recipient } = router.query

    const joinRoom=()=>{
      //join with your username you inputted, only you can join this, unless someone else logs in with that same user input

        socket.emit('join_room', user) //see the "join" event, "join_room" is the name of the join event, your event name might be different.
        // while user are the argument passed, yours might be different. Since it is a chatting system, you should pass a user identification that is unique to that user.

    }

    useEffect(() => {      
        //This is how you emit an event on a component's first render
        joinRoom()    
    }, []);
    
    useEffect(() => {
        //when the backet emits an event - "init" event.This is how you listen to it .
      console.log("something happened")
      
      socket.on("init", data=>{
        //anything to do with the data
      })
       socket.on("recieve_message", data=>{
        //anything to do with the data
      })
    }, [socket]);


    const [messageList,setMessageList]= useState([])
      const sendMessage= ()=>{
            socket.emit("send_message", messageData)     //this is the event while sending message, if you notice, they have similar syntax with the "join room"
            setMessageList(list=> [messageData, ...list])
        }
    
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

