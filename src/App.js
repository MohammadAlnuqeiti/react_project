import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import HomeUser from './component/home';
import HomeAdmin from './admin/home';
import LoginUser from './component/login';
import SignupUser from './component/signup';
import About from './publicUser/about';
import Contact from './publicUser/contact';
import ListUser from './component/users';
import AllGroup from './component/allGroup';
import MyGroup from './component/myGroup';
import Group from './component/groupPage';
import './App.css';

function App() {
  return (
    <>
       <Routes>
          <Route path="/home" element={ <HomeUser/> } />
          <Route path="/users" element={ <ListUser/> } />
          <Route path="/groups" element={ <AllGroup/> } />
          <Route path="/myGroups" element={ <MyGroup/> } />
          <Route path="/groups/:id/show" element={ <Group/> } />
          <Route path="/user/about" element={ <About/> } />
          <Route path="/user/contact" element={ <Contact/> } />
          <Route path="/user/login" element={ <LoginUser/> } />
          <Route path="/user/signup" element={ <SignupUser/> } />
          <Route path="/admin" element={ <HomeAdmin/> } />
          {/* <Route path="about" element={ <About/> } />
          <Route path="contact" element={ <Contact/> } />
          <Route path="contact/view" element={ <ViewMessage/> } />
          <Route path="contact/:id/edit" element={ <EditMessage/> } />
          <Route path="login" element={ <Login/> } />
          <Route path="Signup" element={ <Signup/> } /> */}
        </Routes>
    </>
  );
}

export default App;
