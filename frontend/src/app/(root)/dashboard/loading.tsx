// app/dashboard/loading.tsx
export default function Loading() {
	return (
		<div className='flex min-h-screen w-full items-center justify-center bg-black text-white'>
			<div className='flex flex-col items-center space-y-4'>
				<div className='h-12 w-12 animate-spin rounded-full border-b-2 border-white'></div>
				<p className='text-lg font-medium'>Sahifa yuklanmoqda...</p>
			</div>
		</div>
	)
}
