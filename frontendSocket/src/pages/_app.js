//this is the _app.js file in next js, there is a file similar in react. App.js file is similar
import { useState, useEffect } from "react";
import io from "socket.io-client"
//npm install socket.io-client
const socket= io.connect('http://localhost:3001') //this should be the api url

function MyApp({ Component, pageProps}) {

  return (
    <>
      <Component {...pageProps} socket={socket}/> //look at how I passed the socket
    </>
  );
}


export default MyApp;

//react App.js should be like this
//import "./App.css";
//import { BrowserRouter, Route,Routes } from "react-router-dom";

//import io from "socket.io-client"
//const socket= io.connect('http://localhost:3001') //this should be the api url

//function App() {
  //return (
  //<Routes>
    //<Route path='/chat' element={<Chat />} socket={socket}>
  //</Routes>

  //);
//}

//export default App;
