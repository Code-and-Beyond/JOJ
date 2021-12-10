import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherPanel from './pages/Teacher/Controller';

import "./main.scss";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/teacher/dashboard" element={<TeacherPanel />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
