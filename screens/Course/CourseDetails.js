import {ImageBackground, StyleSheet, Text, TouchableOpacity, View,Animated} from 'react-native';
import React, {useState} from 'react';
import {COLORS, constants, dummyData, FONTS, icons, SIZES, theme} from '../../constants';
import {IconButton, LineDivier} from '../../components';
import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import CourseChapters from './CourseTabs/CourseChapters';
import CourseFiles from './CourseTabs/CourseFiles';
import CourseDiscussion from './CourseTabs/CourseDiscussion';
import { useSelector } from 'react-redux';


const course_details_tabs = constants.course_details_tabs.map(
    (course_details_tab) => ({
        ...course_details_tab,
        ref:React.createRef()
    })
)


const TabIndicator = ({measureLayout , scrollX}) =>{

    const  inputRange = course_details_tabs.map((_,i)=> i*SIZES.width)
    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure =>measure.width)
    })

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map(measure => measure.x)
    })


    return(
        <Animated.View
        style={{
            position: 'absolute',
            bottom:0,
            height:4,
            width:tabIndicatorWidth,
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.primary,
            transform:[{
                translateX
            }]
        }}
        >

        </Animated.View>
    )
}


const Tabs = ({scrollX, onTabPress}) =>{
    const [measureLayout , setMeasureLayout] = React.useState([])
    const containerRef = React.useRef()
    const theme = useSelector(state => state.theme);

    React.useEffect(()=>{
        let ml = []

        course_details_tabs.forEach(course_details_tab =>{
            course_details_tab?.ref?.current?.measureLayout(
                containerRef.current,
                (x,y,width,height) =>{
                    ml.push({
                        x,y,width,height
                    })

                    if(ml.length === course_details_tabs.length){
                        setMeasureLayout(ml)
                    }
                }
            )
        })
    })

    return(
        <View
        ref={containerRef}
        style={{
            flex:1,
            flexDirection:'row'
        }}
        >

            {/* Tab Indicator */}
            {measureLayout.length>0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX}  />}



            {/* Tabs */}
            {course_details_tabs.map((item, index) =>{
                return(
                    <TouchableOpacity
                    key={`Tab-${index}`}
                    ref={item.ref}
                    style={{
                        flex:1,
                        paddingHorizontal:15,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={(() =>{
                        onTabPress(index)
                    })}
                    >
                        <Text
                        style={{
                            ...FONTS.h3,
                            fontSize:SIZES.height > 800 ? 17 : 16,
                            color:theme.appMode?.textColor
                        }}
                        >
                            {item.label}
                        </Text>


                    </TouchableOpacity>
                )
            })}

        </View>    
    )
}



const CourseDetails = ({navigation, route}) => {
  const theme = useSelector(state => state.theme);
  const {selectedCourse} = route.params;
  const [playVideo, setPlayVideo] = useState(false);
  const flatListRef = React.useRef()
  const scrollX = React.useRef(new Animated.Value(0)).current

  const onTabPress = React.useCallback(tabIndex =>{
    flatListRef?.current?.scrollToOffset({
        offset:tabIndex *SIZES.width
    })
  })


  const renderHeaderBar = () => {
    if (playVideo) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.base,
            height: 85,
            backgroundColor: COLORS.black,
            alignItems: 'flex-end',
          }}>
          {renderHeaderComponents()}
        </View>
      );
    } else {
      return (
        <View
          style={{
            position: 'absolute',
            top: SIZES.height > 800 ? 40 : 20,
            left: 0,
            right: 0,
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            zIndex: 1,
          }}>
          {renderHeaderComponents()}
        </View>
      );
    }
  };

  const renderVideoSection = () => (
    <View
      style={{
        height: SIZES.height > 800 ? 200 : 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray90,
      }}>
      {/* Thumbnail */}
      <ImageBackground
        source={selectedCourse?.thumbnail}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {/* Paly Button */}
        <IconButton
          icon={icons.play}
          iconStyle={{
            width: 25,
            height: 25,
            tintColor: COLORS.white,
          }}
          containerStyle={{
            width: 55,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.padding,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          onPress={() => setPlayVideo(true)}
        />
      </ImageBackground>
      {playVideo && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: COLORS.black,
          }}>
          <YoutubePlayer height={300} play={true} videoId={'aOszrUn1VbM'} />
        </View>
        // <Video
        //   source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        //   controls={true}
        //   resizeMode="contain"
        //   style={{
        //     position: 'absolute',
        //     top: 0,
        //     left: 0,
        //     bottom: 0,
        //     right: 0,
        //     backgroundColor: COLORS.black,
        //   }}

        // />
      )}
    </View>
  );

  const renderHeaderComponents = () => (
    <>
      {/* Back */}
      <View
        style={{
          flex: 1,
        }}>
        <IconButton
          icon={icons.back}
          iconStyle={{
            width: 25,
            height: 25,
            tintColor: COLORS.black,
          }}
          containerStyle={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Share & Favourite*/}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <IconButton
          icon={icons.media}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          containerStyle={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <IconButton
          icon={icons.favourite_outline}
          iconStyle={{
            tintColor: COLORS.white,
          }}
          containerStyle={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    </>
  );

  const renderContent = () =>(
    <View
    style={{
        flex:1,
    }}
    >
        {/* Tabs */}
        <View
        style={{
            height:55,
        }}
        >
            <Tabs
            scrollX={scrollX}
            onTabPress={onTabPress}
            />

        </View>
        {/* Line Divider */}
        <LineDivier
        lineStyle={{
            backgroundColor:COLORS.gray20
        }}
        />

        {/* Content */}
        <Animated.FlatList 
        ref={flatListRef}
        horizontal
        pagingEnabled
        snapToAlignment='center'
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        keyboardDismissMode="on-drag"
        showsHorizontalScrollIndicator={false}
        data={constants.course_details_tabs}
        keyExtractor={item => `CourseDetailTabs-${item.id}`}
        onScroll={
            Animated.event([
                {nativeEvent: {contentOffset:{x: scrollX}}}
            ],{
                useNativeDriver:false
            })
        }
        renderItem={({item , index})=>{
            return(
                <View
                style={{
                    width:SIZES.width,
                    
                }}
                >
                    {index == 0 && <CourseChapters />}
                    {index == 1 && <CourseFiles/>}
                    {index == 2 && <CourseDiscussion />}

                </View>
            )
        }}

        
        /> 

    </View>

  )

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.appMode?.backgroundColor1,

      }}>
      {/* HeaderBar */}
      {renderHeaderBar()}

      {/* Video */}
      {renderVideoSection()}

      {/* Content */}
      {renderContent()}
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({});

// if(playVideo) {
//     return(
//         <View
//         style={{
//             flexDirection:'row',
//             paddingHorizontal:SIZES.radius,
//             paddingBottom:SIZES.base,
//             height:85,
//             backgroundColor:COLORS.black,
//             alignItems: 'flex-end',
//         }}
//         >
//             {renderHeaderComponents()}

//         </View>
//     )
// }
