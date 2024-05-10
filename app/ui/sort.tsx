import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Sort({
	sort,
}: {
	sort: { id: number; name: string; value: string }[];
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function handleSort(selection: string) {
		const params = new URLSearchParams(searchParams);
		console.log(params, 'param');

		if (selection) {
			params.set('sort', selection);
		} else {
			params.delete('sort');
		}

		console.log(params, 'param');

		console.log(selection);

		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<>
			<div className='md:order-3'>
				<select
					name=''
					id=''
					className='bg-stone-900 w-full p-2 cursor-pointer	'
					defaultValue={searchParams.get('sort')?.toString()}
					onChange={(e) => handleSort(e.target.value)}
				>
					{sort.map((option) => {
						return (
							<option key={option.id} value={option.value}>
								{option.name}
							</option>
						);
					})}
				</select>
			</div>
		</>
	);
}
