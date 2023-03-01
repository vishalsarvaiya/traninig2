import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import Navbar from './Navbar';



const MyProfile = () => {
    const navigate = useNavigate();
    const[id,setId] = useState("");
    const[firstname,setFirstname] = useState("");
    const[lastname,setLastname] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmpassword] = useState("");
    const[mobilenumber,setMobilenumber] = useState("");
    const[address,setAddress] = useState("");
    const[gender,setGender] = useState("");
    const[dob,setDob] = useState("");


    const[data,setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setData([]);
        }
    }, [])

    useEffect(() => {

    }, [data])

    useEffect(() => {
        profile();
    },[])

    const profile = async () => {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:8000/profile", {params:{token}})
        .then((res) => {
            setData(res.data);
            setId(res.data.id)
            setFirstname(res.data.firstname)
            setLastname(res.data.lastname)
            setGender(res.data.gender)
            setAddress(res.data.address)
            setEmail(res.data.email)
            setMobilenumber(res.data.mobilenumber)
            const dob = (res.data.dob).slice(0,10);
            //setDob((res.data.dob) )
            setDob(dob )
            console.log("from client",res.data);
        })
        .catch((err) => {
            setData([]);
            console.log(err);
        })
    }


    const handleupdate = async (e) => {
        e.preventDefault();

        if (
            !firstname ||
            !lastname ||
            !mobilenumber ||
            !gender ||
            !address ||
            !dob
          ) {
            return (
                        alert("all fields are required")
                    );
          }
        else{
            console.log("in registretion from")
            await axios.post("http://localhost:8000/update", {
                firstname: firstname,
                lastname: lastname,
                email: email,
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
    <>
        <Navbar/>
        <form onSubmit={handleupdate}>
       <table>
            <tr>
                <td>Customer Number</td>
                <td><input type='text' name = "id" value = {id} readonly="readonly" onChange ={(e) => {setId(e.target.value) }}/> </td>
            </tr>

            <tr>
                <td>Firstname</td>
                <td><input type='text' name = "id" value = {firstname} onChange={(e) => {setFirstname(e.target.value)}} /></td>
            </tr>

            <tr>
                <td>Lastname</td>
                <td><input type='text' name = "id" value = {lastname} onChange ={(e) => {setLastname(e.target.value) }}/></td>
            </tr>

            <tr>
                <td>Gender</td>
                <td><input type='text' name = "id" value = {gender} onChange ={(e) => {setGender(e.target.value) }}/></td>
            </tr>

            <tr>
                <td>Address</td>
                <td><input type='text' name = "id" value = {address} onChange ={(e) => {setAddress(e.target.value) }}/></td>
            </tr>

            <tr>
                <td>Email</td>
                <td><input type='text' name = "id" readonly="readonly" value = {email} onChange ={(e) => {setEmail(e.target.value) }} /></td>
            </tr>

            <tr>
                <td>Mobile No.</td>
                <td><input type='text' name = "id" value = {mobilenumber} onChange ={(e) => {setMobilenumber(e.target.value) }}/></td>
            </tr>

            <tr>
                <td>Date Of Birth</td>
                <td><input type='text' name = "id" value = {dob} onChange ={(e) => {setDob(e.target.value) }}/></td>
            </tr>
              <tr>
                  <td><input type="submit" className="btn btn-primary" value="submit" onClick={() => { navigate("/products") }} /></td>
                  <td><input onClick={() => { navigate("/products") }} value="Back" type="submit" className="btn btn-primary ms-2" /></td>
              </tr>
       </table>
       </form>
    </>
  )
}

export default MyProfile