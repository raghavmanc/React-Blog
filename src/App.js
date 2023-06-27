import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import NavBar from './NavBar';
import Home from './Pages/Home'
import About from './Pages/About'
import ArticleList from './Pages/ArticleList';
import Article from './Pages/Article';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';


function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/about" element={<About />} />
          <Route path = "/articles" element={<ArticleList />} />
          <Route path = "/articles/:id" element={<Article />} />
          <Route path = "/login" element={<Login/>} />
          <Route path = "/signup" element={<CreateAccount/>} />
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );

}

export default App;
