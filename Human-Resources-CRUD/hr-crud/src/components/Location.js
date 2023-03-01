import React,{useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./Navbar";


const Location = () => {
    const[locationdata,setLocationdata] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
      
    locationdisp();
},[])

const handleupdate =  (buildingid) => {
    localStorage.setItem("tempempid",buildingid);
    navigate('/updatelocation');
}

    const locationdisp = async () => {
        try{
            const res = await axios.get("http://localhost:8000/showlocation")
            console.log(res);
            console.log(res.data)
            setLocationdata(res.data);
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <>
    <Navbar/>
        <table class="table">
                <thead class="thead-dark">
            <tr>
                <th>Building ID </th>
                <th>Company Location </th>
                <th>Address </th>
                <th>ZIP Code</th>
                <th>Manager</th>
                <th><button className='btn btn-success' style={{width: "60px" } } onClick={() => {navigate("/addlocation")}} >ADD</button> </th>
                
            </tr>
            </thead>
       
        {locationdata ?  <>
            {locationdata.map((ldata,index) => {
                return(
                    (
                        <>
                        <tbody>
                            <tr>
                                <td> {ldata.buildingid} </td>
                                <td> {ldata.companylocation} </td>
                                <td> {ldata.address} </td>
                                <td> {ldata.zipcode}</td>
                                <td> {ldata.manager} </td>     
                                <td style={{display: "flex"}}> <button className='btn btn-primary' style={{marginRight : "10px"}}  
                                     onClick={(e) => {handleupdate(ldata.buildingid)}} >UPDATE</button> </td>                          
                            </tr>
                          </tbody>

                        </>
                )
                )

            }) }
        </>
        :
        <></>
        
    }
    
    </table>
    </>
  )
}

export default Location