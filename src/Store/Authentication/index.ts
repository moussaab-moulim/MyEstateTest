import { UserResponse } from '@/Services/modules/users'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'authentication',
  initialState: { isLogged: false, user: null } as AuthenticationState,
  reducers: {
    logIn: (state, { payload: { isLogged, user } }: AuthenticationPayload) => {
      if (typeof isLogged !== 'undefined') {
        state.isLogged = isLogged
      }
      if (typeof user !== 'undefined') {
        state.user = user
      }
    },
    // setDefaultTheme: (
    //   state,
    //   { payload: { isLogged, user } }: AuthenticationPayload,
    // ) => {
    //   if (!state.theme) {
    //     state.theme = theme
    //     state.darkMode = darkMode
    //   }
    // },
  },
})

export const { logIn } = slice.actions

export default slice.reducer

export type AuthenticationState = {
  isLogged: boolean | null | undefined
  user: UserResponse | null | undefined
}

type AuthenticationPayload = {
  payload: {
    isLogged: boolean | null | undefined
    user: UserResponse | null | undefined
  }
}
