/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent } from 'react'

export interface Props {
  goNextPage: () => void
  goPrevPage: () => void
  setPageLimit?: (limit: number) => void
  setPageNum?: (limit: number) => void
  perPage?: number
  total?: number
  pageLimit?: number
  currentPage?: number
  lastPage?: number | any
}

const TablePagination: FunctionComponent<Props> = ({
  goNextPage,
  goPrevPage,
  perPage,
  total,
  pageLimit,
  setPageLimit,
  setPageNum,
  currentPage,
  lastPage,
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.floor(lastPage / 3); i++) {
    pageNumbers.push(i)
  }

  // let i = 1
  // while (i <= lastPage) {
  //   if (i <= 3 || i >= lastPage - 2) {
  //     pageNumbers.push(i)
  //     i++
  //   } else {
  //     pageNumbers.push(0)
  //     i = i < (currentPage as number) ? (currentPage as number) - 1 : lastPage - 2
  //   }
  // }

  () => setPageNum

  return (
    <div className="flex flex-wrap items-center justify-between w-full gap-2 md:gap-0">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-medium leading-4 md:text-base">Data ditampilkan {perPage} dari {total} data</h3>
        <select
          className="border rounded-lg p-1.5 bg-transparent"
          defaultValue={pageLimit?.toString()}
          onChange={(e) => (setPageLimit ? setPageLimit(Number(e.target.value)) : null)}
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center justify-center">
        <nav className="flex space-x-2" aria-label="Pagination">
          <button
            type='button'
            className={`${currentPage === 1 ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed' : 'bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white cursor-pointer'} relative inline-flex items-center px-4 py-2 text-sm font-semibold leading-5 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
            onClick={goPrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* {pageNumbers.map((pageNumber, idx) => {
            const isActive = currentPage === pageNumber

            return (
              <button
                key={`pagination-number-${idx}`}
                type='button'
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer leading-5 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 ${isActive ? 'bg-[#3B82F6] text-white' : 'bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white'}`}
                onClick={() => (setPageNum ? setPageNum(pageNumber) : null)}
              >
                {pageNumber}
             </button>
            )
          })} */}

          {/* <button type='button' className="relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white cursor-pointer leading-5 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
            1
          </button>
          
          <button type='button' className="relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white cursor-pointer leading-5 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
            2
          </button>
          
          <button type='button' className="relative inline-flex items-center px-4 py-2 text-sm font-semibold bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white cursor-pointer leading-5 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10">
            3
          </button> */}
          
          <button
            type='button'
            className={`${currentPage === lastPage ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed' : 'bg-[#EFF6FF] hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white cursor-pointer'} relative inline-flex items-center px-4 py-2 text-sm font-semibold leading-5 rounded-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10`}
            onClick={goNextPage}
            disabled={currentPage === lastPage}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  )
}

export default TablePagination