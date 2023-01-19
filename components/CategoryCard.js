import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';
import {SharedElement} from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';

const CategoryCard = ({
  sharedElementPrefix,
  category,
  containerStyle,
  onPress,
}) => {

  const theme = useSelector(state => state.theme);
  return (
    <TouchableOpacity
      style={{
        height: 150,
        width: 200,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Image Background */}
      <SharedElement
        id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
        style={[StyleSheet.absoluteFillObject]}>
        <Image
          source={category?.thumbnail}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
            borderRadius: SIZES.radius,
          }}
        />
      </SharedElement>
      {/* Title */}
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 5,
        }}>
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Text style={{position:'absolute',color: COLORS.white, ...FONTS.h2}}>
            {category?.title}
          </Text>
        </SharedElement>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
