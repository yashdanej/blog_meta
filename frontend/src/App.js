import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nav from './components/nav/Nav';
import Home from './pages/home/Home';
import Authentication from './pages/authentication/Authentication';
import SignUp from './pages/authentication/SignUp';
import { useEffect, useState } from 'react';
import { LoadingContent, api } from './components/utils';
import Create from './components/home/blogs/interest/create/Create';
import View from './pages/home/View';
import Search from './pages/Search';
import User from './pages/setting/User';
import ChangePassword from './pages/setting/changePassword/ChangePassword';


function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchObject, setSearchObject] = useState(null);
  const [searchTxt, setSearchTxt] = useState('');
  const [searchByTags, setSearchByTags] = useState([]);
  const [similarBlogSearch, setSimilarBlogSearch] = useState(false);
  const [tags, setTags] = useState("");
  const location = useLocation();

  const handletags = (e, selectedOptions) => {
    setTags((prevTags) => {
      const newTags = selectedOptions.map((option) => option).join(',');
      
      const pathname = '/blog/tags';
      const body = { tags: newTags };
  
      api(pathname, 'post', body)
        .then((res) => {
          setSearchByTags(res.data);
        })
        .catch((e) => {
          console.log('error in similar tags', e);
        })
        .finally(() => {
          setSimilarBlogSearch(searchByTags.length > 0);
        });
  
      return newTags;
    });
  };
  const fetchBlogs = () => {
    setLoading(true);
    const pathname = '/blog';
    api(pathname, 'get', false, false, true)
      .then(res => {
        setBlogs(res.data)
      })
      .catch(e => {
        console.log('err in fetchBlog', e);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleSearch = (text) => {
    setLoading(true);
    const pathname = `/search/${text}`
    api(pathname, 'get', false)
      .then(res => {
        console.log('search text', res);
        setSearchObject(res.data);
      })
      .catch(e => {
        console.log('err in searchText', e);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchBlogs();
    console.log('location.pathname', location.pathname);
  }, [searchByTags]);
  const isSettingUserRoute = location.pathname.startsWith('/setting/');
  return (
    <>
    {loading && <LoadingContent/>}
    {!isSettingUserRoute && <Nav searchTxt={searchTxt} setSearchTxt={setSearchTxt} handleSearch={handleSearch} />}
    <Routes>
      <Route exact path="/signin" element={<Authentication/>} />
      <Route exact path="/signup" element={<SignUp/>} />
      <Route exact path="/" element={<Home tags={tags} handletags={handletags} similarBlogSearch={similarBlogSearch} setSimilarBlogSearch={setSimilarBlogSearch} searchByTags={searchByTags} setSearchByTags={setSearchByTags} fetchBlogs={fetchBlogs} blogs={blogs}/>} />
      <Route exact path="/create/:id?" element={<Create />} />
      <Route exact path="/blog/:id" element={<View />} />
      <Route exact path="/search/:text" element={<Search searchTxt={searchTxt.search} searchObject={searchObject} />} />
      <Route exact path='/setting/:user' element={<User/>} />
      <Route exact path="/changepassword" element={<ChangePassword/>} />
    </Routes>
    </>
  );
}

export default App;
