import { useTheme } from '@/Hooks'
import React from 'react'
import { View, Text, TextInput, TextInputProps } from 'react-native'

interface CustomProps {
  errorText?: string
  description?: string
  label?: string
  inputProps: TextInputProps
}

const CustomTextInput = ({
  errorText,
  description,
  label,
  inputProps,
}: CustomProps) => {
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const props = inputProps
  return (
    <View style={[Layout.colCenter, Gutters.smallHPadding, Layout.fullWidth]}>
      {label && (
        <Text style={[Fonts.textCenter, Fonts.textSmall]}>{label}</Text>
      )}
      <TextInput
        style={[Common.textInput, Layout.fullWidth]}
        underlineColorAndroid="transparent"
        {...props}
      />
      {description && !errorText ? (
        <Text style={Fonts.textSmall}>{description}</Text>
      ) : null}
      {errorText ? <Text style={Fonts.textError}>{errorText}</Text> : null}
    </View>
  )
}
export default CustomTextInput
