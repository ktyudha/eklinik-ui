import { FunctionComponent } from 'react'
import TableWrapper from '@components/reusable/Table/TableWrapper'
import TableBody from '@components/reusable/Table/TableBody'
// import TableNotFound from '@components/reusable/Table/TableNotFound'
// import TablePagination from '@components/reusable/Table/TablePagination'

const OverseasUniversityTable: FunctionComponent = () => {
  return (
    <div className="grid grid-cols-12">
      <div className='flex flex-col col-span-12 overflow-auto'>
        <div className="w-full mt-3 overflow-auto h-auto p-3 border border-[#E2E8F0] rounded-md mb-1">
          <div className='flex flex-wrap items-center justify-between gap-2 md:gap-0'>
            <div>
              <h1 className='text-lg font-medium'>Perguruan Tinggi: Universitas Brawijaya</h1>
            </div>
          </div>

          <div className='flex flex-col'>
            <TableWrapper>
              <thead className='bg-gray-100 border-b'>
                <tr>
                  <th scope="col" rowSpan={2} className="w-10 px-6 py-4 text-sm font-medium text-center border-2">
                    No
                  </th>
                  <th scope="col" rowSpan={2} className="px-6 py-4 text-sm font-medium text-center border-2">
                    Nama Alumni
                  </th>
                  <th scope="col" rowSpan={2} className="w-40 px-6 py-4 text-sm font-medium text-center border-2">
                    Program Studi
                  </th>
                  <th scope="col" rowSpan={2} className="w-20 px-6 py-4 text-sm font-medium text-center border-2">
                    Jenjang
                  </th>
                  <th scope="col" colSpan={4} className="px-6 py-4 text-sm font-medium text-center border-2">
                    Jalur Seleksi
                  </th>
                </tr>
                <tr>
                  <th className="p-1 text-sm font-medium text-center border-e-2">
                    SNBP
                  </th>
                  <th className="p-1 text-sm font-medium text-center border-e-2">
                    SNBT
                  </th>
                  <th className="p-1 text-sm font-medium text-center border-e-2">
                    Mandiri
                  </th>
                  <th className="p-1 text-sm font-medium text-center border-e-2">
                    Lainnya
                  </th>
                </tr>
              </thead>
              <TableBody>
                <tr className='border-b border-[#E2E8F0]'>
                  <td className='px-6 py-4 text-sm font-medium text-center'>1</td>
                  <td className='px-6 py-4 text-sm font-medium text-left'>Muhammad Alif</td>
                  <td className='px-6 py-4 text-sm font-medium text-center'>Psikologi</td>
                  <td className='px-6 py-4 text-sm font-medium text-center'>S1</td>
                  <td className='px-6 py-4 text-sm font-medium text-center'>✓</td>
                  <td className='px-6 py-4 text-sm font-medium text-center'>✓</td>
                  <td className='px-6 py-4 text-sm font-medium text-center'>✓</td>
                  <td className='px-6 py-4 text-sm font-medium text-center'>✓</td>
                </tr>

                {/* <TableNotFound /> */}
                {/* {loading || !education_units ? (
                  <EducationUnitTableSkeleton />
                ) : isEmpty(education_units) ? (
                  <TableNotFound />
                ) : education_units?.map((educationUnit, idx) => {
                  const number = idx + pagination?.from!

                  return (
                    <EducationUnitTableItem
                      key={`education-unit-table-item-${idx}`}
                      number={number}
                      educationUnit={educationUnit}
                    />
                  )
                })} */}
              </TableBody>
            </TableWrapper>
            {/* <TablePagination
              goNextPage={goNextPage}
              goPrevPage={goPrevPage}
              perPage={pagination?.per_page ?? 10}
              total={pagination?.total ?? 10}
              pageLimit={pageLimit}
              setPageLimit={(limit) => setPageLimit(limit)}
              currentPage={currentPage}
              lastPage={pagination?.last_page || 1}
            /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OverseasUniversityTable