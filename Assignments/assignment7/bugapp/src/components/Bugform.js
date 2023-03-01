import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Bugform = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignee, setAssignee] = useState("");
    const [data, setData] = useState([]);

    const handlesubmit = async (e) => {
        debugger
        e.preventDefault();
        const res = await axios.post("http://localhost:8000/bugdata",{
            title: title,
            description: description,
            assignee: assignee
        })
        .then((res) => {
            debugger
            console.log(res.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const viewdata = async () => {
        const res = await axios.get("http://localhost:8000/showdata");
        setData(res.data);
        // console.log(res.data.data.token);
    }
    useEffect(() => {
        viewdata();
    }, []);

    return (
        <div>
            <form onSubmit={handlesubmit}>
                <table>
                    <tr>
                        <td>Title</td>
                        <td><input type='text' name='title' value={title}  onChange={(e) => { setTitle(e.target.value) }} /> </td>
                    </tr>

                    <tr>
                        <td>Description</td>
                        <td><input type='text' name='description' value={description} onChange={(e) => { setDescription(e.target.value) }} /> </td>
                    </tr>

                    <tr>
                        <td>Assignee</td>
                        <td><input type='text' name='assignee' value={assignee} onChange={(e) => { setAssignee(e.target.value) }} /> </td>
                    </tr>

                    <tr>
                        <td>&nbsp;</td>
                        <td colSpan='2'>
                            <input type='submit' value='submit' />
                        </td>
                    </tr>
                </table>



                <table className='table table-primary text-center w-75 table-bordered border-primary '>
                    <tr style={{ textAlign: "center" }}>

                        <th>TITLE</th>
                        <th>DESCRIPTION</th>
                        <th>TIME</th>
                        <th>DATE</th>
                        <th>ASSIGNEE</th>
                        <th>LEFT DAYS</th>
                    </tr>
                    {data.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td> {data.title}</td>
                                <td> {data.description}</td>
                                <td> {data.time}</td>
                                <td> {data.date}</td>
                                <td> {data.assignee}</td>
                                {data.left_days <= 0 ? <td style={{"color":"red"}}> {data.left_days}</td> : <td> {data.left_days}</td>}

                            </tr>
                        )
                    })}




                </table>

            </form>

        </div>
    )
}

export default Bugform