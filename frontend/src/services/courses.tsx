import axios from "./axiosConfig";
import { Dispatch } from "react";
import { setLoading } from "../store/actions/loading";

export const addCourseService = async (course: any, dispatch: Dispatch<any>) => {
	try {
		dispatch(setLoading(true));

		await axios({
			url: '/api/courses',
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			data: {
				'name': course.name,
				'subjectCode': course.code,
				'degree': course.degree,
				'branch': course.branch,
				'year': course.year,
				'batch': course.batch,
			}
		});

		console.log('Course added successfully');

		dispatch(setLoading(false));
	}
	catch (err: any) {
		console.log({ err });
	}
};
