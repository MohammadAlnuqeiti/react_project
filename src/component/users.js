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
    const [requestFriends,setRequestFriends] = useState([]);  
    const [pendingRequest,setpendingRequest] = useState([]);
    const [friends,setfriends] = useState([]);
    const [requestFriend,setrequestFriend] = useState([]);
    const id = JSON.parse(localStorage.getItem('id'));

    useEffect(()=>{
        getUsers();
        getFriendsPending();
        getFriendsAccepted();
        getFriendsRequest();

    },[]);

    // لعرض جميع المستخدمين في الموقع
    const getUsers = () => {

        axios.get("http://localhost:80/react_project/back_end/user.php/users")
        .then((respone)=>{
            setUsers(respone.data)
            console.log(respone.data);
        })
    }


    // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
    const getFriendsPending = () => {

        axios.get(`http://localhost:80/react_project/back_end/acceptFriend.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            let pendingRequest = respone.data.map((ele)=>{
                return ele.friend_id
            })
            setpendingRequest(pendingRequest);
            console.log(pendingRequest);
            setpendingFriends(respone.data)
        })
    }
    //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم

    
    const getFriendsAccepted = () => {

        axios.get(`http://localhost:80/react_project/back_end/friends.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            let friends = respone.data.map((ele)=>{
                return ele.friend_id
            })
            console.log(friends);
            setfriends(friends);
            setAcceptedFriends(respone.data)
        })
    }
    // عرض طلبات الصداقة الخاصة بالمستخدم واللي لسا ما وافق عليهم

    const getFriendsRequest = () => {

        axios.get(`http://localhost:80/react_project/back_end/friendRequests.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            let requestFriend = respone.data.map((ele)=>{
                return ele.user_id
            })
            console.log(requestFriend);
            setrequestFriend(requestFriend);
            setRequestFriends(respone.data)
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
            getFriendsRequest();
        })


        
    }

    // status الموافقة على طلب الصداقة وتغيير ال 
    const AcceptFriend = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost:80/react_project/back_end/friends.php/edit`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
            getFriendsRequest();
        })


        
    }
    
    // الغاء ارسال طلب الصداقة
    const removeRequest = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost:80/react_project/back_end/removeRequest.php/edit`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
        })


        
    }

    // حذف الصداقة
    const removeFriend = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost:80/react_project/back_end/removeFriends.php`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
            
        })


        
    }
    
 
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

                {users.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.id === id) {
                        return false; // skip
                    }
                    return true;
                    }).map((ele,index)=>{



            return(
                <tr key={index}>
                    <td>{ele.id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td> 
                

                    {(() => {
                            if (pendingRequest.includes(ele.id) || friends.includes(ele.id) || requestFriend.includes(ele.id)){
                                if(pendingRequest.includes(ele.id)){
                                    return (

                                        <Link>
                                            <Button variant="primary" onClick={()=>removeRequest(ele.id)}>remove request</Button>
                                        </Link>

                                    )

                                }
                                if(friends.includes(ele.id)){
                                    return (
                                        <td>
                                                <Link>
                                                    <Button variant="danger" onClick={()=>removeFriend(ele.id)}>remove friends</Button>
                                                </Link>
                                        </td>
                                    )

                                }
                                if(requestFriend.includes(ele.id)){
                                    return (
                                        <td>
                                            <Link>
                                                <Button variant="primary" onClick={()=>AcceptFriend(ele.id)}>accept</Button>
                                            </Link>
                                    </td>
                                    )

                                }
                             
                            }else{
                                return ( 
                                <td>
                                    <Link>
                                        <Button variant="primary" onClick={()=>AddFriends(ele.id)}>Add</Button>
                                    </Link>
                                </td>
                                )
                            }
              
            })()}
                
                </tr>
                )})}
    
            
            </tbody>
        </Table>
      </div>
        <h1>pending friends</h1><h2>number : {pendingFriends.length}</h2>
        <div className="container m-5">
        <Table striped className="m-auto" style={{textAlign:"center"}}>
            <thead>
                <tr bg="primary">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>remove Request</th>
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
                            <Button variant="primary" onClick={()=>removeRequest(ele.friend_id)}>remove request</Button>
                        </Link>
                    </td>
                
                </tr>
                )})}
            
            </tbody>
        </Table>
      </div>
        <h1>accepted friends</h1>
        <h2>number : {acceptrdFriends.length}</h2>
        <div className="container m-5">
        <Table striped className="m-auto" style={{textAlign:"center"}}>
            <thead>
                <tr bg="primary">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>remove friends</th>
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
                    <td>
                        <Link>
                            <Button variant="danger" onClick={()=>removeFriend(ele.friend_id)}>remove friends</Button>
                        </Link>
                    </td>
                 
                
                </tr>
                )})}
            
            </tbody>
        </Table>
      </div>
        <h1>Request friends</h1>
        <h2>number : {requestFriends.length}</h2>
        <div className="container m-5">
        <Table striped className="m-auto" style={{textAlign:"center"}}>
            <thead>
                <tr bg="primary">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>accept request</th>
                </tr>
            </thead>
            <tbody>

                {requestFriends.map((ele,index)=>{
            return(

                <tr key={index}>
                    <td>{ele.user_id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.phone}</td>
                    <td>
                        <Link>
                            <Button variant="primary" onClick={()=>AcceptFriend(ele.user_id)}>accept</Button>
                        </Link>
                    </td>
                 
                
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