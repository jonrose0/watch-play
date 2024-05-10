'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import clsx from 'clsx';
import Search from './search';
import Sort from './sort';
import FilterDate from './filterDate';
import FilterGenre from './filterGenre';
import FilterProvider from './filterProvider';

export default function Filter({
	type,
	genres,
	providers,
	sort,
}: {
	type: string;
	genres: { id: number; name: string }[];
	providers: {
		provider_id?: number;
		provider_name?: string;
		logo_path?: string;
		id?: number;
		name?: string;
	}[];
	sort: { id: number; name: string; value: string }[];
}) {
	// const searchParams = useSearchParams();
	// const pathname = usePathname();
	// const { replace } = useRouter();
	const [openFilter, setOpenFilter] = useState({
		release: false,
		genre: false,
		provider: false,
	});

	// function handleFilter(selection: number | undefined, filter: string) {
	// 	const params = new URLSearchParams(searchParams);

	// 	if (selection) {
	// 		let genres = params.get(filter)?.split(',');

	// 		if (genres) {
	// 			if (genres.indexOf(selection.toString()) !== -1) {
	// 				genres = genres.filter((genre) => {
	// 					return genre !== selection.toString();
	// 				});
	// 			} else {
	// 				genres.push(selection.toString());
	// 			}
	// 			if (genres.length > 0) {
	// 				params.set(filter, genres.join(','));
	// 			} else {
	// 				params.delete(filter);
	// 			}
	// 		} else {
	// 			params.set(filter, selection.toString());
	// 		}
	// 	} else {
	// 		params.delete(filter);
	// 	}

	// 	replace(`${pathname}?${params.toString()}`);
	// }

	// const handleMinDate = useDebouncedCallback((date: string) => {
	// 	const params = new URLSearchParams(searchParams);

	// 	if (date) {
	// 		if (Number(date) < 1900) {
	// 			params.set('min-date', '1900');
	// 		} else {
	// 			params.set('min-date', date);
	// 		}
	// 	} else {
	// 		params.delete('min-date');
	// 	}

	// 	console.log(params, 'param');

	// 	replace(`${pathname}?${params.toString()}`);
	// }, 1000);

	// const handleMaxDate = useDebouncedCallback((date: string) => {
	// 	const params = new URLSearchParams(searchParams);

	// 	if (date) {
	// 		if (Number(date) > new Date().getFullYear()) {
	// 			const newDate = new Date().getFullYear();

	// 			params.set('max-date', newDate.toString());
	// 		} else {
	// 			params.set('max-date', date);
	// 		}
	// 	} else {
	// 		params.delete('max-date');
	// 	}

	// 	console.log(params, 'param');

	// 	replace(`${pathname}?${params.toString()}`);
	// }, 1000);

	function handleFilterOpen(filter: string) {
		if (filter === 'release') {
			setOpenFilter({
				release: !openFilter.release,
				genre: false,
				provider: false,
			});
		}

		if (filter === 'genre') {
			setOpenFilter({
				release: false,
				genre: !openFilter.genre,
				provider: false,
			});
		}

		if (filter === 'provider') {
			setOpenFilter({
				release: false,
				genre: false,
				provider: !openFilter.provider,
			});
		}
	}

	return (
		<div className='pt-12 pb-4'>
			<div className='flex flex-col gap-4 md:flex-row'>
				<Search type={type} />
				<Sort sort={sort} />
				<div className='md:flex md:items-center md:gap-4'>
					<div className='md:relative'>
						<button onClick={() => handleFilterOpen('release')}>
							Release Date
						</button>
						<FilterDate open={openFilter.release} />
						{/* <div
							className={clsx(
								'gap-4 md:absolute md:top-full md:left-1/2 md:w-72 md:translate-x-[-50%] md:p-4',
								{
									hidden: openFilter.release === false,
									flex: openFilter.release === true,
								}
							)}
						>
							<input
								className='bg-stone-900 w-2/4 p-2'
								type='number'
								min='1900'
								onChange={(e) => handleMinDate(e.target.value)}
							/>
							<input
								className='bg-stone-900 w-2/4 p-2'
								type='number'
								max={new Date().getFullYear()}
								onChange={(e) => handleMaxDate(e.target.value)}
							/>
						</div> */}
					</div>
					<div className='md:relative'>
						<button onClick={() => handleFilterOpen('genre')}>Genres</button>
						<FilterGenre genres={genres} open={openFilter.genre} />
						{/* <div
							className={clsx(
								'flex-wrap gap-4 bg-stone-900 max-w-80 md:absolute md:top-full md:left-1/2 md:w-72 md:translate-x-[-50%] md:p-4',
								{
									hidden: openFilter.genre === false,
									flex: openFilter.genre === true,
								}
							)}
						>
							{genres.map((genre) => {
								return (
									<button
										key={genre.id}
										className=''
										onClick={(e) => handleFilter(genre.id, 'genre')}
									>
										{genre.name}
									</button>
								);
							})}
						</div> */}
					</div>
					<div className='md:relative'>
						<button onClick={() => handleFilterOpen('provider')}>
							Providers
						</button>
						<FilterProvider providers={providers} open={openFilter.provider} />
						{/* <div
							className={clsx(
								'grid-cols-[repeat(auto-fill,_minmax(4rem,_1fr))] gap-6 bg-stone-900 md:grid-cols-4 md:max-w-80 md:max-h-[40rem] md:absolute md:top-full md:left-1/2 md:w-80 md:translate-x-[-50%] md:overflow-y-scroll md:p-4',
								{
									hidden: openFilter.provider === false,
									grid: openFilter.provider === true,
								}
							)}
						>
							{providers.map((provider, i) => {
								if (provider.provider_id) {
									return (
										<button
											key={provider.provider_id}
											onClick={(e) =>
												handleFilter(provider.provider_id, 'provider')
											}
										>
											<img
												src={`http://image.tmdb.org/t/p/w780${provider.logo_path}`}
												title={provider.provider_name}
												alt=''
											/>
										</button>
									);
								} else {
									return (
										i < 10 && (
											<button
												key={provider.id}
												onClick={(e) => handleFilter(provider.id, 'provider')}
											>
												{provider.name}
											</button>
										)
									);
								}
							})}
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}
