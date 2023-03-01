import React,{useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import Navbar from "./Navbar";


const Hr = () => {
    const[hrdata,setHrdata] = useState([]);
    const navigate = useNavigate();
    useEffect(()=> {
      
    hrdisp();
},[])

    const hrdisp = async () => {
        try{
            const res = await axios.get("http://localhost:8000/showhr")
            console.log(res);
            console.log(res.data)
            setHrdata(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleupdate =  (eid) => {
        localStorage.setItem("tempempid",eid);
        navigate('/updatehr');
    }

  return (
    <>
    <Navbar/>
         <table class="table" style={{textAlign:"center"}}>
                <thead class="thead-dark">
            <tr>
                {/* <td>Employee ID </td> */}
                <th>EID</th>
                {/* <th>Payroal </th> */}
                <th>Social Security No. </th>
                
                <th>Salary</th>
                <th>&nbsp;</th>
              
            </tr>
            </thead>
       
        {hrdata ?  <>
            {hrdata.map((hdata,index) => {
                return(
                    (
                        <>
                        <tbody>
                            <tr>
                                {/* <td> {hdata.id} </td> */}
                                <td> {hdata.eid}</td>
                                {/* <td> {hdata.employeepayroal} </td> */}
                                <td> {hdata.socialsecurityno} </td>
                               
                                <td> {hdata.salary} </td>   
                                <td style={{textAlign:"center"}}><button className='btn btn-primary' style={{marginRight : "15px"}}  
                                     onClick={(e) => {handleupdate(hdata.eid)}} >UPDATE</button> 
                                      </td>                          
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

export default Hr