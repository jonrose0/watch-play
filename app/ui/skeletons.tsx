export function MediaCard() {
	return (
		<>
			<div className='grid grid-rows-[4fr_1fr] w-full h-96'>
				<div className='w-full bg-[#111]'></div>
				<div className='bg-[#222] flex items-center w-full p-4'>
					<div className='w-1/2 bg-[#333] h-6 rounded-full'></div>
				</div>
			</div>
		</>
	);
}

export function MediaGridSkeleton() {
	return (
		<>
			<div className='grid grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))] gap-8 py-4'>
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
				<MediaCard />
			</div>
		</>
	);
}
