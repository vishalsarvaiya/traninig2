import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Registrationform = () => {
    const navigate = useNavigate();
    const[firstname,setFirstname] = useState("");
    const[lastname,setLastname] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmpassword] = useState("");
    const[mobilenumber,setMobilenumber] = useState("");
    const[gender,setGender] = useState("");
    const[address,setAddress] = useState("");
    const[dob,setDob] = useState("");
  
    const[data,setData] = useState([]);


    const handlesubmit = async (e) => {
        e.preventDefault();

        if (
            !firstname ||
            !lastname ||
            !email ||
            !password ||
            !confirmpassword ||
            !mobilenumber ||
            !gender ||
            !address ||
            !dob
          ) {
            return (
                        alert("all fields are required")
                    );
          }

        else if(password.length < 8) {  
            
            return (
                alert("Password Must Have Atleast 8 Character")
            )
         }  
        else if(password != confirmpassword)
        {
            return(
                alert("Password And Confirm Password Must Be Same")
            )
        }
        else{
            console.log("in registretion from")
            await axios.post("http://localhost:8000/registration", {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                confirmpassword: confirmpassword,
                mobilenumber : mobilenumber,
                gender : gender,
                address : address,
                dob : dob
            }).then((res) => {
                    setData(res.data);
                    console.log(res.data);
                    navigate("/")
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
                <div className ="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Firstname</label>
                    <input type='text' value = {firstname} className="form-control" name = 'firstname' onChange ={(e) => {setFirstname(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Lastname</label>
                    <input type='text' className="form-control" value = {lastname} name = 'lastname' onChange ={(e) => {setLastname(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Email</label>
                    <input type='email' className="form-control" value = {email} name = 'email' onChange ={(e) => {setEmail(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type='password' className="form-control" value = {password} name = 'password' onChange ={(e) => {setPassword(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type='password' className="form-control" value = {confirmpassword} name = 'confpassword' onChange ={(e) => {setConfirmpassword(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Mobile  Number</label>
                    <input type='number' className="form-control" value = {mobilenumber} name = 'mobilenumber' onChange ={(e) => {setMobilenumber(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Gender :</label>
                    <input type='radio' style={{marginLeft: "10px"}} name = 'gender' value="Male" onChange={(e) => {setGender(e.target.value) }} />Male  
                    <input type='radio' style={{marginLeft: "10px"}} name = 'gender' value="Female" onChange={(e) => {setGender(e.target.value) }} />Female
                </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Address</label>
                    <textarea name = 'address' className="form-control" value = {address} onChange = {(e) => { setAddress(e.target.value) }}/>
               </div>

                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">DOB</label>
                    <input type='date' className="form-control" value = {dob} name = 'dob' onChange ={(e) => {setDob(e.target.value) }} />
                </div>
                <input type="submit" className="btn btn-primary" value="submit"/>
                {/* <Link to={"/register"} type="submit" className="btn btn-primary"  >Register</Link> */}
                <Link to={"/"} type="submit" className="btn btn-primary ms-2"  >Back</Link>
            </form>
            </div>
    </div>
  )
}

export default Registrationform