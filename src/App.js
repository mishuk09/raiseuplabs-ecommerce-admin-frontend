
import { Route, Routes } from 'react-router';
import SignIn from './components/Auth/SignIn';
import Dashboard from './components/Auth/Dashboard';
import AddPost from './components/Post/AddPost';
import UpdatePost from './components/Post/UpdatePost';
import DeletePost from './components/Post/DeletePost';
import Edit from './components/Post/Edit';
import Delete from './components/Post/Delete';
import Orders from './components/Post/Orders';
import SignUp from './components/Auth/SignUp';
import Layout from './pages/Home/Layout';
import Offfer from './components/Offer/Offfer';
import AddOffer from './components/Offer/AddOffer';
import SelectEdit from './components/Offer/SelectEdit';
import EditOffer from './components/Offer/EditOffer';
import SelectDelete from './components/Offer/SelectDelete';
import DeleteOffer from './components/Offer/DeleteOffer';
import NewArrival from './components/NewArrival/NewArrival';
import NewAddPost from './components/NewArrival/NewAddPost';
import NewUpdatePost from './components/NewArrival/NewUpdatePost';
import NewDeletePost from './components/NewArrival/NewDeletePost';
import NewEdit from './components/NewArrival/NewEdit';
import NewDelete from './components/NewArrival/NewDelete';
import CatAddPost from './components/Category/CatAddPost';
import Category from './components/Category/Category';
import CatUpdatePost from './components/Category/CatUpdatePost';
import CatDeletePost from './components/Category/CatDeletePost';
import CatEdit from './components/Category/CatEdit';
import CatDelete from './components/Category/CatDelete';

function App() {

  return (
    <div className="App">

      {/* <Navbar /> */}

      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/nmnbnmn' element={<SignUp />} />
        <Route element={<Layout />}>
          <Route path='/' element={<Layout />} />

          <Route path='/dashboard' element={<Dashboard />} />


          {/* Offer section route  */}
          <Route path="/offer" element={<Offfer />} />
          <Route path="/addoffer" element={<AddOffer />} />
          <Route path="/editoffer" element={<SelectEdit />} />
          <Route path="/offupdate/:id" element={<EditOffer />} />
          <Route path="/deleteoffer" element={<SelectDelete />} />
          <Route path="/offdelete/:id" element={<DeleteOffer />} />

          {/* NewarrivalSection  */}
          <Route path='/new' element={<NewArrival />} />
          <Route path='/newadd' element={<NewAddPost />} />
          <Route path="/newupdate/:id" element={<NewUpdatePost />} />
          <Route path="/newdelete/:id" element={<NewDeletePost />} />
          <Route path="/newedit" element={<NewEdit />} />
          <Route path="/newdelete" element={<NewDelete />} />

          {/* Category Section  */}
          <Route path='/cate' element={<Category />} />
          <Route path='/cateadd' element={<CatAddPost />} />
          <Route path="/cateupdate/:id" element={<CatUpdatePost />} />
          <Route path="/catedelete/:id" element={<CatDeletePost />} />
          <Route path="/cateedit" element={<CatEdit />} />
          <Route path="/catedelete" element={<CatDelete />} />

          {/* all item rounte  */}
          <Route path="/orders" element={<Orders />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path="/update/:id" element={<UpdatePost />} />
          <Route path="/delete/:id" element={<DeletePost />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/delete" element={<Delete />} />
        </Route>
      </Routes>



    </div >
  );
}

export default App;
