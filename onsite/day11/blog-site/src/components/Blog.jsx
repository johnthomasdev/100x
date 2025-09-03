import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Blog(){
    const [selectblog,setviewBlog] = useState(0);

    return selectblog === 0 ? <ViewAllBlog onView = {setviewBlog}></ViewAllBlog> : <ViewBlog id = {selectblog} exit = {() => setviewBlog(0)} />;

}

function ViewAllBlog(props){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [status, setStatus] = useState("");
    const [blog,setBlog] = useState([]);
    const navigate = useNavigate();

    function getcookie(){
        let tok = document.cookie.split('auth=');
        tok = tok[tok.length-1];
        return tok;
    }

    useEffect(() =>{
        axios.post('http://localhost:4000/view-mine',{
        },{
            headers: {
                'Content-Type':"application/json",
                "token":getcookie()
            }
        }).then(res => { //Get back status and id to put as div
            if (res.data.status  == "blogs yay"){
                setBlog(res.data.blogs);
            }
        })
    },[])

    function addBlog(){
         axios.post('http://localhost:4000/create-blog',{
            "title": title,
            "content": content
        },{
            headers: {
                'Content-Type':"application/json",
                "token":getcookie()
            }
        }).then(res => { //Get back status and id to put as div
            setStatus(res.data.status);
            setBlog([...blog,{id:res.data.id,title:title,content:content}]);
            setTitle('');
            setContent('');
        })
    }

    function deleteBlog(id){
        axios.post('http://localhost:4000/delete-blog',{
            "id":id
        },{
             headers: {
                'Content-Type':"application/json",
                "token":getcookie()
            }
        }).then(res => {
            if (res.data.status === "deleted") {
                setBlog(blog.filter((item) => item.id != id))
            }
        })
    }


    function logout(){
        document.cookie = "auth=; max-age=0; path=/;";
        setTimeout(() => {
                navigate('/');
        },1000)
    }

    return(
        <div id = 'blog-page'>
            <h1>YOUR BLOGS</h1>
            <input type = "text" placeholder = "Enter your Title" value = {title} onChange = {(e) => setTitle(e.target.value)}></input>
            <input type = "text" placeholder = "Enter your Content" value = {content} onChange = {(e) => setContent(e.target.value)}></input>
            <button onClick = {addBlog}>Add Blog</button>
            <div id = 'blog-list'> {blog.map((item => <div style = {{marginTop:10, marginBottom:10}} key = {item.id}> {item.title} <div>{item.content} <button onClick = {() => deleteBlog(item.id)}>Delete</button> <button onClick={() => props.onView(item.id)}> View </button> </div> </div>))} </div>
            <button onClick = {logout}>Logout</button>
        </div>
    )
}

function ViewBlog(props){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    useEffect(() => {
        let tok = document.cookie.split('auth=');
        tok = tok[tok.length-1];
        axios.get(`http://localhost:4000/view-one/${props.id}?token=${tok}`,{

        }).then(res => {
            setTitle(res.data.title);
            setContent(res.data.content);
        })
    },[])

    return(
        <div>
            <div>{title}</div>
            <div>{content}</div>
            <button onClick = {props.exit}>Leave</button>
        </div>
    )
}

export default Blog;