
import articles from "./article-content"
import ArticlesList from "../components/ArticlesList"
const ArticleList = () => {
  return ( 
    <>
        <ArticlesList articles={articles}/>
    </>
  )
}

export default ArticleList