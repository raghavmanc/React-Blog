import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {

const [email,setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')

const navigate = useNavigate();

const logIn = async () => {
    try{
        await signInWithEmailAndPassword(getAuth(), email, password )
        navigate('/articles');
    }
    catch (e){
        setError(e.message)
    }

}

  return (
    <>
        <h2>Login Form</h2>

        

        {error && <p className="error">{error}</p>}

        <input 
        type="text"
        placeholder="abc123@gmail.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        />

        <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        />

        <button onClick={logIn}>Login</button>
        <Link to='/signup'>Create New Account</Link>
    </>
  )
}

export default Login