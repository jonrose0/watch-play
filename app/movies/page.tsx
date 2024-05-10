import Filter from '../ui/filter';
import { movieGenres } from '../lib/genres';
import { movieProvider } from '../lib/watch-providers';
import Media from '../ui/media';
import { Suspense } from 'react';
import { MediaGridSkeleton } from '../ui/skeletons';

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
				type='movies'
				genres={movieGenres}
				providers={movieProvider}
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
				<Media
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
