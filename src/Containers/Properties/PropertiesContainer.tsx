import React, { useEffect } from 'react'
import { View, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch } from 'react-redux'

import { useTheme } from '@/Hooks'

import { s } from 'react-native-size-matters/extend'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Toast from 'react-native-toast-message'
import { useLazyFetchAllQuery } from '@/Services/modules/properties'
import { logIn } from '@/Store/Authentication'
import { setProperties } from '@/Store/Properties'
import useProperties from '@/Hooks/useProperties'
import { PropertyBox } from '@/Components/PropertyBox'

const SignInContainer = () => {
  const { Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const { allProperties } = useProperties()

  const [
    fetchAll,
    { data, isSuccess, isLoading, error, isError },
  ] = useLazyFetchAllQuery()

  useEffect(() => {
    if (!isSuccess && !isError && !isLoading) {
      fetchAll()
    }
    if (isSuccess) {
      console.log('daata===>', data?.count)
      //navigateAndSimpleReset('Main')
      dispatch(setProperties({ allProperties: data?.response }))
    }
    if (isError) {
      console.log('error==>', error)
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: error.data?.message?.includes('token')
          ? 'login expired'
          : error.data?.message,
        onHide: () => {
          if (
            error.data?.message?.includes('token') ||
            error.data?.includes('token')
          ) {
            dispatch(logIn({ isLogged: false, user: null }))
            navigateAndSimpleReset('SignIn')
          }
        },
      })
    }
    return () => {}
  }, [isSuccess, isError])

  return (
    <ScrollView
      style={[Layout.fill, Layout.fullSize]}
      contentContainerStyle={[Layout.colCenter, { paddingHorizontal: s(21) }]}
    >
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={[Layout.fullWidth, Gutters.smallBMargin]}>
          {allProperties?.map((pro, index) => (
            <PropertyBox key={index} property={pro} />
          ))}
        </View>
      )}
    </ScrollView>
  )
}

export default SignInContainer
