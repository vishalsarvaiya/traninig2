import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { Link } from "react-router-dom";
//import Products from './Products';

function Navbar({ showDataBtn }) {
    const [logouts, setLogouts] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogin(true);
        }
    }, [])

    useEffect(() => {

    }, [logouts])


    const logout = () => {
        localStorage.removeItem("token");
        setLogouts(!logouts);
        setIsLogin(false);
        navigate("/");
        //showDataBtn();
        
    }
  
    const products = () => {
        showDataBtn();
    }

    return (
        <header style={{
            backgroundColor: "#4CAF50", display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "0px 59px"
        }} >
            <div style={{ margin: "15px", textAlign: "center", fontSize: "50px" }}><label style={{
                margin: "10px",
                color: "white"
            }}>V - Mart</label></div>

            <div id='buttons' >
                {
                    isLogin ? <> <input type='submit' style={{ margin: "10px", padding: "7px 9px" }}
                        value='Products' onClick={() => {  navigate("/products") }} />

                        <input type='submit' style={{ margin: "10px", padding: "7px 9px" }}
                            value='My Profile' onClick={() => { navigate("/myprofile") }} />


                        {/* <input type='submit' style={{ margin: "10px", padding: "7px 9px" }}
                            value='Order' onClick={() => { navigate("/orders") }} />


                        <input type='submit' style={{ margin: "10px", padding: "7px 9px" }}
                            value='Cart' onClick={() => { navigate("/orderlist") }} />


                        <input type='submit' style={{ margin: "10px", padding: "7px 9px" }}
                            value='Order Detail' onClick={() => { navigate("/orderdetail") }} /> */}


                        <input type='submit' style={{ margin: "10px", padding: "7px 46px" }}
                            value='Logout' onClick={logout} /></>

                        :
                        <><input type='button' onClick={() => {navigate("/")}} value='Login' />
                            {/* <Link to={'/register'}> */}
                                <input type='button' onClick={() => { navigate("/register") }} value='Register' />
                                {/* </Link> */}
                        </>
                }
            </div>
        </header>
    )
}

export default Navbar