import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS, icons, SIZES} from '../constants';
import {useSelector} from 'react-redux';

const ProfileValue = ({icon, label, value, onPress}) => {
  const theme = useSelector(state => state.theme);
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', height: 80, alignItems: 'center'}}
      onPress={onPress}>
      {/* Icon */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: theme.appMode?.backgroundColor3,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
          }}
        />
      </View>
      {/* Lable & Value */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}>
        {label && (
          <Text style={{color: COLORS.gray30, ...FONTS.body3}}>{label}</Text>
        )}
        <Text style={{...FONTS.h3 , color:theme.appMode?.textColor}}>{value}</Text>
      </View>
      {/* Icon */}
      <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
          tintColor:theme.appMode?.tintColor
        }}
      />
    </TouchableOpacity>
  );
};

export default ProfileValue;

const styles = StyleSheet.create({});
