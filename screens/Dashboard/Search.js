import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useRef} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData,
  constants,
} from '../../constants';
import {
  CategoryCard,
  TextButton,
} from '../../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Shadow} from 'react-native-shadow-2';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Search = ()   => {
  const scrollViewRef = useRef();
  const navigation = useNavigation();

  
  const theme = useSelector(state => state.theme);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const renderTopSearch = () => (
    <View style={{marginTop: SIZES.padding}}>
      <Text style={{marginHorizontal: SIZES.padding, ...FONTS.h2 , color:theme.appMode?.textColor}}>
        Top Searches
      </Text>

      <FlatList
        horizontal
        data={dummyData.top_searches}
        listKey="TopSearches"
        keyExtractor={item => `TopSearches-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({item, index}) => (
          <TextButton
            label={item.label}
            contentContainerStyle={{
              paddingVertical: SIZES.radius,
              paddingHorizontal: SIZES.padding,
              marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index === dummyData.top_searches.length - 1 ? SIZES.padding : 0,
              borderRadius: SIZES.radius,
              backgroundColor: theme.appMode?.backgroundColor8,
            }}
            labelStyle={{
              color:theme.appMode?.textColor,
              ...FONTS.h3,
            }}
          />
        )}
      />
    </View>
  );

  const renderBrowseCategories = () => (
    <View style={{marginTop: SIZES.padding}}>
      <Text style={{marginHorizontal: SIZES.padding, ...FONTS.h2 ,color:theme.appMode?.textColor }}>
        Browse Categories
      </Text>

      <FlatList
        data={dummyData.categories}
        listKey="BrowseCategories"
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={item => `BrowseCategories-${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({item, index}) => (
          <CategoryCard
          sharedElementPrefix="Search"
            category={item}
            containerStyle={{
              height: 114,
              width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
              marginTop: SIZES.radius,
              marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding,
            }}
            onPress={() => navigation.navigate('CourseListing',{category:item , sharedElementPrefix:"Search"})}
          />
        )}
      />
    </View>
  );

  const renderSearchBar = () => {
    const inputRange = [0, 55];
    const searchBarAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [55, 0],
          Extrapolate.CLAMP,
        ),
        opacity: interpolate(
          scrollY.value,
          inputRange,
          [1, 0],
          Extrapolate.CLAMP,
        ),
      };
    });
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
            height: 50,
          },
          searchBarAnimatedStyle,
        ]}>
        <Shadow>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              width: SIZES.width - SIZES.padding * 2,
              paddingHorizontal: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor:theme.appMode?.backgroundColor3
            }}>
            <Image
              source={icons.search}
              style={{
                width: 25,
                height: 25,
                tintColor: COLORS.gray40,
              }}
            />

            <TextInput
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                ...FONTS.h4,
                color:theme.appMode?.textColor6
              }}
              // value=""
              placeholder="Search for Topics, Courses & Educa..."
              placeholderTextColor={theme.appMode?.textColor6}
            />
          </View>
        </Shadow>
      </Animated.View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor:theme.appMode?.backgroundColor1}}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{marginTop: 100, paddingBottom: 250}}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        onScrollEndDrag={(event) =>{
          if(event.nativeEvent.contentOffset.y > 10 && event.nativeEvent.contentOffset.y <50){
            scrollViewRef.current?.scrollTo({
              x:0,
              y:60,
              animated:true
            })
          }
        }}
      >
        {/* Top Searches */}
        {renderTopSearch()}

        {/* Browse Categories */}
        {renderBrowseCategories()}
      </Animated.ScrollView>
      {/* Search Bar */}
      {renderSearchBar()}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
