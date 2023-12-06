import React from "react";
import { Route , Routes , BrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Intro from './components/IntroPage/intro';
import AuthState from './context/auth/AuthState';


import Course from "./components/library/adminPages/course";
import Exams from "./components/library/adminPages/exams";
import SubCourseExam from "./components/library/adminPages/subCourseExam";
import SuperSubCourseExam from "./components/library/adminPages/superSubExam";
import UsersLogin from "./components/library/userPages/main";

import Home from "./components/library/adminPages/home";
import UsersCourses from "./components/library/userPages/userCourse";
import UserExams from "./components/library/userPages/userExams";
import UserSubCourseExams from "./components/library/userPages/userSubCourseExam";
import UserSuperSubExams from "./components/library/userPages/userSuperSubExam";
import Feedback from "./components/library/userPages/feedbackUser";
import Team from "./components/Team/team";

function App() {
  return (
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Intro/>}/>
            <Route path='/library' element={<Login/>}/>
            <Route path='/library/register' element={<Register/>}/>
            <Route path='/library/feedback' element={<Feedback/>}/>
            <Route path='/team' element={<Team/>}></Route>
            <Route path='/library/root' element={<Home/>}/>
            <Route path='/library/root/:course' element={<Course/>}/>
            <Route path='/library/root/:course/:exams' element={<Exams/>}/>
            <Route path='/library/root/:course/:exams/:subExams' element={<SubCourseExam/>}/>
            <Route path='/library/root/:course/:exams/:subExams/:superSub' element={<SuperSubCourseExam/>}/>

            <Route path="/library/main" element={<UsersLogin/>}></Route>
            <Route path="/library/main/:course" element={<UsersCourses/>}></Route>
            <Route path="/main/:course/:exams" element={<UserExams/>}></Route>
            <Route path="/main/:course/:exams/:subExams" element={<UserSubCourseExams/>}></Route>
            <Route path="/main/:course/:exams/:subExams/:superSub" element={<UserSuperSubExams/>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthState>
    
  );
}

export default App;
