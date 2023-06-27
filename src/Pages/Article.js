import { useParams } from "react-router-dom"
import articles from "./article-content";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";
import axios from 'axios'
import CommentsList from "../components/CommentsList";
import CommentForm from "../components/CommentForm";
import useUser from "../hooks/useUser";
import {  useNavigate } from "react-router-dom"

const Article = () => {
    const {id} = useParams();
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpvote: false})
    const {canUpvote} = articleInfo
    const {user, isLoading} = useUser(); 
    const navigate = useNavigate();

    useEffect(() => {

      const loadArticleInfo = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.get(`/api/articles/${id}`,{ headers}); 
        const data = response.data;
        console.log(data)
        setArticleInfo(data)
      }

      if(isLoading){
        loadArticleInfo();
      }
  
    },[isLoading,user])

    const addUpvote = async () => {
      const token = user && await user.getIdToken();
      const headers = token ? {authtoken: token} : {};
      const response = await axios.put(`/api/articles/${id}/upvotes`,null,headers)
      const data = response.data;
      setArticleInfo(data);
    }

    
    const article = articles.find(article => article.name === id)

    if(!article){
      return <NotFound />
    }


  return (
    <>
       <h1>{article.title}</h1>
       <div className="upvotes-section">
          {user ? <button onClick={addUpvote}>{canUpvote ? 'Upvote' : 'Already Upvoted'}</button> : <button onClick={() => {navigate('/login')}}>Log in to Upvote</button> }
          <p>Article has {articleInfo.upvotes} upvote(s)</p>
       </div>
       
        {article.content.map((para,i) => (
            <p key={i}>
              {para}
              </p>
        ))}
        {user ? <CommentForm 
        articleId = {id}
        onArticleUpdate = {article => setArticleInfo(article)}
        /> : <button onClick={()=> {navigate('/login')}}>Log in to Add Comment</button>}
        <CommentsList comments={articleInfo.comments}/>
    </>
  )
}

export default Article