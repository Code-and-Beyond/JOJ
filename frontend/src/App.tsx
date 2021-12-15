import { Routes, Route, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Pages
import Landing from './pages/Landing';
import TeacherPanel from './pages/Teacher/Controller';
import Courses from './pages/Teacher/Courses';
import Test from './pages/Test';
import Evaluations from './pages/Teacher/Evaluations';
import People from './pages/Teacher/People';
import Login from './components/Login/Login';

import { persistLogin } from './services/auth';

// Styles
import './main.scss';
import { useEffect } from 'react';
import Problems from './pages/Teacher/Problems';
import Reports from './pages/Teacher/Reports';

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('App.tsx: useEffect');
        persistLogin(dispatch, navigate);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/teacher" element={<TeacherPanel />}>
                <Route path="courses" element={<Courses />} />
                <Route
                    path="courses/:id/evaluations"
                    element={<Evaluations />}
                />
                <Route path="courses/:id/people" element={<People />} />
                <Route
                    path="courses/:id/evaluations/:id/problems"
                    element={<Problems />}
                />
                <Route
                    path="courses/:id/evaluations/:id/reports"
                    element={<Reports />}
                />
                <Route path="clubs" element={<Courses />} />
            </Route>
            <Route path="/test/:testId/problems" element={<Test />} />
        </Routes>
    );
};

export default App;
