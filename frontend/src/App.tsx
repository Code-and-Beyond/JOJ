import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherPanel from './pages/Teacher/Controller';
// import NormalRoute from './hoc/NormalRoute';

import "./main.scss";
import Courses from './pages/Teacher/Courses';
import Test from './pages/Test';

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/teacher" element={<TeacherPanel />} >
						<Route path="courses" element={<Courses />} />
						<Route path="clubs" element={<Courses />} />
					</Route>
					<Route path="/test/:testId/problems" element={<Test />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
