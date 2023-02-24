import { useEffect, useState } from "react";
import axios from "axios";
import Header from './layout/header';
import Footer from './layout/footer';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


import { Link, useNavigate } from "react-router-dom";


function ListUser(){

    const [users,setUsers] = useState([]);
    const [pendingFriends,setpendingFriends] = useState([]);
    const [acceptrdFriends,setAcceptedFriends] = useState([]);
    const id = JSON.parse(localStorage.getItem('id'));

    useEffect(()=>{
        getUsers();
        getFriendsPending();
        getFriendsAccepted();

    },[]);

    // لعرض جميع المستخدمين في الموقع
    const getUsers = () => {

        axios.get("http://localhost:80/react_project/back_end/user.php/users")
        .then((respone)=>{
            setUsers(respone.data)
            console.log(respone.data);
        })
    }


    //  pending عرض جميع طلبات الصداقة في حالة 
    const getFriendsPending = () => {

        axios.get(`http://localhost:80/react_project/back_end/acceptFriend.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            setpendingFriends(respone.data)
        })
    }
    //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم

    const getFriendsAccepted = () => {

        axios.get(`http://localhost:80/react_project/back_end/friends.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            setAcceptedFriends(respone.data)
        })
    }


    //  pending وحالته بتكون friends  اضافة صديق جديد في جدول ال 
    const AddFriends = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.post(`http://localhost:80/react_project/back_end/friends.php/save`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getUsers();
            getFriendsPending();
        })


        
    }

    // status طلب الصداقة وتغيير ال 
    const AcceptFriend = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost:80/react_project/back_end/friends.php/edit`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
        })


        
    }


    // عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم

    
 
    return (
        <>
              <Header/>

        <h1>users</h1>
        <div className="container m-5">
        <Table striped className="m-auto" style={{textAlign:"center"}}>
            <thead>
                <tr bg="primary">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>add freind</th>
                </tr>
            </thead>
            <tbody>

                {users.map((ele,index)=>{
            return(
                <tr key={index}>
                    <td>{ele.id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td>
                    <td>
                        <Link>
                            <Button variant="primary" onClick={()=>AddFriends(ele.id)}>Add</Button>
                        </Link>
                    </td>
                
                </tr>
                )})}
            
            </tbody>
        </Table>
      </div>
        <h1>pending friends</h1>
        <div className="container m-5">
        <Table striped className="m-auto" style={{textAlign:"center"}}>
            <thead>
                <tr bg="primary">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>accept freind</th>
                </tr>
            </thead>
            <tbody>
            
                {pendingFriends.map((ele,index)=>{
            return(
                <tr key={index}>
                    <td>{ele.friend_id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td>
                    <td>
                        <Link>
                            <Button variant="primary" onClick={()=>AcceptFriend(ele.friend_id)}>accept</Button>
                        </Link>
                    </td>
                
                </tr>
                )})}
            
            </tbody>
        </Table>
      </div>
        <h1>accepted friends</h1>
        <div className="container m-5">
        <Table striped className="m-auto" style={{textAlign:"center"}}>
            <thead>
                <tr bg="primary">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                </tr>
            </thead>
            <tbody>

                {acceptrdFriends.map((ele,index)=>{
            return(

                <tr key={index}>
                    <td>{ele.friend_id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td>
                 
                
                </tr>
                )})}
            
            </tbody>
        </Table>
      </div>
      <Footer/>

        </>

    )
}

export default ListUser