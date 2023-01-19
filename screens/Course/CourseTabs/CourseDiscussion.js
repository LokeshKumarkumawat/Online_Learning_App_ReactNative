import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, dummyData, SIZES} from '../../../constants';
import { LineDivier } from '../../../components';
import { useSelector } from 'react-redux';

const CourseDiscussion = () => {
  const theme = useSelector(state => state.theme);
  const rendenderDiscussion = () => (
    <View
      style={{
        flex: 1,
        paddingVertical: 10
      }}>
      <FlatList
        data={dummyData?.course_details?.discussions}
        keyExtractor={item => `Discussions-main-${item.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 70,
        }}
        renderItem={({item, index}) => (
            <Text
            style={{
              color:theme.appMode?.textColor
            }}
            >
                {item?.comment}
            </Text>
        )}
        ItemSeparatorComponent={() => (
          <LineDivier lineStyle={{backgroundColor: COLORS.gray20 }} />
        )}
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* Discussion */}
      {rendenderDiscussion()}

      {/* Footer */}
    </View>
  );
};

export default CourseDiscussion;

const styles = StyleSheet.create({});
