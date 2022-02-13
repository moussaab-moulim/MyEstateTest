/* eslint-disable react-native/no-inline-styles */
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { ScaledSheet, vs, s } from 'react-native-size-matters/extend'
import React from 'react'
import { Property } from '@/Services/modules/properties'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux'
import { selectProperty } from '@/Store/Properties'
import { navigate } from '@/Navigators/utils'

interface PropertyBoxProps {
  property: Property
}
const PropertyBox = ({ property }: PropertyBoxProps) => {
  const dispatch = useDispatch()

  const handlePropertyClick = () => {
    dispatch(selectProperty({ currentProperty: property }))
    navigate('Property')
  }
  console.log('image===>', property.images)
  return (
    <TouchableOpacity
      style={[styles.boxContainer]}
      onPress={handlePropertyClick}
    >
      <View style={[styles.innerRow, styles.backgroundRow]}>
        <ImageBackground
          source={{ uri: property.images[0].url }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={[styles.innerRow, styles.contentBox]}>
        <View style={[styles.contentRow]}>
          <Text
            style={{
              fontSize: s(20),
              fontWeight: '500',
              marginRight: s(14),
            }}
          >
            $ {property.price}
          </Text>
          <Text
            style={{
              fontSize: s(12),
              fontWeight: '500',
              opacity: 0.5,
            }}
          >
            {property.title}
          </Text>
        </View>
        <View style={[styles.contentRow]}>
          <Text
            style={{
              fontSize: s(12),
              fontWeight: 'normal',
              opacity: 0.5,
            }}
          >
            {property.adresse}
          </Text>
        </View>
        <View
          style={[
            {
              borderColor: '#fafbfc',
              borderBottomWidth: s(1),
              marginVertical: vs(11),
            },
          ]}
        />
        <View style={[styles.contentRow, { justifyContent: 'space-around' }]}>
          {property.features.map((feat: string, index: number) => (
            <Text
              key={index}
              style={{
                backgroundColor: '#3b5998',
                borderRadius: 10,
                fontSize: s(12),
                fontWeight: '500',
                opacity: 0.5,
                color: '#fff',
                paddingHorizontal: s(10),
                paddingVertical: vs(3),
              }}
            >
              {feat}
            </Text>
          ))}
        </View>
      </View>
      <View
        style={{
          width: s(30),
          height: s(30),
          backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 3 },
          shadowColor: '#000000',
          shadowOpacity: 0.16,
          shadowRadius: 0,
          elevation: 6,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          position: 'absolute',
          top: vs(145),
          left: s(280),
        }}
      >
        <Icon name="navigate" color="#3b5998" size={s(16)} />
      </View>
    </TouchableOpacity>
  )
}

export default PropertyBox

const styles = ScaledSheet.create({
  boxContainer: {
    height: '296@vs',
    width: '333@s',
    marginVertical: '23@vs',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexFlow: 'column nowrap',
  },
  innerRow: { flexDirection: 'column' },
  backgroundRow: {
    height: '163@vs',
    overflow: 'hidden',
    backgroundColor: '#919191',
    alignItems: 'center',
  },
  contentBox: {
    paddingHorizontal: '21@s',
    paddingVertical: '11@vs',
    height: '170@vs',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    resizeMode: 'cover',
  },
})
