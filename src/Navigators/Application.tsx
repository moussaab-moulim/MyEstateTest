import React from 'react'
import { Button, SafeAreaView, StatusBar, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StartupContainer } from '@/Containers'
import { useTheme } from '@/Hooks'
import { navigateAndSimpleReset, navigationRef } from './utils'
import { SignInContainer, SignUpContainer } from '@/Containers/Authentication'
import {
  PropertiesContainer,
  PropertySingleContainer,
} from '@/Containers/Properties'
import { useDispatch } from 'react-redux'
import { logIn } from '@/Store/Authentication'

const Stack = createStackNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(logIn({ isLogged: false, user: null }))
    navigateAndSimpleReset('SignIn')
  }
  return (
    <SafeAreaView style={[Layout.fill, { backgroundColor: colors.card }]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Startup" component={StartupContainer} />
          <Stack.Screen
            name="SignIn"
            component={SignInContainer}
            options={{
              title: 'Sign In',
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpContainer}
            options={{
              title: 'Sign Up',
            }}
          />
          <Stack.Screen
            name="Properties"
            component={PropertiesContainer}
            options={{
              animationEnabled: false,
              headerRight: () => (
                <View style={{ marginRight: 20 }}>
                  <Button color="#3b5998" onPress={logOut} title="Log out" />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="Property"
            component={PropertySingleContainer}
            options={{
              animationEnabled: false,
              headerRight: () => (
                <View style={{ marginRight: 20 }}>
                  <Button color="#3b5998" onPress={logOut} title="Log out" />
                </View>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
