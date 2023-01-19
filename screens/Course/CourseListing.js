import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {COLORS, dummyData, FONTS, icons, images, SIZES} from '../../constants';
import {SharedElement} from 'react-navigation-shared-element';
import {
  FilterModal,
  HorizontalCourseCard,
  IconButton,
  LineDivier,
} from '../../components';
import { useSelector } from 'react-redux';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Header_Height = 250;

const CourseListing = ({navigation, route}) => {
  const {category, sharedElementPrefix} = route.params;
  const theme = useSelector(state => state.theme);

  const flatListRef = useRef();
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const headerSharedValue = useSharedValue(80);
  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

  const BackHandler = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    const inputRange = [0, Header_Height - 50];

    headerSharedValue.value = withDelay(500, withTiming(0, {duration: 500}));

    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
      };
    });

    const headerTranslatedAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: headerSharedValue.value,
          },
        ],
      };
    });

    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [Header_Height, 120],
          Extrapolate.CLAMP,
        ),
      };
    });

    const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [0, 200],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });

    const headerShowonScrollAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 130],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 250,
            overflow: 'hidden',
          },
          headerHeightAnimatedStyle,
        ]}>
        {/* BackgroundImage */}
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}>
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>
        {/* Title */}

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -80,
              left: 0,
              right: 0,
            },
            headerShowonScrollAnimatedStyle,
          ]}>
          <Text style={{textAlign: 'center', color: COLORS.white, ...FONTS.h2}}>
            {category?.title}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 70,
              left: 30,
            },
            headerHideOnScrollAnimatedStyle,
          ]}>
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}>
            <Text
              style={{position: 'absolute', color: COLORS.white, ...FONTS.h1}}>
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>
        {/* Back */}
        <Animated.View style={headerFadeAnimatedStyle}>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              position: 'absolute',
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              if (scrollY.value > 0 && scrollY.value <= 200) {
                flatListRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true,
                });

                setTimeout(() => {
                  headerSharedValue.value = withTiming(
                    80,
                    {duration: 500},
                    () => {
                      runOnJS(BackHandler)();
                    },
                  );
                }, 100);
              } else {
                BackHandler();
              }

              // BackHandler()
            }}
          />
        </Animated.View>

        {/* CategoryImage */}
        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={[
            {
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerFadeAnimatedStyle,
            headerTranslatedAnimatedStyle,
            headerHideOnScrollAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  };

  const renderResult = () => (
    <Animated.FlatList
      ref={flatListRef}
      data={dummyData.courses_list_2}
      keyExtractor={item => `Results-${item.id}`}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding,
      }}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      keyboardDismissMode="on-drag"
      onScroll={onScroll}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 270,
            marginBottom: SIZES.base,
          }}>
          {/* Results */}
          <Text style={{flex: 1, ...FONTS.body3 , color:theme.appMode?.textColor}}>5,786 Results</Text>
          {/* FilterButton */}
          <IconButton
            icon={icons.filter}
            iconStyle={{
              width: 20,
              height: 20,
            }}
            containerStyle={{
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => {
              filterModalSharedValue1.value = withTiming(0, {
                duration: 100,
              });
              filterModalSharedValue2.value = withTiming(0, {
                duration: 500,
              });
            }}
          />
        </View>
      }
      renderItem={({item, index}) => (
        <HorizontalCourseCard
          course={item}
          containerStyle={{
            marginVertical: SIZES.padding,
            marginTop: index == 0 ? SIZES.radius : SIZES.padding,
          }}
          onPress={() =>
            navigation.navigate('CourseDetails', {selectedCourse: item})
          }
        />
      )}
      ItemSeparatorComponent={() => (
        <LineDivier lineStyle={{backgroundColor: COLORS.gray20}} />
      )}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.appMode?.backgroundColor1,}}>
      {/* Result */}
      {renderResult()}

      {/* Header */}
      {renderHeader()}

      {/* Filter Modal */}
      <FilterModal
        filterModalSharedValue1={filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
      />
    </View>
  );
};

CourseListing.sharedElements = (route, otherRoute, showing) => {
  if (otherRoute.name === 'Dashboard') {
    const {category, sharedElementPrefix} = route.params;
    return [
      {
        id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
      },
      {
        id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
      },
    ];
  }
};

export default CourseListing;

const styles = StyleSheet.create({});