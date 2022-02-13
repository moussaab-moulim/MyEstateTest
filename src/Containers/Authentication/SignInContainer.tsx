import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand, TextInput } from '@/Components'
import { useTheme } from '@/Hooks'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { Colors } from '@/Theme/Variables'
import { usernameValidator, passwordValidator } from '@/Components/Form/utils'
import { User, useSignInMutation } from '@/Services/modules/users'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Toast from 'react-native-toast-message'
import { AuthenticationState, logIn } from '@/Store/Authentication'

const SignInContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const [signIn, { data, isSuccess, isLoading, error }] = useSignInMutation()

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      return
    }
    const user: User = { username: username.value, password: password.value }
    signIn(user)
  }
  const onLoggedIn = ({ isLogged, user }: Partial<AuthenticationState>) => {
    dispatch(logIn({ isLogged, user }))
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('daata==>', data)
      onLoggedIn({
        isLogged: true,
        user: {
          username: data!.username,
          jwt: data!.jwt,
          expireAt: data!.expireAt,
          message: data!.message,
        },
      })
      navigateAndSimpleReset('Properties')
    }
    if (error) {
      console.log('error==>', error)
      if (error.data?.message?.toLowerCase().includes('successful')) {
        onLoggedIn({
          isLogged: true,
          user: {
            username: error.data!.username,
            jwt: error.data!.jwt,
            expireAt: error.data!.expireAt,
            message: error.data!.message,
          },
        })
        navigateAndSimpleReset('Properties')
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error',
          text2: error.error?.toLowerCase().includes('network')
            ? 'Network error, please try again'
            : error.data?.reason?.toLowerCase().includes('credentials')
            ? 'Wrong username or password'
            : 'Unknown error, please try again later',
        })
      }
    }

    return () => {}
  }, [data, isSuccess, isLoading, error])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }

  return (
    <ScrollView
      style={[Layout.fill, Layout.fullSize]}
      contentContainerStyle={[Layout.colCenter, Gutters.smallHPadding]}
    >
      <View
        style={[
          [Layout.colCenter, Gutters.smallHPadding, Gutters.largeBMargin],
        ]}
      >
        <Brand height={100} width={100} />
      </View>
      <View style={[Layout.fullWidth, Gutters.smallBMargin]}>
        <TextInput
          label="Username"
          errorText={
            username.error ? t(username.error, { field: 'username' }) : ''
          }
          inputProps={{
            value: username.value,
            onChangeText: (text: string) => {
              console.log('username===>', text)
              setUsername({ value: text, error: '' })
            },
            returnKeyType: 'next',
            autoCapitalize: 'none',
            autoComplete: 'username',
            editable: !isLoading,
          }}
        />
      </View>
      <View style={[Layout.fullWidth, Gutters.smallBMargin]}>
        <TextInput
          label="Password"
          errorText={
            password.error
              ? t(password.error.split('||')[0], { field: 'password' }) +
                ' ' +
                t(password.error.split('||')[1])
              : ''
          }
          inputProps={{
            returnKeyType: 'done',
            value: password.value,
            onChangeText: text => setPassword({ value: text, error: '' }),
            secureTextEntry: true,
          }}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <TouchableOpacity
            style={[Common.button.base, Gutters.regularBMargin]}
            onPress={onLoginPressed}
          >
            <Text style={[Fonts.textRegular, { color: Colors.white }]}>
              Sign in
            </Text>
          </TouchableOpacity>
          <Text
            style={[Fonts.textCenter, Fonts.textSmall, Gutters.tinyBMargin]}
          >
            Dont have an account ?
          </Text>
          <TouchableOpacity
            style={[Common.button.outline, Gutters.largeBMargin]}
            onPress={() => navigateAndSimpleReset('SignUp')}
          >
            <Text style={Fonts.textRegular}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default SignInContainer
