import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import RegisterAsTeacher from "./components/register/RegisterAsTeacher";
import Register from "./components/register/Register";
import StudentNavBar from "./components/StudentNavbar"
import Login from "./components/login/Login";
import TeacherNavbar from "./components/TeacherNavbar";
import AdminNavbar from "./components/AdminNavbar";
import AdminHome from "./components/AdminHome";
import CreateCouse from "./components/CreateCourse"
import TeacherProfile from "./components/TeacherProfile"
import Profile from "./components/Profile"


function App() {

  const user = JSON.parse(localStorage.getItem('user'))
  //console.log(user._id);
  return (
   <div>
     <BrowserRouter>
      {!user && <Navbar />}
      {user && user.role === "student" ? (
        <StudentNavBar />
      ):user && user.role === "teacher" ?(
        <TeacherNavbar/>
      ):user && user.role === "admin" && <AdminNavbar />
      }
      <Routes>
      
      <Route path="/" element={user && user.role === "admin" ?(<AdminHome />):user && user.role === "teacher"?(<CreateCouse/>):user && user.role === "student"?(<Home/>):<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/becomeTeacher" element={<RegisterAsTeacher/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/create" element={<CreateCouse />}/>
      <Route path="/profile" element={user && user.role === "teacher" ?(<TeacherProfile />):<Profile/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/:category" element={<Home />}/>

     </Routes>
     </BrowserRouter>
   </div>
  );
}

export default App;
