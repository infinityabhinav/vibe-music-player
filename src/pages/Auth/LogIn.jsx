import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


export default function LogIn() {
    const navigate=useNavigate()
    const{ userAuth,setUserAuth}=useContext(AuthContext)
    const [user,setUser]=useState({
            email:"",
            password:""
        })
        const [error,setError]=useState("");
    
     async function handleSubmit(e){
        e.preventDefault();
        if( !user.email || !user.password){
            setError("Please fill all details !!")
        }
        else{
            setError("");
            const res=await fetch(`${import.meta.env.VITE_API_URI}/user/log-in`,{
                method:"POST",
                headers:{
                 "Content-Type":"application/json"
                     },
                credentials:"include", 
                body: JSON.stringify(user)
            })
            const message=await res.json();
            if(res.ok){
                setUserAuth(message.data)
                navigate("/")
                
            }
            else{
                setError(message.message)
            }
    
        }
     }
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Log In to Your Account</h2>

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email..." onChange={(e)=>setUser((prev)=>({...prev,email:e.target.value}))} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter password..." onChange={(e)=>setUser((prev)=>({...prev,password:e.target.value}))}/>
        {error && <p>{error}</p>}

        <button>Log In</button>


        <button type="button" onClick={()=>navigate("/sign-up")}>Go to Sign Up Page</button>
      </form>
    </div>
  )
}
