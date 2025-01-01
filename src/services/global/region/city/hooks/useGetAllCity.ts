/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '@lib/axios-instance'
import useSWR, { type Fetcher } from 'swr'
import Cookies from 'js-cookie'
import { IGetAllCityResponse } from '../interfaces/get-all-city.types'

export default function useGetAllCity() {
  const tokenType = Cookies.get('token-student')
    ? 'student' : Cookies.get('token-school')
    ? 'school' : Cookies.get('token-agency') 
    ? 'agency' : 'admin'

  const fetcher: Fetcher<IGetAllCityResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data)

  const { data, error } = useSWR('/region/cities', fetcher)

  return {
    loading: !data && !error,
    cities: data?.cities,
    error,
  }
}
