import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';

const Updatelocation = () => {
  
    const [buildingid, setBuildingid] = useState("");
    const [blocation, setBlocation] = useState("");
    const [address, setAddress] = useState("");
    const[zipcode,setZipcode] = useState("");
    const [manager,setManager] = useState("");
  
    const navigate = useNavigate();

    useEffect(() => {
        updatesetdata();
    }, [])

    

    const updatesetdata = async () => {
        try {
            console.log("update set data")
            const buildingid = localStorage.getItem("tempempid");
            console.log("LOCAL STORE GET EID", buildingid);
            const res = await axios.get("http://localhost:8000/updatelocation", 
            { params: { buildingid } })
            console.log("update click", buildingid);
            // setEid(eid);
            console.log(res.data)
            
            console.log("buildingid",res.data[0].buildingid);
            setBuildingid(res.data[0].buildingid)
            setBlocation(res.data[0].companylocation)
            setAddress(res.data[0].address)
            setZipcode(res.data[0].zipcode)
            setManager(res.data[0].manager)
            
        }
        catch (err) {
            console.log(err);
        }
    }


    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!buildingid) {
            alert("buildingid is Required")
        }
        else if (!blocation) {
            alert(" location is Required")
        }
        else if (!address) {
            alert(" address is Required")
        }
        else if (!zipcode) {
            alert(" zipcode is Required")
        }
        else if (!manager) {
            alert(" manager is Required")
        }
      
    else{
           const res = await axios.post("http://localhost:8000/updatesetlocation",{
              buildingid : buildingid,
              blocation : blocation,
              address : address,
              zipcode : zipcode,
              manager : manager
            })
            .then((res) => {
                console.log("return data upadated")
                console.log(res.data);
                // setFirstname(res.data.buildingid)
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
            <form className="col-4" onSubmit={handlesubmit}  >
                <div className="form-group">
                    <label>Building ID</label>
                    <input type="text" value={buildingid} onChange={(e) => { setBuildingid(e.target.value) }} className="form-control" placeholder="Building ID" />
                </div>
                <div className="form-group">
                    <label>Building location</label>
                    <input type="text" value={blocation} onChange={(e) => { setBlocation(e.target.value) }} className="form-control" placeholder="Building location" />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} className="form-control" placeholder="Address" />
                </div>
                <div className="form-group">
                    <label>Zip Code</label>
                    <input type="text" value={zipcode} onChange={(e) => { setZipcode(e.target.value) }} className="form-control" placeholder="Zip Code" />
                </div>
                <div className="form-group">
                    <label>Manager</label>
                    <input type="text" value={manager} onChange={(e) => { setManager(e.target.value) }} className="form-control" placeholder="Manager" />
                </div>
                
               
                <button type="submit" className="btn btn-primary"  >Submit</button>
                <button type="submit" className="btn btn-dark" style={{ marginLeft: "10px" }} onClick={() => { navigate("/location") }} >Cancel</button>
            </form>
        </>
    )
}

export default Updatelocation