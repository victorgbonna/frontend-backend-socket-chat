import Link from 'next/link'
import { useState } from 'react';

export default function Notify() {
    const [show, setShow]= useState(false)
    return (
      <div>
        <h2 onClick={()=>setShow(!show)}>Notify</h2>
      </div>
    );
}