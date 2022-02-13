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
import {
  usernameValidator,
  passwordValidator,
  repasswordValidator,
} from '@/Components/Form/utils'
import {
  User,
  useSignInMutation,
  useSignUpMutation,
} from '@/Services/modules/users'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import Toast from 'react-native-toast-message'
import { AuthenticationState, logIn } from '@/Store/Authentication'

const SignInContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [username, setUsername] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [repassword, setRePassword] = useState({ value: '', error: '' })
  const [signUp, { data, isSuccess, isLoading, error }] = useSignUpMutation()

  const onSignUpPressed = () => {
    const usernameError = usernameValidator(username.value)
    const passwordError = passwordValidator(password.value)
    const repasswordError = repasswordValidator(
      repassword.value,
      password.value,
    )
    if (usernameError || passwordError || repasswordError) {
      setUsername({ ...username, error: usernameError })
      setPassword({ ...password, error: passwordError })
      setRePassword({ ...repassword, error: repasswordError })
      return
    }
    const user: User = {
      username: username.value,
      password: password.value,
      email: '',
    }
    console.log('user ===>', user)
    signUp(user)
  }
  const onSignedUp = ({ isLogged, user }: Partial<AuthenticationState>) => {
    dispatch(logIn({ isLogged, user }))
  }
  useEffect(() => {
    if (isSuccess) {
      console.log('daata==>', data)
      onSignedUp({
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
        onSignedUp({
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
            : 'Unable to register the user, please try again later',
        })
      }
    }

    return () => {}
  }, [data, isSuccess, isLoading, error])

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
      <View style={[Layout.fullWidth, Gutters.smallBMargin]}>
        <TextInput
          label="Repeat Password"
          errorText={
            repassword.error ? t(repassword.error, { field: 'repassword' }) : ''
          }
          inputProps={{
            returnKeyType: 'done',
            value: repassword.value,
            onChangeText: text => setRePassword({ value: text, error: '' }),
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
            onPress={onSignUpPressed}
          >
            <Text style={[Fonts.textRegular, { color: Colors.white }]}>
              Create Account
            </Text>
          </TouchableOpacity>
          <Text
            style={[Fonts.textCenter, Fonts.textSmall, Gutters.tinyBMargin]}
          >
            already have an account ?
          </Text>
          <TouchableOpacity
            style={[Common.button.outline, Gutters.largeBMargin]}
            onPress={() => navigateAndSimpleReset('SignIn')}
          >
            <Text style={Fonts.textRegular}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default SignInContainer
