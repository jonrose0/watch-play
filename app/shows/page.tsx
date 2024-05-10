import Filter from '../ui/filter';
import { showGenres } from '../lib/genres';
import { tvProvider } from '../lib/watch-providers';
import Shows from '../ui/shows';
import { MediaGridSkeleton } from '../ui/skeletons';
import { Suspense } from 'react';

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
				type='tv shows'
				genres={showGenres}
				providers={tvProvider}
				sort={[
					{ id: 1, name: 'Popularity desc', value: 'popularity.desc' },
					{ id: 2, name: 'Popularity asc', value: 'popularity.asc' },
					{ id: 3, name: 'title desc', value: 'title.desc' },
					{ id: 4, name: 'title asc', value: 'title.asc' },
					{
						id: 5,
						name: 'Release Date desc',
						value: 'primary_release_date.desc',
					},
					{
						id: 6,
						name: 'Release Date asc',
						value: 'primary_release_date.asc',
					},
				]}
			/>
			<Suspense fallback={<MediaGridSkeleton />}>
				<Shows
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
