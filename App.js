import {StyleSheet, Text, View, Easing} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CourseDetails, CourseListing, MainLayout} from './screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {Provider} from 'react-redux';
import ThemeStore from './stores/ThemeStore';
import { CardStyleInterpolators, TransitionPresets } from '@react-navigation/stack';






const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,




  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 400, easing: Easing.inOut(Easing.ease)},
    },
    close: {
      animation: 'timing',
      config: {duration: 500, easing: Easing.inOut(Easing.ease)},
    },
    cardStyleInterpolator: ({current: {progress}}) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  },
};

const App = () => {
  return (
    <Provider store={ThemeStore}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
            headerShown: false,
            useNativeDriver:true,
            // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
            
            
            
          }}
          
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}>
          <Stack.Screen name="Dashboard" component={MainLayout} />
          <Stack.Screen
            name="CourseListing"
            component={CourseListing}
            options={() => options}
          />
          <Stack.Screen
            name="CourseDetails"
            component={CourseDetails}
            options={{
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
