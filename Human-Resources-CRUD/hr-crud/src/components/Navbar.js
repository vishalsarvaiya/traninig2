import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const navigate = useNavigate();
    return (<>
        <div>
            <div style ={{height: '100px', backgroundColor:'DodgerBlue'}} className='d-flex justify-content-between h-25 py-3'>
                <div style={{  fontSize: '46PX', color: 'WHITE', marginLeft: '50PX'}}>HR CRUD </div>
                <div> <button style={{margin:"20px"}} className='btn  btn-light' onClick={() => { navigate('/') }}> Employee </button>
                    <button style={{margin:"20px"}} className='btn btn-light' onClick={() => { navigate('/hr') }}> HR </button>
                    <button style={{margin:"20px"}} className='btn btn-light' onClick={() => { navigate('/location') }}> Office </button></div>
            </div>

            {/*     
    <header  style = {{display: "flex", justifyContent: "",
     padding: "0px 0px", textAlign:"right" }}>
<div><span>visj</span></div>
        <div style ={{height: '100px', backgroundColor:'DodgerBlue',display: 'inline' ,float:'right',width:'100%' }}>
           
           
        </div>
    </header> */}
        </div>


    </>
    )
}

export default Navbar