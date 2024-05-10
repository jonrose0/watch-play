import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function FilterProvider({
	providers,
	open,
}: {
	providers: {
		provider_id?: number;
		provider_name?: string;
		logo_path?: string;
		id?: number;
		name?: string;
	}[];
	open: boolean;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleFilter(selection: number | undefined, filter: string) {
		const params = new URLSearchParams(searchParams);

		if (selection) {
			let genres = params.get(filter)?.split(',');

			if (genres) {
				if (genres.indexOf(selection.toString()) !== -1) {
					genres = genres.filter((genre) => {
						return genre !== selection.toString();
					});
				} else {
					genres.push(selection.toString());
				}
				if (genres.length > 0) {
					params.set(filter, genres.join(','));
				} else {
					params.delete(filter);
				}
			} else {
				params.set(filter, selection.toString());
			}
		} else {
			params.delete(filter);
		}

		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<>
			<div
				className={clsx(
					'bg-stone-900 z-10 md:max-w-80 md:max-h-[40rem] md:absolute md:top-full md:left-1/2 md:w-80 md:translate-x-[-50%] md:overflow-y-scroll md:p-4',
					{
						hidden: open === false,
						block: open === true,
					}
				)}
			>
				<div className='flex justify-between'>
					<h3>Providers</h3>
					<button>clear filters</button>
				</div>

				<div className='grid grid-cols-[repeat(auto-fill,_minmax(4rem,_1fr))] gap-6 md:grid-cols-4 '>
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
				</div>
			</div>
		</>
	);
}
