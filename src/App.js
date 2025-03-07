
import Navbar from './components/Navbar';
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

function App() {

  return (
    <div className="App">

      {/* <Navbar /> */}

      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/nmnbnmn' element={<SignUp />} />
        <Route element={<Layout />}>
          {/* <Route path='/' element={<Layout />} /> */}

          <Route path='/dashboard' element={<Dashboard />} />

          <Route path="/offer" element={<Offfer />} />
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
