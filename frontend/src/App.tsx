import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherPanel from './pages/Teacher/Controller';
// import NormalRoute from './hoc/NormalRoute';

import "./main.scss";
import Courses from './pages/Teacher/Courses';
import Test from './pages/Test';
import Evaluations from './pages/Teacher/Evaluations';
import People from './pages/Teacher/People';
import Login from './components/Login/Login';

const App = () => {
	return (
		<div className="App">
			<Router>
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
			</Router>
		</div>
	);
};

export default App;
