import { useState } from "react";
import {useNavigate} from "react-router-dom";
export default function Login(){
    const navigate=useNavigate();
    const [username,setUser]=useState('');
    const [password,setPassword]=useState('');
    const handleUsername=(e)=>{
        setUser(e);
    }
    const handlePassword=(e)=>{
        setPassword(e);
    }
    return(
        <div>
            <form onSubmit={fxn}>
                <input 
                placeholder="username" 
                value={username}
                onChange={(e)=>handleUsername(e.target.value)}
                />
                <input 
                placeholder="password"
                value={password}
                onChange={(e)=>{handlePassword(e.target.value)}}
                />
                <button type='submit'>Login</button>

            </form>
        </div>
    )
}