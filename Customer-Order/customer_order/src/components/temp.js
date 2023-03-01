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
return (
    <>
        <button onClick={carthandle}>Back</button>
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
                <th>Quantity</th>
                <th>Amount</th>
            </tr>

            {cart.map((pdata, index) => (
                <TableRowPrintCart
                    pdata={pdata}
                    key={index}
                    index={index}
                    addDataToCart={addDataToCart}
                    removeFromCart={removeFromCart}
                    grandtotal={grandtotal}
                />
            ))}
            <tr> <td colSpan="7" align="end" style={{ paddingRight:"10px", fontWeight:"bold" }}>
                {"GrandTotal:"+total}
            </td></tr>
        </table>
        <button onClick={placeOrder}> PLACE ORDER</button>
    </>
);
};

const PlaceOrder =() => {
return(
    <table
    border="1"
    style={{ width: "70vw", marginTop: "5rem", marginLeft: "10rem" }}
>
    <tr>
        <th>Product Code</th>
        <th>Product Name</th>           
        <th>Price</th>          
        <th>Quantity</th>
        <th>Total</th>
    </tr>


    </table>
);
}
