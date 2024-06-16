import React,{useState} from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[username,setUsername]=useState('');
    const[password,setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmission = async (event)=>{
        event.preventDefault();
        const formData = {name,email,username,password}

        try{
            const response = await fetch('http://localhost:3000/api/auth/register',{
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

        }catch(error){
            console.error(error);
        }
    }


  return (
    <>
        <div className="container">
        <h2>User Registration</h2>
        <form  onSubmit={handleSubmission}>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" value={name} onChange={(event)=>setName(event.target.value)} id="name" name="name" required/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} id="email" name="email" required/>
            </div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(event)=> setUsername(event.target.value)} name="username" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} id="password" name="password" required/>
            </div>
            <div className="form-group">
                <input type="submit" value="Register"/>
            </div>
        </form>
    </div>
    </>
)
}

export default Register