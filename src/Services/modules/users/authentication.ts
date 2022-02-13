import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { User, UserResponse } from '.'

export const signIn = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<UserResponse, Partial<User>>({
    query: body => ({
      url: '/authentication/signIn/',
      method: 'POST',
      body,
    }),
  })

export const signUp = (build: EndpointBuilder<any, any, any>) =>
  build.mutation<UserResponse, Partial<User>>({
    query: body => ({
      url: '/authentication/signUp/',
      method: 'POST',
      body,
    }),
  })
