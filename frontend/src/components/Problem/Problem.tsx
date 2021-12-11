import React from 'react';

type ProblemProps = {

};

const Problem: React.FC<ProblemProps> = () => {

	return (
		<div className='problem'>
			<h1 className='h h--3'>A. Rotten Oranges</h1>
			<div className='u-m-v-m'>
				<h3 className='b b--1'>Problem Statement :</h3>
				<p className='b b--2'>You are given an m x n grid where each cell can have one of three values:

					0 representing an empty cell,
					1 representing a fresh orange, or
					2 representing a rotten orange.
					Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

					Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.
				</p>
			</div>
			<div className='u-m-b-m'>
				<h3 className='b b--1'>Constraints :</h3>
				<ul className='a a--2'>
					<li>m == grid.length</li>
					<li>n == grid[i].length</li>
					<li>grid[i][j] is 0, 1, or 2.</li>
				</ul>
			</div>
			<div className='u-m-b-m'>
				<h3 className='b b--1'>Sample Testcase 0 :</h3>
				<div className='problem__sample a a--2'>
					<p><span>Input: </span> l1 = [2,4,3], l2 = [5,6,4]</p>
					<p><span>Output: </span> [7,0,8]</p>
					<p><span>Explanation: </span> 342 + 465 = 807.</p>
				</div>
			</div>
		</div>
	);
};
export default Problem;;;;