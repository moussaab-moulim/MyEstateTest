/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useRef, useState } from 'react'
import useProperties from '@/Hooks/useProperties'
import { useTheme } from '@/Hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import Carousel from 'react-native-snap-carousel'
import { ScaledSheet, vs, s } from 'react-native-size-matters/extend'

const PropertySingleContainer = () => {
  const { Layout, Gutters } = useTheme()
  const { currentProperty } = useProperties()
  const carouserlRef = useRef(null)
  const [currentImage, setCurrentImage] = useState(currentProperty?.images[0])

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => setCurrentImage(item)}
        style={styles.itemContainer}
      >
        <ImageBackground
          source={{ uri: item!.url }}
          resizeMode="cover"
          style={[Layout.fullWidth, styles.image]}
        />
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView
      style={[Layout.fill, Layout.fullSize]}
      contentContainerStyle={[Layout.colCenter]}
    >
      <View
        style={[
          Layout.fullWidth,
          Gutters.smallBMargin,
          //{ paddingHorizontal: s(21) },
        ]}
      >
        <View style={[styles.innerRow, styles.imageContainer]}>
          <ImageBackground
            source={{ uri: currentImage!.url }}
            resizeMode="cover"
            style={[Layout.fullWidth, styles.image]}
          >
            <View style={styles.overlayView} />
            <View style={[styles.innerRow, styles.contentBox]}>
              <View style={[styles.contentRow]}>
                <Text
                  style={{
                    fontSize: s(20),
                    fontWeight: '500',
                    marginRight: s(14),
                    color: '#fff',
                  }}
                >
                  $ {currentProperty!.price}
                </Text>
                <Text
                  style={{
                    fontSize: s(12),
                    fontWeight: '500',
                    color: '#fff',
                  }}
                >
                  {currentProperty!.title}
                </Text>
              </View>
              <View style={[styles.contentRow]}>
                <Text
                  style={{
                    fontSize: s(12),
                    fontWeight: 'normal',
                    color: '#fff',
                  }}
                >
                  {currentProperty!.adresse}
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
              <View
                style={[styles.contentRow, { justifyContent: 'space-around' }]}
              >
                {currentProperty!.features.map(
                  (feat: string, index: number) => (
                    <Text
                      key={index}
                      style={{
                        backgroundColor: '#3b5998',
                        borderRadius: 10,
                        fontSize: s(12),
                        fontWeight: '500',
                        color: '#fff',
                        paddingHorizontal: s(10),
                        paddingVertical: vs(3),
                      }}
                    >
                      {feat}
                    </Text>
                  ),
                )}
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
                top: vs(320),
                left: s(330),
              }}
            >
              <Icon name="navigate" color="#3b5998" size={s(16)} />
            </View>
          </ImageBackground>
        </View>
        <View>
          <Carousel
            ref={carouserlRef}
            data={currentProperty?.images!}
            renderItem={renderItem}
            sliderWidth={s(335)}
            itemWidth={s(112)}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={'start'}
            containerCustomStyle={styles.carouselContainer}
            activeAnimationType={'spring'}
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
              toValue: 0,
              useNativeDriver: true,
            }}
          />
        </View>
        <View style={[Layout.fullWidth, styles.descriptionContainer]}>
          <Text style={styles.title}>Features</Text>
          {currentProperty?.features.map((feat, inddex) => (
            <Text key={inddex}>{feat}</Text>
          ))}
          <Text style={styles.title}>Description</Text>
          <Text>{currentProperty?.description}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default PropertySingleContainer

const styles = ScaledSheet.create({
  imageContainer: {
    height: '440@vs',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#919191',
    flexFlow: 'column nowrap',
  },
  innerRow: { flexDirection: 'column' },
  contentBox: {
    paddingHorizontal: '21@s',
    paddingVertical: '21@vs',
    height: '150@vs',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    resizeMode: 'cover',
  },
  overlayView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  descriptionContainer: {
    paddingHorizontal: '21@s',
    marginVertical: '15@vs',
  },
  title: {
    fontSize: s(20),
    fontWeight: '500',
    color: '#000',
    marginVertical: vs(18),
  },
  text: {
    fontSize: s(14),
    fontWeight: 'normal',
    color: '#000',
    opacity: 0.5,
  },
  carouselContainer: {
    marginLeft: vs(21),
    marginTop: vs(15),
    overflow: 'visible',
  },
  itemContainer: {
    width: s(102),
    height: vs(121),
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
