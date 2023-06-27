import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'

const CreateAccount = () => {

    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const createAccount = async () => {
        try{
            if(password !== confirmPassword){
                setError('Passwords do not match!')
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password )
            navigate('/articles');
        }
        catch (e){
            setError(e.message)
        }
    
    }

  return (
    <>
    <h2>Create Account</h2>


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

    <input 
    type="password"
    placeholder="Re-enter Password"
    value={confirmPassword}
    onChange={e => setConfirmPassword(e.target.value)}
    />

    <button onClick={createAccount}>Create Account</button>
    <Link to='/login'>Already have an account? Log In</Link>
</>
  )
}

export default CreateAccount