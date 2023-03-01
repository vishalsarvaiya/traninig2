import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, link, json } from "react-router-dom";
import Navbar from "./Navbar";

const TableRowPrint = ({ pdata, index, addDataToCart, removeFromCart }) => {
    const [addbutton, setAddbutton] = useState(true);
    // const[placeOrder, setPlaceorder] = useState(false);
    const addCart = () => {
        setAddbutton(false);
        addDataToCart(pdata);
    };
    const removeCart = () => {
        setAddbutton(true);
        removeFromCart(pdata.productcode);
    };
    return (
        <tr>
            <td>{pdata.productcode} </td>
            <td> {pdata.productname} </td>
            <td>{pdata.brand} </td>
            <td>{pdata.productprice}</td>
            <td>{pdata.productstatus}</td>
            {/* <input type='button' value="Cart" onClick={() => carthandle()} /> */}
            {addbutton ? (
                <td>
                    <input
                        type="button"
                        onClick={() => addCart(index)}
                        value="Add"
                        style={{ width: "90px" }}
                    />
                </td>
            ) : (
                <td>
                    <input
                        type="button"
                        onClick={() => removeCart()}
                        value="Remove"
                        style={{ width: "90px" }}
                    />
                </td>
            )}
        </tr>
    );
};


const TableRowPrintCart = ({ pdata, grandtotal, changeQty,changeItem }) => {  //({ pdata, index, addDataToCart, removeFromCart })

    const [value, setValue] = useState(1);
    const [itemamount, setItemamount] = useState(pdata.productprice)

    return (
        <>

            <tr>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.productcode} </td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}> {pdata.productname} </td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.brand} </td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.productprice}</td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.productstatus}</td>
                {/* <input type='button' value="Cart" onClick={() => carthandle()} /> */}

                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>
                    <button onClick={() => {
                        setValue(value - 1)
                        setItemamount(itemamount - (pdata.productprice))
                        grandtotal(-1 * pdata.productprice)
                        changeItem(pdata.productcode,value-1)
                        if (value <= 1) {
                            setValue(1);
                            setItemamount(pdata.productprice)
                            grandtotal(pdata.productprice - pdata.productprice)
                        }
                    }}>-</button>

                    {value}

                    <button onClick={() => {
                        changeItem(pdata.productcode,value+1)
                        setValue(value + 1)
                        setItemamount(itemamount + (pdata.productprice))
                        grandtotal(pdata.productprice)
                    }} > + </button>
                </td>

                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{itemamount}</td>

            </tr>


        </>
    );
};


const TableRowPrintPlaced = ({ pdata, grandtotal }) => {  //({ pdata, index, addDataToCart, removeFromCart })

    const [value, setValue] = useState(1);
    const [itemamount, setItemamount] = useState(pdata.productprice)

    return (
        <>
            <tr>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.productcode} </td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}> {pdata.productname} </td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.productprice}</td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.qty}</td>
                <td style={{border:"1px solid black",borderCollapse: "collapse"}}>{pdata.Amount}</td>
            </tr>
        </>
    );
};

const Cart = ({ cart, carthandle}) => {
    const addDataToCart = () => { };
    const removeFromCart = () => { };
    const [total, setTotal] = useState(0);
    const [place, setPlace] = useState(false);
    const [allItemList,setAllItemList] = useState([]);
    useEffect(()=>{
        if(cart){
            const ans = cart.map((item)=>{
                item.qty = 1;
                item.Amount = item.productprice;
                return item;
            })
            setAllItemList(ans);
        }
        
    },[])
    const placeOrder = () => { 
        if (!place) {
            setPlace(true);
        }
        console.log("placed")
        console.log(place)
    }
    useEffect(() => {
        let sum = 0;
        cart.map((data) => {
            sum = sum + data.productprice;
        })
        setTotal(sum)
    }, [])


    const grandtotal = (Amount) => {
        setTotal(total + Amount);
    }
    const changeItem = (productcode,value) =>{
        setAllItemList(allItemList.map((result)=>{
            if(productcode==result.productcode){
                result.qty = value;
                result.Amount = result.productprice*value;
            }
            return result;
        }))
        console.log(allItemList)
    }
    const d = new Date();
let text = d.toLocaleDateString();
    return (
        <>

            {place ? (
                <div>
                    <button onClick={carthandle}>Back</button>
                    <div style={{marginLeft:"10rem", marginTop:"3rem"}}>
                    <strong>ORDER ID:  {Math.floor(Math.random() * 1000000000)} </strong><br/>
                    <strong>DATE:  {text} </strong>
                    </div>
                    <table
                        border="1"
                        style={{ width: "70vw", marginTop: "5rem", marginLeft: "10rem" }}
                    >
                    <tr>
                    <strong>ORDER ID:{Math.floor(Math.random() * 1000000000)} </strong><br/>
                    <strong>DATE:{text} </strong>
                    </tr>
                        <tr>
                            <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Product Code</th>
                            <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Product Name</th>
                            <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Price</th>
                            <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Quantity</th>
                            <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Total</th>
                        </tr>

                        {allItemList.map((pdata, index) => (
                            <TableRowPrintPlaced
                                pdata={pdata}
                                grandtotal={grandtotal}

                            />
                            
                        ))}
                        <tr> 
                        <td style={{ paddingRight: "10px", fontWeight: "bold"}}>
                        {"GrandTotal:" }
                        </td>
                        
                        <td colSpan="7" align="end" style={{ paddingRight: "71px", fontWeight: "bold" }}>
                                { total}
                            </td></tr>
                    </table>

                </div>

            )
                :
                (
                    <>

                        <button onClick={carthandle}>Back</button>
                        <table
                            border="1px solid black"
                            style={{ width: "70vw", marginTop: "5rem", marginLeft: "10rem", border:"1px solid black",borderCollapse: "collapse" }}
                        >
                            <tr >
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Product Code</th>
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Product Name</th>
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Brand</th>
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Price</th>
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Status</th>
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Quantity</th>
                                <th style={{border:"1px solid black",borderCollapse: "collapse"}}>Amount</th>
                            </tr>

                            {allItemList.map((pdata, index) => (
                                <TableRowPrintCart
                                    pdata={pdata}
                                    key={index}
                                    index={index}
                                    addDataToCart={addDataToCart}
                                    removeFromCart={removeFromCart}
                                    grandtotal={grandtotal}
                                    changeItem={changeItem}
                                />
                            ))}
                            <tr> 
                        <td style={{ paddingRight: "10px", fontWeight: "bold"}}>
                        {"GrandTotal:" }
                        </td>
                        
                        <td colSpan="7" align="end" style={{ paddingRight: "87px", fontWeight: "bold" }}>
                                { total}
                            </td></tr>
                        </table>
                        <button onClick={placeOrder}> PLACE ORDER</button>

                    </>

                )}
        </>);
};

const Products = () => {
    const [pdata, setPdata] = useState([]);
    const [pdata1, setPdata1] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartopen, setCartopen] = useState(false);
    const [searchvalue, setSeachvalue] = useState("")

    const [placedorder, setPlacedorder] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setPdata([]);
        }
    }, []);
    useEffect(() => { }, [pdata]);

    useEffect(() => {
        products();
    }, []);

    const products = async () => {
        const token = localStorage.getItem("token");
        const res = await axios
            .get("http://localhost:8000/products", { params: { token } })
            .then((res) => {
                setPdata(res.data);
                setPdata1(res.data);

            })
            .catch((err) => {
                setPdata([]);
                console.log(err);
            });
    };

    const addDataToCart = (tempData) => {
        const cart1 = cart;
        cart1.push(tempData);
        setCart(cart1);
        // setPlacedorder(cart1)
        console.log("cart : ", cart);
    };
    const removeFromCart = (tempData) => {
        const ans = cart.filter((tData) => {
            return tempData != tData.productcode;
        });
        setCart(ans);
        setPlacedorder(ans);
        console.log("cart : ", ans);
    };

    const carthandle = () => {
        if (cartopen) {
            setCart([]);
            setCartopen(false);
        } else {
            setCartopen(true);
        }
    };

    const handlesearch = () => {

        const res = pdata.filter((val) => {
            return Object.values(val).join('').toLowerCase().includes(searchvalue)
        })
        console.log(res)
        setPdata1(res);



    }

    return (
        <>
            <Navbar showDataBtn={products} />
            {cartopen ? (
                <div>
                    <Cart cart={cart} carthandle={carthandle} placedorder={placedorder} />
                </div>
            ) : (
                <div>

                    <div style={{ "float": "right" }}>
                        <input type="search" value={searchvalue} onChange={(e) => { setSeachvalue(e.target.value) }} />
                        <button onClick={handlesearch} style={{ "color": "white", "backgroundColor": "#4CAF50" }} >Search</button>
                        <button onClick={carthandle} style={{ "margin": "20px", "width": "80px", "color": "white", "backgroundColor": "darkblue" }}>Cart</button>
                    </div>
                    <table
                        border="1"
                        style={{ width: "70vw", marginTop: "5rem", marginLeft: "10rem" }}
                    >
                        <tr>
                            <th>Product Code</th>
                            <th>Product Name</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>

                        {pdata1.map((pdata, index) => (
                            <TableRowPrint
                                pdata={pdata}
                                key={index}
                                index={index}
                                addDataToCart={addDataToCart}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </table>
                </div>
            )}
        </>
    );
};

export default Products;
