'use client';

import { useEffect, useState } from 'react';
import { Data } from '../lib/types';
import { fetchData } from '../lib/actions';

type test = {
	id: number;
	title: string;
	poster_path: string;
};

// async function fetchData(page: number) {
// 	const res = await fetch(
// 		`https://jsonplaceholder.typicode.com/posts/${page}/comments`
// 	);

// 	return res.json();
// }

let page = 2;

export default function Gallery() {
	const [page, setPage] = useState(1);
	const [comments, setComments] = useState<test[]>([]);

	// useEffect(() => {
	// 	async function loadMore() {
	// 		// const testData = await fetchData(page);
	// 		// console.log(testData);
	// 		const res = await fetch('/api');

	// 		const fetchedcomments = await res.json();
	// 		// console.log(comments);
	// 		setComments((comments) => [...fetchedcomments.comments, comments]);
	// 	}

	// 	loadMore();
	// }, [page]);

	useEffect(() => {
		if (page > 1) {
			fetchData(page).then((res) => {
				setComments([...comments, ...res.results]);
				// page++
			});
		}
	}, [page]);

	function handleClick() {
		setPage((page) => page + 1);
	}

	return (
		<>
			{comments.map((n) => {
				return (
					<div key={n.id}>
						<img
							src={`http://image.tmdb.org/t/p/w780${n.poster_path}`}
							alt=''
						/>
					</div>
				);
			})}

			<button onClick={handleClick}>load more</button>
		</>
	);
}
