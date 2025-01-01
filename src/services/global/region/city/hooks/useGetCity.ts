/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosInstance from '@lib/axios-instance'
import useSWR, { type Fetcher } from 'swr'
import Cookies from 'js-cookie'
import { IGetCityResponse } from '../interfaces/get-city.types'

export default function useGetCity(cityId: string) {
  const tokenType = Cookies.get('token-student')
    ? 'student' : Cookies.get('token-school')
    ? 'school' : Cookies.get('token-agency') 
    ? 'agency' : 'admin'


  const fetcher: Fetcher<IGetCityResponse, string> = (url) =>
    axiosInstance({ withToken: true, tokenType })
      .get(url)
      .then((res) => res.data)

  const { data, error } = useSWR(`/region/cities/${cityId}`, fetcher)

  return {
    loading: !data && !error,
    city: data?.city,
    error,
  }
}
