import { api } from '../../api'
import { signIn, signUp } from './authentication'
import fetchOne from './fetchOne'

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOne: fetchOne(build),
    signIn: signIn(build),
    signUp: signUp(build),
  }),
  overrideExisting: false,
})

export const {
  useLazyFetchOneQuery,
  useSignUpMutation,
  useSignInMutation,
} = userApi

export interface User {
  username: string
  email?: string
  password?: string
}

export interface UserResponse extends User {
  message: string
  jwt: string
  expireAt: any
}
