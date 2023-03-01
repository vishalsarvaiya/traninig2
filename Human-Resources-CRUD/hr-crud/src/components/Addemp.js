import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';

const Addemp = () => {
    const [empid, setEmpid] = useState("");
    const[firstname,setFirstname] = useState("");
    const[lastname,setLastname] = useState("");
    const[contactno,setContactno] = useState("");
    const[homeaddress,setHomeaddress] = useState("");
    const[worklocation,setWorklocation] = useState([]);
    const [myWorkLocation,setMyWorkLocation] = useState("");
    const[email,setEmail] = useState("");
    const[socialsn,setSocialsn] = useState("");
    const[salary,setSalary] = useState("");

    const navigate = useNavigate();

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

    const handlesubmit = async (e) => {
        e.preventDefault();
       
        if (!firstname) {
            alert("firstname is Required")
        }
        else if (!empid) {
            alert("Employee ID is Required")
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
        else if (!socialsn) {
            alert(" Social Security Number is Required")
        }
        else if (!salary) {
            alert(" Salary is Required")
        }

else{
       const res = await axios.post("http://localhost:8000/addempdata",{
            empid : empid,
            firstname : firstname,
            lastname : lastname,
            contactno : contactno,
            homeaddress : homeaddress,
            worklocation : myWorkLocation,
            email : email,
            socialsn : socialsn,
            salary : salary
        })
        .then((res) => {
            console.log(res.data);
            console.log("response received")
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
        <form className="col-4" onSubmit={handlesubmit}>

        <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              value={empid}
              onChange={(e) => {
                setEmpid(e.target.value);
              }}
              className="form-control"
              placeholder="Employee ID"
            />
          </div>
          <div className="form-group">
            <label>Firstname</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              className="form-control"
              placeholder="Firstname"
            />
          </div>
          <div className="form-group">
            <label>Lastname</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              className="form-control"
              placeholder="Lastname"
            />
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="number"
              value={contactno}
              onChange={(e) => {
                setContactno(e.target.value);
              }}
              className="form-control"
              placeholder="Contact Number"
            />
          </div>
          <div className="form-group">
            <label>Home Address</label>
            <input
              type="text"
              value={homeaddress}
              onChange={(e) => {
                setHomeaddress(e.target.value);
              }}
              className="form-control"
              placeholder="Home Address"
            />
          </div>

          <div className="form-group">
            <label>Worklocation</label>
            <select name="location"  value={myWorkLocation}
            onChange = {(e) => {
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


          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <strong style = {{marginLeft:"8rem", fontSize:"30px"}} >Details For HR:</strong>
          <div className="form-group">
            <label>Social Security Number</label>
            <input
              type="text"
              value={socialsn}
              onChange={(e) => {
                setSocialsn(e.target.value);
              }}
              className="form-control"
              placeholder="Social Security Number "
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              className="form-control"
              placeholder="Salary"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </form>
      </>
    );
}

export default Addemp