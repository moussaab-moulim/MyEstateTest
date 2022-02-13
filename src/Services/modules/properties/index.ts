import { api } from '../../api'
import fetchAll from './fetchAll'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAll: fetchAll(build),
  }),
  overrideExisting: true,
})

export const { useLazyFetchAllQuery } = userApi

export interface Property {
  id: number
  title: string
  description: string
  features: string[]
  images: [
    {
      url: string
      alt: string
    },
  ]
  adresse: string
  price: number
  type: string
  size: number
}
