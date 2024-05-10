import { fetchGames } from '../lib/actions';
import LoadMore from './load-more-games';
import Grid from './media-grid';

export default async function Games({
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
	const data = await fetchGames(
		query,
		sort,
		genre,
		provider,
		minDate,
		maxDate,
		1
	);

	return (
		<>
			<p>Total: {data.count}</p>
			<div className='grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 auto-rows-fr py-4'>
				<Grid data={data.results} type='games' />
				<LoadMore
					query={query}
					sort={sort}
					genre={genre}
					provider={provider}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</div>
			<div className='flex justify-center mb-8'>
				<div className='w-16 h-16 rounded-full border-8 border-t-slate-400 border-zinc-800 animate-spin'></div>
			</div>
		</>
	);
}
