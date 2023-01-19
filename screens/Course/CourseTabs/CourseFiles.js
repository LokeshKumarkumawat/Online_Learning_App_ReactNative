import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';
import { IconButton, TextButton } from '../../../components';
import { useSelector } from 'react-redux';

const CourseFiles = () => {
    const theme = useSelector(state => state.theme);
  const renderStudents = () => {

    let students=[];

    if(dummyData?.course_details?.students.length > 3){
        students = dummyData?.course_details?.students.slice(0,3)
    }else{
        students = dummyData?.course_details?.students
    }

    return (
      <View>
        {/* Title */}
        <Text
          style={{
            ...FONTS.h2,
            fontSize: 25,
            color:theme.appMode?.textColor
          }}>
          Students
        </Text>

        {/* Student */}
        <View
        style={{
            flexDirection:'row',
            marginTop:SIZES.radius,
            alignItems: 'center', 
        }}
        >
            {students.map((item,index)=>{
                return(
                    <View
                    key={`Students-${index}`}
                    style={{
                        marginLeft:index > 0 ? SIZES.radius : 0
                    }}
                    >

                        <Image           
                        source={item?.thumbnail}
                        style={{width:80 , height:80}}
                        />

                    </View>
                )
            })}
            {
                dummyData?.course_details?.students.length > 3 && 
                <TextButton
                label="View All"
                labelStyle={{
                    color:COLORS.primary,
                    ...FONTS.h3
                }}
                contentContainerStyle={{
                    marginLeft:SIZES.base,
                    backgroundColor:null
                }}
                />
            }

        </View>
      </View>
    );
  };

  const renderFiles = () =>{
    return(
        <View
        style={{
            marginTop:SIZES.padding
        }}
        >
            {/* Section Title */}
            <Text
            style={{
                ...FONTS.h2 , fontSize:25,
            color:theme.appMode?.textColor

            }}
            >
                Files

            </Text>

            {dummyData?.course_details?.files.map((item , index) =>{
                return(
                    <View
                    key={`File-${index}`}
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.radius
                    }}
                    >
                        {/* Thumbnail */}
                        <Image
                        source={item?.thumbnail}
                        style={{
                            width:80,
                            height:80
                        }}
                        />

                        {/* Name , author & date   */}
                        <View
                        style={{
                            flex:1,
                            marginLeft:SIZES.radius
                        }}
                        >
                            <Text
                            style={{
                                ...FONTS.h2,
            color:theme.appMode?.textColor

                            }}
                            >
                                {item?.name}
                            </Text>
                            <Text
                            style={{
                                ...FONTS.body3,
                                color:COLORS.gray30
                            }}
                            >
                                {item?.author}
                            </Text>
                            <Text
                            style={{
                                ...FONTS.body4,
            color:theme.appMode?.textColor

                            }}
                            >
                                {item?.upload_date}
                            </Text>

                        </View>

                        {/* Menu */}
                        <IconButton
                        icon={icons.menu}
                        iconStyle={{
                            width:25,
                            height:25,
                            tintColor:theme.appMode?.dotColor1
                        }}
                        containerStyle={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                        }}
                        />

                    </View>
                )
            })}
             

        </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: SIZES.padding,
      }}>
      {/* Students */}
      {renderStudents()}

      {/* Files */}
      {renderFiles()}
    </ScrollView>
  );
};

export default CourseFiles;

const styles = StyleSheet.create({});
