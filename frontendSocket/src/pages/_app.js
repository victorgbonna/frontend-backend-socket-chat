import { useState, useEffect } from "react";
import io from "socket.io-client"

const socket= io.connect('http://localhost:3001')

function MyApp({ Component, pageProps}) {
  // const [loading, setLoading] = useState(false);
  return (
    <>
      <Component {...pageProps} socket={socket}/>
    </>
  );
}

export default MyApp;
