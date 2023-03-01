import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';

const Updateemp = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [contactno, setContactno] = useState("");
    const [homeaddress, setHomeaddress] = useState("");
    const [email, setEmail] = useState("");
    const[worklocation,setWorklocation] = useState([]);
    const [myWorkLocation,setMyWorkLocation] = useState("");
    const [eid, setEid] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        updatesetdata();
    }, [])

    useEffect(() => {
        worklocationadd();
    },[])

    const worklocationadd = async () => {
        try {
            const res = await axios.get("http://localhost:8000/worklocation")
            console.log("location data",res.data);
            setWorklocation(res.data);
            //console.log("empdat", empdata);
        }
        catch (err) {
            console.log(err);
        }

    }

    const updatesetdata = async () => {
        try {
            console.log("update set data")
            const eid = localStorage.getItem("tempempid");
            console.log("LOCAL STORE GET EID", eid);
            const res = await axios.get("http://localhost:8000/update", 
            { params: { eid } })
            console.log("update click", eid);
            setEid(eid);
            console.log(res.data)
            
            console.log("fisrtname",res.data[0].firstname);
            setFirstname(res.data[0].firstname)
            setLastname(res.data[0].lastname)
            setContactno(res.data[0].contactnumber)
            setHomeaddress(res.data[0].homeaddress)
            setMyWorkLocation(res.data[0].worklocation)
            setEmail(res.data[0].email)
        }
        catch (err) {
            console.log(err);
        }
    }


    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!firstname) {
            alert("firstname is Required")
        }
        else if (!lastname) {
            alert(" lastname is Required")
        }
        else if (!contactno) {
            alert(" contactno is Required")
        }
        else if (!homeaddress) {
            alert(" homeaddress is Required")
        }
        else if (!myWorkLocation) {
            alert(" worklocation is Required")
        }
        else if (!email) {
            alert(" email is Required")
        }


    else{

        
           const res = await axios.post("http://localhost:8000/updatesetdata",{
                eid : eid,
                firstname : firstname,
                lastname : lastname,
                contactno : contactno,
                homeaddress : homeaddress,
                worklocation : myWorkLocation,
                email : email
            })
            .then((res) => {
                console.log("return data upadated")
                console.log(res.data);
                setFirstname(res.data.firstname)
                navigate("/");
                
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <>
        <Navbar/>
            <form className="col-4" onSubmit={handlesubmit}  >
                <div className="form-group">
                    <label>Firstname</label>
                    <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} className="form-control" placeholder="Firstname" />
                </div>
                <div className="form-group">
                    <label>Lastname</label>
                    <input type="text" value={lastname} onChange={(e) => { setLastname(e.target.value) }} className="form-control" placeholder="Lastname" />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="number" value={contactno} onChange={(e) => { setContactno(e.target.value) }} className="form-control" placeholder="Contact Number" />
                </div>
                <div className="form-group">
                    <label>Home Address</label>
                    <input type="text" value={homeaddress} onChange={(e) => { setHomeaddress(e.target.value) }} className="form-control" placeholder="Home Address" />
                </div>
                <div className="form-group">
                    <label>Worklocation</label>
                    <select name="location" value={myWorkLocation}
                        onChange={(e) => {
                            setMyWorkLocation(e.target.value);
                        }} >
                        {worklocation.map((item, index) => (

                            <option
                                value={item.address}>
                                {item.address}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="form-group">
                    <label>Worklocation</label>
                    <input type="text" value={worklocation} onChange={(e) => { setWorklocation(e.target.value) }} className="form-control" placeholder="Worklocation" />
                </div> */}
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Email" />
                </div>

                <button type="submit" className="btn btn-primary"  >Submit</button>
                <button type="submit" className="btn btn-dark" style={{ marginLeft: "10px" }} onClick={() => { navigate("/") }} >Cancel</button>
            </form>
        </>
    )
}

export default Updateemp