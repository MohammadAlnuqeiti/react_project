import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState , useEffect , useParams } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEdit } from "react-icons/fa";


import Header from './layout/header';
import Footer from './layout/footer';


export default function HomeUser() {

  // const current_Fname = JSON.parse(localStorage.getItem('first_name'));
  // const current_Lname = JSON.parse(localStorage.getItem('last_name'));
  const current_ID = JSON.parse(localStorage.getItem('id'));
  const current_Email = localStorage.getItem('email');

  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);


  const [file, setFile] = useState(null);


    useEffect(()=>{
        getPosts();
        getComments();
    } , [])




    // Posts



    function getPosts(){
        axios.get(`http://localhost:80/react_project/back_end/posts.php/`)
        .then(response => {
            setPosts(response.data);
        })
    }

    const handleImagePost = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();

      formData.append("post", inputs);
      formData.append("user_id", current_ID);
      formData.append("file", file);
  
      try {
        const response = await axios.post(
          "http://localhost:80/react_project/back_end/posts.php", formData
        );
        console.log(response.data);
        window.location.assign('/home');
      } catch (error) {
        console.error(error);
      }
    };

    const handlePost = (e) => {
        const value = e.target.value;
        setInputs(value)
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const post_id = e.target.id;
        const user_id = e.target.name;
        setInputs({'comment_content': value , 'post_id': post_id , 'user_id' : user_id})
    }








    const editPost = (id) => {
      document.getElementById(`post${id}`).style.display = 'none';
      document.getElementById(`editPostForm${id}`).style.display = 'block';
      document.getElementById(`editPostBTN${id}`).style.display = 'none';
    }

    const handleEditPost = (id) => {
      const post_id = id;
      const value = document.getElementById(`editPostInput${id}`).value;
      setInputs({'post_content': value , 'post_id' : post_id})
    }

    const handleEditPostSubmit  = async (e) => {
      e.preventDefault();
  
      const formEditData = new FormData();

      formEditData.append("post_content", inputs['post_content']);
      formEditData.append("post_id", inputs['post_id']);
      formEditData.append("file", file);

      console.log(formEditData);
  
      try {
        const response = await axios.post(
          "http://localhost:80/react_project/back_end/postEdit.php", formEditData
        );
        console.log(response.data);
        window.location.assign('/home');
      } catch (error) {
        console.error(error);
      }
    };









    const deletePost = (id) => {
      axios.delete(`http://localhost:80/react_project/back_end/posts.php/${id}`).then(function(response){
        window.location.assign('/home');
      })
    }






    // Comments




    function getComments(){
      axios.get(`http://localhost:80/react_project/back_end/comments.php/`)
      .then(response => {
          setComments(response.data);
      })
  }

    const handleCreateComment = (e) => {
        e.preventDefault();
        axios.post('http://localhost:80/react_project/back_end/comments.php/' , inputs).then((res)=> {
          console.log(res);
          window.location.assign('/home')
        }
        )
    }

    const deleteComment = (id) => {
      // console.log(id);
      axios.delete(`http://localhost:80/react_project/back_end/comments.php/${id}`).then(function(response){
        console.log(response);
        getComments();
      })
    }

    const editComment = (id) => {
      document.getElementById(`comment${id}`).style.display = 'none';
      document.getElementById(`editCommentForm${id}`).style.display = 'block';
      document.getElementById(`editCommentBTN${id}`).style.display = 'none';
    }

    const handleEditComment = (id) => {
      const comment_id = id;
      const value = document.getElementById(`editCommentInput${id}`).value;
      setInputs({'comment_content': value , 'comment_id' : comment_id})
    }

    const handleEditCommentSubmit = (e) => {
      e.preventDefault();
      axios.put('http://localhost:80/react_project/back_end/comments.php/' , inputs).then(
        window.location.assign('/home')
      )
    }

    const foucsOnComment = (id) => {
      document.getElementById(id).focus();
    }

    const canclePostEdit = (id) => {
      document.getElementById(`post${id}`).style.display = 'block';
      document.getElementById(`editPostForm${id}`).style.display = 'none';
      document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
      document.getElementById(`imgPost${id}`).style.display = 'block';
    }

    const cancleCommentEdit = (id) => {
      document.getElementById(`comment${id}`).style.display = 'block';
      document.getElementById(`editCommentForm${id}`).style.display = 'none';
      document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';

    }


    // Return

  return (
                <>
                    <Header/>
                    <div>
      {/* <a href="/group">create new group</a> */}

                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                    <form className="form-outline w-100" onSubmit={handleImagePost}>
                      <textarea placeholder='Write something . . .' className="form-control"  id={current_ID} rows={4} style={{background: '#fff'}} onChange={handlePost}/>
                      <input type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}/>
                      <button type="submit" className="btn btn-primary btn-sm">Share</button>
                    </form>
                  </div>
                { posts.map((post,index) => {
                    return (
      <section style={{backgroundColor: '#eee'}} key={index}>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center" style={{justifyContent : 'space-between'}}>
                    <div >
                      <div style={{display : 'flex'}}>
                          <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={60} height={60} />
                        <div>
                          <h6 className="fw-bold text-primary mb-1">{post.name}</h6>
                          <p className="text-muted small mb-0">{post.created_at}</p>
                        </div>
                      </div>
                    </div>
                    {(post.user_id === current_ID) ?
                    <div>
                      <button onClick={() => {deletePost(post.post_id)}}>Delete Your Post</button>
                      <button id={`editPostBTN${post.post_id}`} onClick={() => {editPost(post.post_id)}}><FaEdit /></button>
                    </div>
                    : null }
                  </div>
                  {(post.post_image !== 'a') ? 






                  <div>
                      <p id={`post${post.post_id}`} className="mt-3 mb-4 pb-2">{post.content}</p>
                      

                      <form id={`editPostForm${post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>
                          <textarea 
                          style={{width: '50vw'}} 
                          type="text" 
                          defaultValue={post.content} 
                          id={`editPostInput${post.post_id}`} onChange={() => handleEditPost(post.post_id)}/>

                          <br />

                          <input 
                          type="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}/>

                          <button type='submit'>Update</button>
                          <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(post.post_id)}} type='button'>Cancle</button>
                      </form>

                      <img id={`imgPost${post.post_id}`} width={'700vw'} height={'500vh'} src={require(`./image/${post.post_image}`)} alt='' />
                  </div>







                  : 
                  
                  <div>
                  
                  <p id={`post${post.post_id}`} className="mt-3 mb-4 pb-2">
                  {post.content}
                </p> 
                
                <form id={`editPostForm${post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>

                    <textarea 
                      style={{width: '50vw'}} 
                      type="text" 
                      defaultValue={post.content} 
                      id={`editPostInput${post.post_id}`} 
                      onChange={() => handleEditPost(post.post_id)}/>

                    <input 
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}/>

                    <br />

                    <button type='submit'>Update</button>
                    <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(post.post_id)}}  type='button'>Cancle</button>

                </form>
                

                </div>
                }
                  <div className="small d-flex justify-content-start">
                    <a href="#!" className="d-flex align-items-center me-3">
                      <i className="far fa-thumbs-up me-2" />
                      <p className="mb-0">Like</p>
                    </a>
                    <a onClick={()=>foucsOnComment(post.post_id)} href="#!" className="d-flex align-items-center me-3">
                      <i className="far fa-comment-dots me-2" />
                      <p className="mb-0">Comment</p>
                    </a>
                  </div>
                </div>
                <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="w-100">
                  { comments.map((comment,index) => {
                    if (comment.post_id === post.post_id){
                    return (
                    <div key={index}>
                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                          <div>
                            <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                            <span>{comment.name}</span>
                          </div>
                          {(comment.user_id === current_ID) ? 
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                              <button id={`editCommentBTN${comment.comment_id}`} onClick={() => {editComment(comment.comment_id)}}><FaEdit /></button>
                          </div> : (post.user_id === current_ID) ?
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                          </div>
                          : null }
                        </div>
                        <br />
                        <div className="form-outline w-100">





                            <p id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                            <form id={`editCommentForm${comment.comment_id}`} action="" style={{display : 'none'}} onSubmit={handleEditCommentSubmit}>
                              <input type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)}/>
                              <button type='submit'>Update</button>
                              <button style={{background : 'red' , color : 'white'}} onClick={()=>{cancleCommentEdit(comment.comment_id)}}  type='button'>Cancle</button>
                            </form>






                            <p>{comment.comment_created_at}</p>
                        </div>
                        <hr />
                    </div>
                    )}})}
                  </div>
                  <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                    <form className="form-outline w-100" onSubmit={handleCreateComment}>
                      <textarea className="form-control" id={post.post_id} name={current_ID} rows={4} style={{background: '#fff'}} onChange={handleChange}/>
                      <button type="submit" className="btn btn-primary btn-sm">Post comment</button>
                    </form>
                  </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                )})}
    </div>
                    <Footer/>
                </>
  )
}
