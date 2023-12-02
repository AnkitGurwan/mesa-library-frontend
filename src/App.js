import React from "react";
import { Route , Routes , BrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Intro from './components/IntroPage/intro';
import AuthState from './context/auth/AuthState';
import Home from "./components/home";
import Course from "./components/course";
import Exams from "./components/exams";
import SubCourseExam from "./components/subCourseExam";
import SuperSubCourseExam from "./components/superSubExam";
import UsersLogin from "./components/main";
import UsersCourses from "./components/user/userCourse";
import UserExams from "./components/user/userExams";
import UserSubCourseExams from "./components/user/userSubCourseExam";
import UserSuperSubExams from "./components/user/userSuperSubExam";
import Feedback from "./components/user/feedbackUser";
import Team from "./components/Team/team";

function App() {
  return (
      <AuthState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Intro/>}/>
            <Route path='/library' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/team' element={<Team/>}></Route>
            <Route path='/root' element={<Home/>}/>
            <Route path='/root/:course' element={<Course/>}/>
            <Route path='/root/:course/:exams' element={<Exams/>}/>
            <Route path='/root/:course/:exams/:subExams' element={<SubCourseExam/>}/>
            <Route path='/root/:course/:exams/:subExams/:superSub' element={<SuperSubCourseExam/>}/>

            <Route path="/main" element={<UsersLogin/>}></Route>
            <Route path="/main/:course" element={<UsersCourses/>}></Route>
            <Route path="/main/:course/:exams" element={<UserExams/>}></Route>
            <Route path="/main/:course/:exams/:subExams" element={<UserSubCourseExams/>}></Route>
            <Route path="/main/:course/:exams/:subExams/:superSub" element={<UserSuperSubExams/>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthState>
    
  );
}

export default App;
