import { Property } from '@/Services/modules/properties'
import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'properties',
  initialState: { currentProperty: null, allProperties: [] } as PropertiesState,
  reducers: {
    setProperties: (
      state,
      { payload: { allProperties } }: PropertiesPayload,
    ) => {
      if (allProperties && allProperties?.length > 0) {
        state.allProperties = allProperties
      }
    },
    selectProperty: (
      state,
      { payload: { currentProperty } }: PropertyPayload,
    ) => {
      if (currentProperty) {
        state.currentProperty = currentProperty
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

export const { setProperties, selectProperty } = slice.actions

export default slice.reducer

export type PropertiesState = {
  currentProperty: Property | null | undefined
  allProperties: Property[] | null | undefined
}

type PropertiesPayload = {
  payload: {
    allProperties: Property[] | null | undefined
  }
}
type PropertyPayload = {
  payload: {
    currentProperty: Property | null | undefined
  }
}
