import Filter from '../ui/filter';
import { gameGenres } from '../lib/genres';
import { gameProvider } from '../lib/watch-providers';
import { Suspense } from 'react';
import { MediaGridSkeleton } from '../ui/skeletons';
import Games from '../ui/games';

export default async function Page({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		sort?: string;
		genre?: string;
		provider?: string;
		'min-date'?: string;
		'max-date'?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = searchParams?.page || 1;
	const sort = searchParams?.sort || '';
	const genre = searchParams?.genre || '';
	const provider = searchParams?.provider || '';
	const minDate = searchParams?.['min-date'] || '';
	const maxDate = searchParams?.['max-date'] || '';

	return (
		<>
			<Filter
				type='games'
				genres={gameGenres}
				providers={gameProvider}
				sort={[
					{ id: 1, name: 'Popularity desc', value: '-added' },
					{ id: 2, name: 'Popularity asc', value: 'added' },
					{ id: 3, name: 'title desc', value: '-name' },
					{ id: 4, name: 'title asc', value: 'name' },
					{
						id: 5,
						name: 'Release Date desc',
						value: '-released',
					},
					{
						id: 6,
						name: 'Release Date asc',
						value: 'released',
					},
				]}
			/>
			<Suspense fallback={<MediaGridSkeleton />}>
				<Games
					query={query}
					sort={sort}
					genre={genre}
					provider={provider}
					minDate={minDate}
					maxDate={maxDate}
				/>
			</Suspense>
		</>
	);
}
