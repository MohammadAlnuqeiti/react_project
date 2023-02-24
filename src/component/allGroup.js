import React from 'react';
import { useState , useEffect } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";



export default function AllGroup() {

  const current_ID = JSON.parse(localStorage.getItem('id'));

  const [groups , setGroups] = useState([]);
  const [pendingMembers,setPendingMembers] = useState([]);


  useEffect(()=>{
    getGroups();
    getPendingMempers();
    
} , [])

function getGroups(){
  axios.get(`http://localhost:80/react_project/back_end/groups.php/`)
  .then(response => {
      console.log(response.data)
      setGroups(response.data);
      
  })
}



// لعرض كل الجروبات في الموقع
const AddToGroup = (groupId) => {
  let inputs = {user_id:current_ID , group_id:groupId};
  axios.post(`http://localhost:80/react_project/back_end/membersGroup.php/save`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getGroups();
      getPendingMempers();
      
            // getFriendsRequest();
  })
}
     //للجروبات pending لعرض كل طلبات المستخدم اللي حالتهم 
    const getPendingMempers = () => {

        axios.get(`http://localhost:80/react_project/back_end/getPendingMember.php/${current_ID}`)
        .then((respone)=>{
            console.log(respone.data);
            let pendingMembers = respone.data.map((ele)=>{
                return ele.group_id
            })
            console.log(pendingMembers);
            setPendingMembers(pendingMembers);
            // setPendingMempers(respone.data)
        })
    }

  // لحذب طلب الاضافة 
    const removeRequest = (GroupId) => {
      let inputs = {user_id:current_ID , group_id:GroupId};
      axios.put(`http://localhost:80/react_project/back_end/getPendingMember.php/edit`,inputs)
      .then((respone)=>{
          console.log(respone.data);
          getGroups();
          getPendingMempers();
      })

    }


    let i = 1;
  return (
    <>
      <Header/>

        <div className="container m-5">
    <Table striped className="m-auto" style={{textAlign:"center"}}>
    <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Admin</th>
            <th scope="col">Name of Group</th>
            <th scope="col">Image</th>
            <th scope="col">Add to group</th>
          </tr>
        </thead>
        <tbody>
                { groups.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return false; // skip
                    }
                    return true;
                    }).map((element,index) => {
                    return <tr key={index}>
                        
                        {console.log(element.id)}
                        <td  style={{paddingLeft : "10px" }}>{i++}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.name}</td>
                        <td  style={{paddingLeft : "10px" }}>{element.group_name}</td>
                        <td style={{paddingLeft : "10px" }}><img width={240} height={140} alt="" src={require(`./image/${element.group_image}`)} /></td>
                        {(() => {
                            if (pendingMembers.includes(element.group_id)){
                              return ( 
                                    <td>
                                    <Link>
                                        <Button variant="primary" onClick={()=>removeRequest(element.group_id)}>remove request</Button>
                                    </Link>
                                    </td>
                              )
                             
                            }else{
                                return ( 
                                  <td>
                    
                                  <Link>
                                      <Button variant="primary" onClick={()=>AddToGroup(element.group_id)}>Add</Button>
                                  </Link>
                              
                              </td>
                                )
                            }
              
            })()}
                       
                    </tr>
                })}
        </tbody>
      </Table>
      </div>


        

        <Footer/>
        </>
  )
}
