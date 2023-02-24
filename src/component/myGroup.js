import React from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import { useState , useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";


export default function MyGroup() {

const current_ID = JSON.parse(localStorage.getItem('id'));

const [groups , setGroups] = useState([]);

const [text, setText] = useState("");
const [file, setFile] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("user_id", current_ID);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:80/react_project/back_end/groups.php",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


    useEffect(()=>{
        getGroups();
    } , [])

    function getGroups(){
        axios.get(`http://localhost:80/react_project/back_end/groups.php/`)
        .then(response => {
            console.log(response.data)
            setGroups(response.data);
        })
    }


    const  deleteGroup = (id) => {
      axios.delete(`http://localhost:80/react_project/back_end/groups.php/${id}`).then(function(response){
        getGroups();
      })
    }

    let i = 1;
  return (
    <>
         <Header/>
         <div className='form-wrapper mb-5' >
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Text</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>

    </div>
    <div className="container m-5">
    <Table striped className="m-auto" style={{textAlign:"center"}}>
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Admin</th>
            <th scope="col">Name of Group</th>
            <th scope="col">Image</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
                { groups.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return <tr key={index}>
                        
                        {console.log(element.id)}
                        <td  style={{paddingLeft : "10px" }}>{i++}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.name}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.group_name}</td>
                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src={require(`./image/${element.group_image}`)} /></td>
                        
                        <td>
                            <Link>
                                <Button variant="danger" onClick={() => {deleteGroup(element.group_id)}} >Delete</Button>
                            </Link>
                        </td>
                    </tr>
                })}
        </tbody>
      </Table>
      </div>

        <Footer/>

    </>
  )
}
