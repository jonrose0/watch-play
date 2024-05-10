import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ type }: { type: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}

		console.log(params, 'param');

		replace(`${pathname}?${params.toString()}`);
	}, 1000);

	return (
		<>
			<div className='md:mr-auto'>
				<input
					type='text'
					placeholder={`Search ${type}...`}
					className='bg-stone-900 w-full rounded-full px-6 py-3'
					defaultValue={searchParams.get('query')?.toString()}
					onChange={(e) => handleSearch(e.target.value)}
				/>
			</div>
		</>
	);
}
