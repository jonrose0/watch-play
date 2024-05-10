'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchTV } from '../lib/actions';
import Grid from './media-grid';

type dataProps = {
	id: number;
	title: string;
	poster_path: string;
};

let page = 2;

export default function LoadMore({
	query,
	sort,
	genre,
	provider,
	minDate,
	maxDate,
}: {
	query: string;
	sort: string;
	genre: string;
	provider: string;
	minDate: string;
	maxDate: string;
}) {
	const { ref, inView } = useInView();
	const [data, setData] = useState<dataProps[]>([]);

	useEffect(() => {
		if (inView) {
			fetchTV(query, sort, genre, provider, minDate, maxDate, page).then(
				(res) => {
					setData([...data, ...res.results]);
					page++;
				}
			);
		}
	}, [inView]);

	useEffect(() => {
		page = 2;
		setData([]);
	}, [query, sort, genre, provider, minDate, maxDate]);

	return (
		<>
			<Grid data={data} type='shows' />
			<div ref={ref}></div>
		</>
	);
}
