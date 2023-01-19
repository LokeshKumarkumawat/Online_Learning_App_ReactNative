import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import IconLabel from './IconLabel';
import { useSelector } from 'react-redux';

const HorizontalCourseCard = ({containerStyle, course ,onPress}) => {
  const theme = useSelector(state => state.theme);
  return (
    <TouchableOpacity style={{flexDirection: 'row', ...containerStyle}} onPress={onPress}>
      {/* Thumbnail */}
      <ImageBackground
        source={course.thumbnail}
        resizeMode="cover"
        style={{
          width: 120,
          height: 120,
          marginBottom: SIZES.radius,
        }}
        imageStyle={{borderRadius: SIZES.radius}}>
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 23,
            height: 23,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: COLORS.white,
          }}>
          <Image
            source={icons.favourite}
            resizeMode="contain"
            style={{
              width: 16,
              height: 16,
              tintColor: course.is_favorite
                ? COLORS.secondary
                : COLORS.additionalColor4,
            }}
          />
        </View>
      </ImageBackground>
      {/* Details */}
      <View style={{flex: 1, marginLeft: SIZES.base}}>
        {/* Title */}
        <Text style={{...FONTS.h3, fontSize: 18 ,  color:theme.appMode?.textColor}}>{course.title}</Text>

        {/* Instructor & Duration */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.bash,
          }}>
          <Text style={{...FONTS.body4,  color:theme.appMode?.textColor}}>By {course.instructor}</Text>
          <IconLabel
            icon={icons.time}
            label={course.duration}
            containerStyle={{marginLeft: SIZES.base}}
            iconStyle={{width: 15, height: 15}}
            labelStyle={{...FONTS.body4}}
          />
        </View>

        {/* Price & Rating */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.base,
          }}>
          <Text style={{...FONTS.h2, color: COLORS.primary}}>
            ${course.price.toFixed(2)}
          </Text>
          <IconLabel
            icon={icons.star}
            label={course.ratings}
            containerStyle={{marginLeft: SIZES.base}}
            iconStyle={{width: 15, height: 15, tintColor: COLORS.primary2}}
            labelStyle={{marginLeft: 5, color:theme.appMode?.textColor, ...FONTS.h3}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCourseCard;

const styles = StyleSheet.create({});
