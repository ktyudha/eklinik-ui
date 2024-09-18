import { FunctionComponent } from 'react'
import { Information } from '@services/admin/information/interfaces/get-information.types'

interface Props {
	information: Information
}

const DashboardContentCard: FunctionComponent<Props> = ({ information }) => {
	const numberFormat = (value: number) => value.toLocaleString('id-ID', {
    maximumFractionDigits: 0,
  })
	
	return (
		<div className="grid grid-cols-12 gap-5">
			<div className="w-full col-span-12 lg:col-span-6 rounded-lg flex items-start bg-slate-100 border border-slate-500">
				<div className='bg-slate-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-slate-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-slate-500">Provinsi</h1>
					</div>
				</div>
			</div>

			<div className="w-full col-span-12 lg:col-span-6 rounded-lg flex items-start bg-slate-100 border border-slate-500">
				<div className='bg-slate-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-slate-500">{numberFormat(information.total_cities)}</p>
						<h1 className="font-semibold text-xl text-slate-500">Kota/Kabupaten</h1>
					</div>
				</div>
			</div>

			{/* School SD */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-red-100 border border-red-500">
				<div className='bg-red-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-red-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-red-500">Satuan Pendidikan SD</h1>
					</div>
				</div>
			</div>

			{/* School MI */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-orange-100 border border-orange-500">
				<div className='bg-orange-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-orange-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-orange-500">Satuan Pendidikan MI</h1>
					</div>
				</div>
			</div>

			{/* School SMP */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-yellow-100 border border-yellow-500">
				<div className='bg-yellow-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-yellow-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-yellow-500">Satuan Pendidikan SMP</h1>
					</div>
				</div>
			</div>

			{/* School MTs */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-green-100 border border-green-500">
				<div className='bg-green-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-green-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-green-500">Satuan Pendidikan MTs</h1>
					</div>
				</div>
			</div>

			{/* School SMPT */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-blue-100 border border-blue-500">
				<div className='bg-blue-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-blue-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-blue-500">Satuan Pendidikan SMPT</h1>
					</div>
				</div>
			</div>

			{/* School SMA */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-indigo-100 border border-indigo-500">
				<div className='bg-indigo-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-indigo-500">{numberFormat(information.total_schools_sma)}</p>
						<h1 className="font-semibold text-xl text-indigo-500">Satuan Pendidikan SMA</h1>
					</div>
				</div>
			</div>

			{/* School MA */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-purple-100 border border-purple-500">
				<div className='bg-purple-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-purple-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-purple-500">Satuan Pendidikan MA</h1>
					</div>
				</div>
			</div>

			{/* School SMK */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-fuchsia-100 border border-fuchsia-500">
				<div className='bg-fuchsia-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-fuchsia-500">{numberFormat(information.total_schools_smk)}</p>
						<h1 className="font-semibold text-xl text-fuchsia-500">Satuan Pendidikan SMK</h1>
					</div>
				</div>
			</div>

			{/* Student SD */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-red-100 border border-red-500">
				<div className='bg-red-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-red-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-red-500">Peserta Didik SD</h1>
					</div>
				</div>
			</div>

			{/* Student MI */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-orange-100 border border-orange-500">
				<div className='bg-orange-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-orange-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-orange-500">Peserta Didik MI</h1>
					</div>
				</div>
			</div>

			{/* Student SMP */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-yellow-100 border border-yellow-500">
				<div className='bg-yellow-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-yellow-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-yellow-500">Peserta Didik SMP</h1>
					</div>
				</div>
			</div>

			{/* Student MTs */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-green-100 border border-green-500">
				<div className='bg-green-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-green-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-green-500">Peserta Didik MTs</h1>
					</div>
				</div>
			</div>

			{/* Student SMPT */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-blue-100 border border-blue-500">
				<div className='bg-blue-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-blue-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-blue-500">Peserta Didik SMPT</h1>
					</div>
				</div>
			</div>

			{/* Student SMA */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-indigo-100 border border-indigo-500">
				<div className='bg-indigo-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-indigo-500">{numberFormat(information.total_students_sma)}</p>
						<h1 className="font-semibold text-xl text-indigo-500">Peserta Didik SMA</h1>
					</div>
				</div>
			</div>

			{/* Student MA */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-purple-100 border border-purple-500">
				<div className='bg-purple-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-purple-500">{numberFormat(0)}</p>
						<h1 className="font-semibold text-xl text-purple-500">Peserta Didik MA</h1>
					</div>
				</div>
			</div>

			{/* Student SMK */}
			<div className="w-full col-span-12 lg:col-span-3 rounded-lg flex items-start bg-fuchsia-100 border border-fuchsia-500">
				<div className='bg-fuchsia-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-fuchsia-500">{numberFormat(information.total_students_smk)}</p>
						<h1 className="font-semibold text-xl text-fuchsia-500">Peserta Didik SMK</h1>
					</div>
				</div>
			</div>
	
			{/* <div className="w-full col-span-10 lg:col-span-2 rounded-lg flex items-start bg-red-100 border border-red-500">
				<div className='bg-red-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-red-500">{numberFormat(information.total_schools_sma)}</p>
						<h1 className="font-semibold text-xl text-red-500">Satuan Pendidikan SMA</h1>
					</div>
				</div>
			</div>
	
			<div className="w-full col-span-10 lg:col-span-2 rounded-lg flex items-start bg-yellow-100 border border-yellow-500">
				<div className='bg-yellow-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-yellow-500">{numberFormat(information.total_schools_smk)}</p>
						<h1 className="font-semibold text-xl text-yellow-500">Satuan Pendidikan SMK</h1>
					</div>
				</div>
			</div>
			
			<div className="w-full col-span-10 lg:col-span-2 rounded-lg flex items-start bg-orange-100 border border-orange-500">
				<div className='bg-orange-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-orange-500">{numberFormat(information.total_students_sma)}</p>
						<h1 className="font-semibold text-xl text-orange-500">Peserta Didik SMA</h1>
					</div>
				</div>
			</div>
			
			<div className="w-full col-span-10 lg:col-span-2 rounded-lg flex items-start bg-green-100 border border-green-500">
				<div className='bg-green-500 h-full w-5 rounded-s-md' />
				<div className="flex p-5">
					<div className='flex flex-col gap-2'>
						<p className="font-bold text-4xl text-green-500">{numberFormat(information.total_students_smk)}</p>
						<h1 className="font-semibold text-xl text-green-500">Peserta Didik SMK</h1>
					</div>
				</div>
			</div> */}
		</div>
	)
}

export default DashboardContentCard
