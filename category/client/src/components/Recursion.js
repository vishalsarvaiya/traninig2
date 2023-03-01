import axios from 'axios';
import React, { useState, useEffect } from 'react'

function Recursion({ item }) {
    const [childData, setChildData] = useState([]);
    const [editedvalue, setEditedvalue] = useState("");

    const [btn, setBtn] = useState(false);

    // useEffect(() => {
    //     if (item) {
    //         getChildData();
    //     }
    // }, []);

    useEffect(() => {
        console.log(item);
        getChild();
    }, [])

    const getChild = async () => {
        try {
            const data = await axios.get("http://localhost:8000/getchild", { params: { id: item.recid } })
            setChildData(data.data);
        } catch (err) {
            console.log(err);
        }
    }

    const editBtnClick = () => {
        console.log("update  clicked")
        setBtn(!btn);
    }

    const deleteData = (id) => {
        console.log(id);
        try {
            axios.get("http://localhost:8000/deleteDatas", { params: { id } });
        } catch (error) {
            console.log(error);
        }
    };

    const editCategory = async (id) => {
        try {
            console.log(id);
            const res = await axios.get("http://localhost:8000/editDatas", { params: { id, editedvalue } })
            console.log(res);
            // console.log(edit);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ "marginLeft": "50px" , display:"flex"}}>
        <span>
            <p  onClick={editBtnClick}>  &#128507; {item.category}</p>
            </span> 
            <span>
            {btn ? <>
                <input
                    type="text"
                    value={editedvalue}
                    placeholder="Edit data"
                    onChange={(e) => {
                        setEditedvalue(e.target.value);
                    }}

                />
                <button onClick={() => {
                    editCategory(item.recid)
                }}>Update</button>

            </> : <>

            </>}
            <button onClick={() => deleteData(item.recid)} style={{marginTop:"18px", marginLeft:"10px" }}>delete</button>
             {childData.map((item1) => (
                <Recursion item={item1} />
            ))}
            </span>
        </div>
    )
}

export default Recursion    