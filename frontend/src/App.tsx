import { Routes, Route, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// pages
import Landing from './pages/Landing';
import Login from './components/Login/Login';
import Test from './pages/Test';

// Teacher Pages
import TeacherPanel from './pages/Teacher/Controller';
import TeacherCourses from './pages/Teacher/Courses';
import TeacherEvaluations from './pages/Teacher/Evaluations';
import TeacherPeople from './pages/Teacher/People';
import TeacherProblems from './pages/Teacher/Problems';
import TeacherReports from './pages/Teacher/Reports';


// Student Pages
import StudentPanel from './pages/Student/Controller';
import StudentCourses from './pages/Student/Courses';
import StudentEvaluations from './pages/Student/Evaluations';
import StudentClassmates from './pages/Student/People';


import { persistLogin } from './services/auth';

// Styles
import './main.scss';
import { useEffect } from 'react';


const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('App.tsx: useEffect');
        persistLogin(dispatch, navigate);
    }, []);

    const getTeacherRoutes = () => (
        <Route path="/teacher" element={<TeacherPanel />}>
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="courses/:id/evaluations" element={<TeacherEvaluations />} />
            <Route path="courses/:id/people" element={<TeacherPeople />} />
            <Route path="courses/:id/evaluations/:id/problems" element={<TeacherProblems />} />
            <Route path="courses/:id/evaluations/:id/reports" element={<TeacherReports />} />
            <Route path="clubs" element={<TeacherCourses />} />
        </Route>
    );

    const getStudentRoutes = () => (
        <Route path="/student" element={<StudentPanel />}>
            <Route path="courses" element={<StudentCourses />} />
            <Route path="courses/:id/evaluations" element={<StudentEvaluations />} />
            <Route path="courses/:id/people" element={<StudentClassmates />} />
            <Route path="clubs" element={<StudentCourses />} />
        </Route>
    );

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/test/:testId/problems" element={<Test />} />
            {getTeacherRoutes()}
            {getStudentRoutes()}
        </Routes>
    );
};

export default App;
