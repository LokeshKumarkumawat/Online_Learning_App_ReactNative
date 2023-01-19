import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
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
  HorizontalCourseCard,
  IconButton,
  LineDivier,
  TextButton,
  VerticalCourseCard,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Section = ({containerStyle, title, onPress, children }) => {

  const theme = useSelector(state => state.theme);

  return(
    <View style={{...containerStyle}}>
    <View style={{flexDirection: 'row', paddingHorizontal: SIZES.padding}}>
      <Text style={{flex: 1, ...FONTS.h2 , color:theme.appMode?.textColor}}>{title}</Text>
      <TextButton
        contentContainerStyle={{
          width: 80,
          borderRadius: 30,
          backgroundColor: COLORS.primary,
        }}
        label="See All"
        onPress={onPress}
      />
    </View>
    {children}
  </View>
  )

      };

const Home = () => {
  const navigation = useNavigation();

  const theme = useSelector(state => state.theme);


  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
      }}>
      {/* Greetings */}
      <View style={{flex: 1}}>
        <Text style={{...FONTS.h2 , color:theme.appMode?.textColor}}>Hello, Lokesh</Text>
        <Text style={{...FONTS.body3, color: COLORS.gray50}}>
          Thursday, 9th Sept 2022
        </Text>
      </View>

      {/* Notification */}
      <IconButton
        icon={icons.notification}
        iconStyle={{tintColor: theme.appMode?.tintColor}}
      />
    </View>
  );

  const renderStartLearning = () => (
    <ImageBackground
      source={images.featured_bg_image}
      style={{
        alignItems: 'flex-start',
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 15,
      }}
      imageStyle={{borderRadius: SIZES.radius}}>
      {/* Info */}
      <View>
        <Text style={{color: COLORS.white, ...FONTS.body2}}>HOW TO</Text>
        <Text style={{color: COLORS.white, ...FONTS.h2}}>
          Make your brand more visible with our checklist
        </Text>
        <Text
          style={{
            marginTop: SIZES.radius,
            color: COLORS.white,
            ...FONTS.body4,
          }}>
          ByScott Harris
        </Text>
      </View>
      {/* Image */}
      <Image
        source={images.start_learning}
        style={{width: '100%', height: 110, marginTop: SIZES.padding}}
      />
      {/* Button */}
      <TextButton
        label="Start Learning"
        contentContainerStyle={{
          height: 40,
          paddingHorizontal: SIZES.padding,
          borderRadius: 20,
          backgroundColor: theme.appMode?.backgroundColor1
        }}
        labelStyle={{color: theme.appMode?.textColor,}}
      />
    </ImageBackground>
  );

  const renderCourses = () => (
    <FlatList
      horizontal
      data={dummyData.courses_list_1}
      listKey="Courses"
      keyExtractor={item => `Courses-${item.id}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{marginTop: SIZES.padding}}
      renderItem={({item, index}) => (
        <VerticalCourseCard
          containerStyle={{
            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
            marginRight:
              index == dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
          }}
          course={item}
        />
      )}
    />
  );

  const renderCategories = () => (
    <Section title="Categories">
      <FlatList
        horizontal
        data={dummyData.categories}
        listKey="Categories"
        keyExtractor={item => `Categories-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        renderItem={({item, index}) => (
          <CategoryCard
          sharedElementPrefix="Home"
            category={item}
            containerStyle={{
              marginLeft: index == 0 ? SIZES.padding : SIZES.base,
              marginRight:
                index == dummyData.categories.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => navigation.navigate('CourseListing',{category:item , sharedElementPrefix:"Home"})}
          />
        )}
      />
    </Section>
  );

  const renderPopularCourses = () => (
    <Section title="Popular Courses" containerStyle={{marginTop: 30}}>
      <FlatList
        data={dummyData.courses_list_2}
        listKey="PopularCourses"
        scrollEnabled={false}
        keyExtractor={item => `PopularCourses-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
        }}
        renderItem={({item, index}) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index == 0 ? SIZES.radius : SIZES.padding,
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <LineDivier lineStyle={{backgroundColor: COLORS.gray20}} />
        )}
      />
    </Section>
  );

  return (
    <View style={{flex: 1,backgroundColor: theme.appMode?.backgroundColor1,}}>
      {/* Header */}
      {renderHeader()}
      {/* Content */}

      <ScrollView
        contentContainerStyle={{paddingBottom: 150}}
        showsVerticalScrollIndicator={false}>
        {/* StartLearning */}
        {renderStartLearning()}

        {/* Courses */}
        {renderCourses()}

        <LineDivier
          lineStyle={{
            marginVertical: SIZES.padding,
          }}
        />

        {/* Categories */}
        {renderCategories()}

        {/* PopularCourses */}
        {renderPopularCourses()}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
