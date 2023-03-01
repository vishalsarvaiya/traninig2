import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';

const Addlocation = () => {
    const [buildingid, setBuildingid] = useState("");
    const[companylocation,setCompanylocation] = useState("");
    const[address,setAddress] = useState("");
    const[zipcode,setZipcode] = useState("");
    const[manager,setManager] = useState("");
   
    const navigate = useNavigate();

   
    const handlesubmit = async (e) => {
        e.preventDefault();
       
        if (!buildingid) {
            alert("firstname is Required")
        }
        else if (!companylocation) {
            alert("Employee ID is Required")
        }
        else if (!zipcode) {
            alert(" lastname is Required")
        }
        else if (!address) {
            alert(" contactno is Required")
        }
        else if (!manager) {
            alert(" homeaddress is Required")
        }
      
else{
       const res = await axios.post("http://localhost:8000/addlocation",{
           buildingid : buildingid,
           companylocation : companylocation,
           zipcode : zipcode,
           address : address,
           manager : manager
        })
        .then((res) => {
            console.log(res.data);
            console.log("response received")
            navigate("/location");
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
            <label>Building ID</label>
            <input
              type="text"
              value={buildingid}
              onChange={(e) => {
                setBuildingid(e.target.value);
              }}
              className="form-control"
              placeholder="Building ID"
            />
          </div>
          <div className="form-group">
            <label>Company Location</label>
            <input
              type="text"
              value={companylocation}
              onChange={(e) => {
                setCompanylocation(e.target.value);
              }}
              className="form-control"
              placeholder="Company Location"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className="form-control"
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="number"
              value={zipcode}
              onChange={(e) => {
                setZipcode(e.target.value);
              }}
              className="form-control"
              placeholder="Zip Code"
            />
          </div>
          <div className="form-group">
            <label>Manager</label>
            <input
              type="text"
              value={manager}
              onChange={(e) => {
                setManager(e.target.value);
              }}
              className="form-control"
              placeholder="Manager"
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
              navigate("/location");
            }}
          >
            Cancel
          </button>
        </form>
      </>
    );
}

export default Addlocation