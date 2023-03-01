import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Recursion from './Recursion';
//import { useNavigate, link } from 'react-router-dom';
//import Navbar from './Navbar';


const Category_form = () => {
  const [category, setCategory] = useState([]);
  const [mycategory, setMycategory] = useState(null);
  const [incategory, setIncategory] = useState("");
  const[categorytype,setCategorytype] = useState('');
  const[parentid, setParentid] = useState([]);

  useEffect(() => {
    categoryadd();
  }, [])
 
  const categoryadd = async () => {
    try {
      const res = await axios.get("http://localhost:8000")
      console.log("category data", res.data);
      setCategory(res.data);
      console.log("category",res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handlesubmit = async (e)=>{
    // e.preventDefault();
    try{
    console.log("mycategory : ",mycategory)
      const res =await axios.post("http://localhost:8000/category",{
        incategory : incategory,
        id : mycategory
      }
      )
    }
    catch(err){
        console.log(err);
    }
  }

  const show_category = async() => {
      try{
        const res = await axios.get("http://localhost:8000/getparent")
        console.log(res.data);
        setParentid(res.data);
      }
      catch(err){
        console.log(err);
      }
  }
  
  return (
    <>
      <form >
        <table>
          <tr>
            <td>Category Type</td>
            <td>
              <input type="radio" name='category' value='Parent' onChange={() => {setCategorytype('Parent') }} />Parent
              <input type="radio" name='category' value='Child' onChange={() => {setCategorytype('Child')}}/>Child
            </td>
          </tr>

          <tr>
            <td>Category Name</td>
            <td> <input type='text' name='category_name' value={incategory}
              onChange={(e) => { setIncategory(e.target.value) }} /> </td>
          </tr>

          {categorytype == 'Child' &&
          <tr>
            <td>Category</td>
            <td><select name="category" value={mycategory}
              onChange={(e) => {
                setMycategory(e.target.value);
              }} >
              {category.map((item, index) => (
                <option
                  value={item.recid} >
                  {item.category}

                  
                </option>
              ))}
             </select></td>
          </tr> 
         
          }
  <tr>
            <td><input type="submit" value='ADD' onClick={handlesubmit}/> </td>
          </tr>
          <tr>
            <td>
              <input type="button" onClick={show_category} value="show Category"/>
            </td>
          </tr>
        </table>


        {parentid.map((item)=>(
          <Recursion item={item}  />
        )) }
        


      </form>
    </>
  )
}

export default Category_form

