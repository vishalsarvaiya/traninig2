import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const Loginform = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState([]);

    const handlesubmit = async (e) => {
        e.preventDefault();

        if (
            !email ||
            !password
        ) {
            return (
                alert("all fields are required")
            );
        }
        else if (password.length < 8) {
            return (
                alert("Password Must Have Atleast 8  Character")
            )
        }
        else {
            await axios.post("http://localhost:8000/login", {
                email: email,
                password: password
            })
            .then((res) => {
                const token = res.data.token;
                console.log(token);
                navigate("/");
                localStorage.setItem("token", token);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div>
            <Navbar />

            <div className="container d-flex justify-content-center">
            <form onSubmit={handlesubmit} className='col-5 mt-5' >
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" value={email} name='email' onChange={(e) => { setEmail(e.target.value) }}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" value={password} name='password' 
                    onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                
                <button type="submit" class="btn btn-primary" >Login</button>
                <Link to={"/register"} type="submit" class="btn btn-dark ms-2"  >Register</Link>
            </form>
            </div>

        </div>
    )
}

export default Loginform