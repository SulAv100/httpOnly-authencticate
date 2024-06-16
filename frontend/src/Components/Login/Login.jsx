import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginForm = async (event)=>{
        event.preventDefault();

        const formData = {email, password}

        try{
            const response = await fetch('http://localhost:3000/api/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData),
                credentials:'include'

            })

            const data = await response.json();

            if(response.ok){
                alert(data.message);
                navigate('/');

            }else{
                alert(data.message);
            }
        }
        catch(error){
            console.error(error);
        }
    }
  return (
    <>
        <div className="container">
        <h2>User Login</h2>
        <form onSubmit={handleLoginForm}>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} id="username" name="username" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(event)=> setPassword(event.target.value)} id="password" name="password" required/>
            </div>
            <div className="form-group">
                <input type="submit" value="Login"/>
            </div>
            <div className="form-group">
                <span className="signup-link">Don't have an account? <a href="/register">Sign up</a></span>
            </div>
        </form>
    </div>
    </>
)
}

export default Login