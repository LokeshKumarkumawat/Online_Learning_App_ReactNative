import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, constants, FONTS, icons, SIZES, theme} from '../constants';
import TextButton from './TextButton';
import LineDivier from './LineDivier';
import TwoPointSlider from './TwoPointSlider';
import { useSelector } from 'react-redux';

const ClassTypeOption = ({containerStyle, classType, isSelected, onPress}) => {
  const theme = useSelector(state => state.theme);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? theme.appMode?.backgroundColor2 :theme.appMode?.backgroundColor8,
        ...containerStyle,
      }}>
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />

      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
        }}>
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};

const ClassLevelOption = ({
  containerStyle,
  classLevel,
  isLastItem,
  isSelected,
  onPress,
}) => {
  const theme = useSelector(state => state.theme);
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          ...containerStyle,
        }}
        onPress={onPress}>
        <Text
          style={{
            flex: 1,
            ...FONTS.body3,
            color:theme.appMode?.textColor
          }}>
          {classLevel.label}
        </Text>


        <Image
          source={isSelected ? icons.checkbox_on : icons.checkbox_off}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>

      {!isLastItem && (
        <LineDivier
          lineStyle={{
            height: 1,
          }}
        />
      )}
    </>
  );
};

const FilterModal = ({filterModalSharedValue1, filterModalSharedValue2}) => {
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedClassLevel, setSelectedClassLevel] = useState('');
  const [selectedCreateWithin, setSelectedCreateWithin] = useState('');

  const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue1.value,
        [SIZES.height, 0],
        [0, 1],
      ),
      transform: [
        {
          translateY: filterModalSharedValue1.value,
        },
      ],
    };
  });

  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1],
      ),
    };
  });

  const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1],
      ),
      transform: [
        {
          translateY: filterModalSharedValue2.value,
        },
      ],
    };
  });


  const renderFooter = () =>(
    <View
    style={{
        flexDirection:'row',
        height:50,
        marginBottom:20,
        marginTop:10,
        paddingHorizontal:SIZES.padding
    }}
    >
        {/* Reset */}
        <TextButton
        label="Reset"
        contentContainerStyle={{
            flex:1,
            borderRadius:SIZES.radius,
            borderWidth:1,
            backgroundColor:theme.appMode?.backgroundColor1
        }}
        labelStyle={{
            color:theme.appMode.textColor,
            ...FONTS.h3
        }}
        />

        {/* Apply */}

        <TextButton
        label="Apply"
        contentContainerStyle={{
            flex:1,
            marginLeft: SIZES.radius,
            borderRadius:SIZES.radius,
            borderWidth:2,
            borderColor:COLORS.primary,
            backgroundColor:COLORS.primary,
        }}
        labelStyle={{
            color:theme.appMode?.textColor1,
            ...FONTS.h3
        }}
        />


    </View>
  )


  const theme = useSelector(state => state.theme);



  return (
    //   {/* Main Container */}
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
        },
        filterModalContainerAnimatedStyle,
      ]}>
      {/* Background Container */}
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBgAnimatedStyle,
        ]}>
        {/* Content Container */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              height: SIZES.height * 0.9,
              width: SIZES.width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: theme.appMode?.backgroundColor1,
            },
            filterModalContentAnimatedStyle,
          ]}>
          {/* Header */}
          <View
            style={{
               marginVertical: SIZES.padding /3,
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding,
            }}>
            <View
              style={{
                width: 60,
              }}
            />
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                ...FONTS.h1,
                color:theme.appMode?.textColor
              }}>
              Filter
            </Text>
            <TextButton
              label="Close"
              contentContainerStyle={{
                width: 60,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.additionalColor13,
              }}
              labelStyle={{
                color: COLORS.black,
                ...FONTS.body3,
              }}
              onPress={() => {
                filterModalSharedValue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });
                filterModalSharedValue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, {
                    duration: 100,
                  }),
                );
              }}
            />
          </View>

          {/* Content */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
            }}>
            {/* ClassType */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color:theme.appMode?.textColor
                }}>
                Class Type
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.radius,
                }}>
                {constants.class_types.map((item, index) => {
                  return (
                    <ClassTypeOption
                      key={`ClassType-${index}`}
                      classType={item}
                      isSelected={selectedClassType == item?.id}
                      containerStyle={{
                        marginLeft: index == 0 ? 0 : SIZES.base,
                      }}
                      onPress={() => {
                        setSelectedClassType(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>

            {/* CLass Level */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color:theme.appMode?.textColor
                }}>
                Class Level
              </Text>
              <View>
                {constants.class_levels.map((item, index) => {
                  return (
                    <ClassLevelOption
                      key={`ClassType-${index}`}
                      classLevel={item}
                      isLastItem={index == constants.class_levels.length - 1}
                      isSelected={selectedClassLevel == item?.id}
                      onPress={() => {
                        setSelectedClassLevel(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>
            {/* Created Within */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color:theme.appMode?.textColor
                }}>
                Created Within
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {constants.created_within.map((item, index) => {
                  return (
                    <TextButton
                      key={`CreatedWithin-${index}`}
                      label={item?.label}
                      contentContainerStyle={{
                        height: 45,
                        paddingHorizontal: SIZES.radius,
                        marginLeft: index % 3 == 0 ? 0 : SIZES.radius,
                        marginTop: SIZES.radius,
                        borderWidth: 1,
                        borderRadius: SIZES.radius,
                        borderColor: COLORS.gray20,
                        backgroundColor:
                          item?.id == selectedCreateWithin
                            ? COLORS.primary3
                            : null,
                      }}
                      labelStyle={{
                        color:
                          item?.id == selectedCreateWithin
                            ? COLORS.white
                            : theme.appMode?.textColor,
                        ...FONTS.body4,
                      }}
                      onPress={() => {
                        setSelectedCreateWithin(item.id);
                      }}
                    />
                  );
                })}
              </View>
            </View>

            {/* CLass Length */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}>
              <Text
                style={{
                  ...FONTS.h3,
                  color:theme.appMode?.textColor
                }}>
                Created Within
              </Text>

              <View
                style={{
                  alignItems: 'center',
                }}>
                <TwoPointSlider
                  values={[20, 50]}
                  min={15}
                  max={60}
                  postfix="min"
                  onValuesChange={values => console.log(values)}
                />
              </View>
            </View>
          </ScrollView>
{/* Footer */}
{renderFooter()}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({});
