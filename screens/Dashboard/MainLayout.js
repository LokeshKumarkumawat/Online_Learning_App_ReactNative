import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {Home, Profile, Search} from '../../screens';
import {COLORS, SIZES, FONTS, constants} from '../../constants';
import {createRef, useRef, useState, useEffect, useCallback} from 'react';
import {Shadow} from 'react-native-shadow-2';
import { useSelector } from 'react-redux';
// import { measure } from 'react-native-reanimated';

const bottom_tabs = constants.bottom_tabs.map(bottom_tab => ({
  ...bottom_tab,
  ref: createRef(),
}));

const TabIndictor = ({measureLayout, scrollX}) => {


    const inputRange = bottom_tabs.map((_,i) => i*SIZES.width)
    const tabIndictorWidth = scrollX.interpolate({
        inputRange,
        outputRange:measureLayout.map(measure => measure.width)
    })
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange:measureLayout.map(measure => measure.x)
    })


  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: tabIndictorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform:[{
            translateX
        }]
      }}
    />
  );
};

const Tabs = ({scrollX ,onBottomTabPress}) => {
  const containerRef = useRef();
  const [measureLayout, setMeasureLayout] = useState([]);
  useEffect(() => {
    let ml = [];

    bottom_tabs.forEach(bottom_tab => {
      bottom_tab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({x, y, width, height});
          if (ml.length === bottom_tabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View ref={containerRef} style={{flex: 1, flexDirection: 'row'}}>
      {/* Tab Indictor */}
      {measureLayout.length > 0 && (
        <TabIndictor measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {bottom_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`BottomTab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              paddingVertical: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() =>onBottomTabPress(index)}
            >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 25,
                hight: 25,
                flex: 0.5,
              }}
            />
            <Text
              style={{
                marginTop: 3,
                color: COLORS.white,
                ...FONTS.h3,
                flex: 0.5,
              }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainLayout = () => {
  const theme = useSelector(state => state.theme);
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;

  const onBottomTabPress = useCallback(bottomTabindex =>{
    flatListRef?.current?.scrollToOffset({
        offset:bottomTabindex * SIZES.width
    })
  })

  const renderContent = () => (
    <View style={{flex: 1}}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        data={constants.bottom_tabs}
        keyExtractor={item => `Main-${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          return (
            <View style={{height: SIZES.height, width: SIZES.width}}>
              {item.label == constants.screens.home && <Home />}
              {item.label == constants.screens.search && <Search />}
              {item.label == constants.screens.profile && <Profile />}
            </View>
          );
        }}
      />
    </View>
  );

  const renderBottomTab = () => {
    return (
      <View
        style={{
          paddingBottom: SIZES.height > 800 ? 20 :7,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor:theme.appMode?.backgroundColor1
        }}>
        <Shadow>
          <View
            style={{
              borderRadius: SIZES.radius,
              backgroundColor: theme.appMode?.backgroundColor2,
              width: SIZES.width - SIZES.padding * 2,
              height: 85,
            }}>
            {/* Tabs */}
            <Tabs scrollX={scrollX} onBottomTabPress={onBottomTabPress} />
          </View>
        </Shadow>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {/* Content */}
      {renderContent()}

      {/* Bottom Tab */}
      {renderBottomTab()}
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({});
