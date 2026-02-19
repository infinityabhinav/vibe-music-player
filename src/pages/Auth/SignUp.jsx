import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate=useNavigate()
    const [user,setUser]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const [error,setError]=useState("");

 async function handleSubmit(e){
    e.preventDefault();
    if(!user.firstName || !user.lastName || !user.email || !user.password){
        setError("Please fill all details !!")
    }
    else{
        setError("");
        const res=await fetch(`${import.meta.env.VITE_API_URI}/user/sign-up`,{
            method:"POST",
            headers:{
             "Content-Type":"application/json"
                 },
            body: JSON.stringify(user)
        })
        const message=await res.json();
        if(res.ok){
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
        <h2>Create Account</h2>

        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" placeholder="Enter first name..." onChange={(e)=>setUser((prev)=>({...prev,firstName:e.target.value}))} />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" placeholder="Enter last name..." onChange={(e)=>setUser((prev)=>({...prev,lastName:e.target.value}))} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email..."onChange={(e)=>setUser((prev)=>({...prev,email:e.target.value}))} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter password..." onChange={(e)=>setUser((prev)=>({...prev,password:e.target.value}))}/>

        {error && <p>{error}</p>}
        <button>Sign Up</button>
      </form>
        <button type="button" onClick={()=>navigate('/log-in')}>Go to Login Page</button>
    </div>
  )
}
