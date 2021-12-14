import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Redux
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { rootReducer } from "./store/reducers/root";
import thunk from 'redux-thunk';

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
import "./main.scss";
import { useEffect } from 'react';

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		persistLogin(dispatch, navigate);
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login/:role" element={<Login />} />
			<Route path="/teacher" element={<TeacherPanel />} >
				<Route path="courses" element={<Courses />} />
				<Route path="courses/:id/evaluations" element={<Evaluations />} />
				<Route path="courses/:id/people" element={<People />} />
				<Route path="clubs" element={<Courses />} />
			</Route>
			<Route path="/test/:testId/problems" element={<Test />} />
		</Routes>
	);
};

export default App;
