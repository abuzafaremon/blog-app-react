import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import SinglePost from './Components/SinglePost/SinglePost';
import Blog from './Pages/Blog/Blog';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Post from './Pages/Post/Post';
import Profile from './Pages/Profile/Profile';

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/post' element={<Post />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/singlePost' element={<SinglePost />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
};