import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';


const Employee = () => {
    const [empdata, setEmpdata] = useState([]);
   const [pagerefresd, setpagerefresd] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        showemployee();
    }, []);

    useEffect(() => {
        showemployee();
    },[pagerefresd])    


    // const handleupdate = async(eid) => {
    //     try{
    //     const res = await axios.get("http://localhost:8000/update",{params:{eid}})
    //     console.log("update click", eid);
    //     console.log(res.data);
    //     navigate('/updateemp')

    //     }
    //     catch(err) {
    //         console.log(err);
    //     }
    // }

    const handleupdate =  (eid) => {
        localStorage.setItem("tempempid",eid);
        navigate('/updateemp');
    }

    const showemployee = async () => {
        try {
            const res = await axios.get("http://localhost:8000/employee")
            console.log(res.data);
            setEmpdata(res.data);
            console.log("empdat", empdata);
        }
        catch (err) {
            console.log(err);
        }

    }


    const handledelete = async (eid) => {
        try {
            const res = await axios.delete("http://localhost:8000/empdelete",{params:{eid}})
            console.log(res.data);
            setpagerefresd(!pagerefresd);
        }
        catch (err) {
            console.log(err);
        }

    }



    return (

        <>
        <Navbar/>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Contactno</th>
                        <th>Homeaddress</th>
                        <th>Worklocation</th>
                        <th>Email</th>
                        <th>Actions</th>
                        <th><button className='btn btn-success' style={{width: "60px" } } onClick={() => {navigate("/addemp")}} >ADD</button> </th>
                    </tr>
                </thead>
                {empdata ? <>
                    {empdata.map((edata, index) => (
                        <tbody>
                            <tr>
                                <td>{edata.eid} </td>
                                <td> {edata.firstname}</td>
                                <td>{edata.lastname} </td>
                                <td>{edata.contactnumber} </td>
                                <td> {edata.homeaddress}</td>
                                <td> {edata.worklocation}</td>
                                <td> {edata.email}</td>
                                <td style={{display: "flex"}}> <button className='btn btn-primary' style={{marginRight : "10px"}}  
                                     onClick={(e) => {handleupdate(edata.eid)}} >UPDATE</button> 
                                     <button className='btn btn-danger' 
                                     onClick={(e) => {handledelete(edata.eid)}} >DELETE</button>
                                </td>

                            </tr>
                        </tbody>
                    )
                    )
                    }
                </>
                :
                    <>
                        <tr> <td>No Data</td></tr>
                    </>
                }
            </table>
        </>
    )
}

export default Employee

