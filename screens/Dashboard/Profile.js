import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, icons, images, SIZES} from '../../constants';
import {
  IconButton,
  LineDivier,
  ProfileRadioButton,
  ProfileValue,
  ProgressBar,
  TextButton,
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {toggleThemeBegin, toggleThemeSuccess} from '../../stores/themeSlice';


const Profile = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const [newCourseNotification, setNewCourseNotification] = useState(false);
  const [studyReminder, setStudyReminder] = useState(false);

  const toggleThemeHandler = () => {
    if (theme.appMode.name == 'light') {
      dispatch(toggleThemeSuccess());
    } else {
      dispatch(toggleThemeBegin());
    }
  };

  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between',
      }}>
      <Text style={{...FONTS.h1, color:theme.appMode?.textColor}}>Profile</Text>
      <IconButton
        onPress={() => toggleThemeHandler()}
        icon={icons.sun}
        iconStyle={{
          tintColor:theme.appMode?.tintColor,
        }}
      />
    </View>
  );

  const renderProfileCard = () => (
    <View
      style={{
        flexDirection: 'row',
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        paddingVertical: 20,
        borderRadius: SIZES.radius,
        backgroundColor: theme.appMode?.backgroundColor2,
      }}>
      {/* Profile Image */}
      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
        }}>
        <Image
          source={images.profile}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 40,
            borderWidth: 1,
            borderColor: COLORS.white,
          }}
        />

        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              marginBottom: -15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.camera}
              resizeMode="contain"
              style={{
                width: 17,
                height: 17,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* Details */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}>
          Lokesh Kumawat
        </Text>

        <Text
          style={{
            color: COLORS.white,
            ...FONTS.body4,
          }}>
          Full Stack Developer
        </Text>
        {/* ProgressBar */}
        <ProgressBar
          progress="58%"
          containerStyle={{marginTop: SIZES.radius}}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{flex: 1, color: COLORS.white, ...FONTS.body4}}>
            {' '}
            Overall Progress
          </Text>

          <Text style={{color: COLORS.white, ...FONTS.body4}}>58%</Text>
        </View>
        {/* Member */}
        <TextButton
          label="+ Become Member"
          contentContainerStyle={{
            height: 35,
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: 20,
            backgroundColor: theme.appMode?.backgroundColor4,
          }}
          labelStyle={{
            color: theme.appMode?.textColor,
          }}
        />
      </View>
    </View>
  );

  const renderProfileSection1 = () => (
    <View style={styles.profileSectionContainer}>
      <ProfileValue icon={icons.profile} label="Name" value="Lokesh Kumawat" />
      <LineDivier />

      <ProfileValue icon={icons.email} label="Email" value="lokesh@gmail.com" />
      <LineDivier />

      <ProfileValue
        icon={icons.password}
        label="Password"
        value="Updated 2 weeks ago"
      />
      <LineDivier />

      <ProfileValue
        icon={icons.call}
        label="Contact Number"
        value="+919166042126"
      />
    </View>
  );

  const renderProfileSection2 = () => (
    <View style={styles.profileSectionContainer}>
      <ProfileValue icon={icons.star_1} value="Pages" />
      <LineDivier />
      <ProfileRadioButton
        icon={icons.new_icon}
        label="New Course Notification"
        isSelected={newCourseNotification}
        onPress={() => {
          setNewCourseNotification(!newCourseNotification);
        }}
      />

      <LineDivier />

      <ProfileRadioButton
        icon={icons.reminder}
        label="Study Reminder"
        isSelected={studyReminder}
        onPress={() => {
          setStudyReminder(!studyReminder);
        }}
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.appMode?.backgroundColor1,
      }}>
      {/* Header */}
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}>
        {/* Profile Card */}
        {renderProfileCard()}

        {/* Profile Section 1 */}
        {renderProfileSection1()}

        {/* Profile Section 2 */}
        {renderProfileSection2()}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});
