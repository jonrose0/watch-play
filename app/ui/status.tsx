'use client';

export default function Status() {
	function handleStatus(e: any) {
		e.stopPropagation();
		console.log('tttt');
	}

	return (
		<button
			className='rounded bg-[#178187] hover:bg-[#1dabb3] hover:text-white p-2'
			onClick={handleStatus}
		>
			Status
		</button>
	);
}
