import axios from "axios"
import { useState } from "react"
import useUser from "../hooks/useUser";


const CommentForm = ({articleId, onArticleUpdate}) => {

    const [name,setName] = useState("")
    const [comment,setComment] = useState("")
    const {user} = useUser();


    
const addComment = async () => {

    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token} : {};
    const response = await axios.post(`/api/articles/${articleId}/comments`,{
     postedBy: name,
     text: comment, 
    }, {
        headers,
    });

    const data = response.data;
    onArticleUpdate(data); 
    setComment('')
    setName('')
    
 }

  return (
    <div id="add-comment-form">
        <h3>Add a Comment</h3>
        {user && <p>You are posting as {user.email}</p>}

        <label>
            
            <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}            
            rows="4" cols="50"></textarea>
        </label>

        <button onClick={addComment}>Add Comment</button>
    </div>
  )
}

export default CommentForm