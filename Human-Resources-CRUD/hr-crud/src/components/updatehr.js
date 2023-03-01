import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';

const Updatehr = () => {
   
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [eid, setEid] = useState("")
    const[socialsn,setSocialsn] = useState("");
    const[salary,setSalary] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        updatesetdata();
    }, [])
  

    const updatesetdata = async () => {
        try {
            console.log("update set data")
            const eid = localStorage.getItem("tempempid");
            console.log("LOCAL STORE GET EID", eid);
            const res = await axios.get("http://localhost:8000/hrupdate", 
            { params: { eid } })
            console.log("update click", eid);
            setEid(eid);
            console.log(res.data)
            
            console.log("fisrtname",res.data[0].firstname);
            setFirstname(res.data[0].firstname)
            setLastname(res.data[0].lastname)
            setEid(res.data[0].eid)
            setSocialsn(res.data[0].socialsecurityno)
            setSalary(res.data[0].salary)
        }
        catch (err) {
            console.log(err);
        }
    }


    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!socialsn) {
            alert("Social Security Number is Required")
        }
        else if (!salary) {
            alert(" Salary is Required")
        }
    else{
           const res = await axios.post("http://localhost:8000/hrupdatesetdata",{
               eid:eid,
               socialsn : socialsn,
               salary : salary
                
            })
            .then((res) => {
                console.log("return data upadated")
                console.log(res.data);
                // setFirstname(res.data.firstname)
                navigate("/Hr");
                
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
                
                <p>Firstname : <b>{firstname}</b></p>
                </div>
                <div className="form-group">
                    <p>Lastname : <b>{lastname}</b></p>
                 </div>
                 <div className="form-group">
                    <p>Employee Id : <b>{eid}</b></p>
                </div>
                <div className="form-group">
                    <label>Social Security Number</label>
                    <input type="text" value={socialsn} onChange={(e) => { setSocialsn(e.target.value) }} className="form-control" placeholder="Social security number" />
                </div>             
                <div className="form-group">
                    <label>Salary</label>
                    <input type="number" value={salary} onChange={(e) => { setSalary(e.target.value) }} className="form-control" placeholder="salary" />
                </div>
               
                <button type="submit" className="btn btn-primary"  >Submit</button>
                <button type="submit" className="btn btn-dark" style={{ marginLeft: "10px" }} onClick={() => { navigate("/Hr") }} >Cancel</button>
            </form>
        </>
    )
}

export default Updatehr