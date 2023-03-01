import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Homepage = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token){
            setData([]);
        }
    }, [])
    useEffect(() => {
        
    }, [data])
    
    const products = async () => {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:8000/products", { params: { token } })
            .then((res) => {
                console.log(res);
                setData(res.data);
            })
            .catch((err) => {
                setData([]);
                console.log(err);
            })
    }

    return (
        <>
        
            <Navbar showDataBtn={products}/>
            {data.map((data, index) => {
                return (
                    <table className="table">
                        <tr><td> Firstname: {data.firstname} </td></tr>
                            
                          <tr><td> Lastname:  {data.lastname} </td></tr>
                          <tr><td> Email: {data.email} </td></tr>
                          <tr><td> Date Added: {data.dateadded}</td></tr>
                    

                    </table>
                )
            })}
        </>
    )
}

export default Homepage

