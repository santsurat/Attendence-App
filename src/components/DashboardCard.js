import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Card} from 'react-native-shadow-cards';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';

export default function DashboardCard(props) {
  const navigation = useNavigation();

  const onRegisterPressed = name => {
    if (name === 'morningAttendence') {
      navigation.navigate('SignUpScreen');
    } else if (name === 'dailyAttendenceCount') {
      navigation.navigate('AttendenceCount');
    } else if (name === 'excelSheet') {
      navigation.navigate('ExcelSheet');
    } else {
      if (name === 'qrAttendence') navigation.navigate('QrScanner');
    }
  };

  const buttonName = name => {
    if (name === 'morningAttendence') {
      return "Mark Attendence";
    } else if (name === 'dailyAttendenceCount') {
      return "Instant Attendence";
    } else if (name === 'excelSheet') {
      return "Get Excel Report";
    } else {
      return "Mark Attendence";
    }
  }
  return (
    <View style={{marginBottom: 10}}>
      <Card style={styles.size}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            padding: 2,
            fontSize: 20,
            fontStyle: 'normal',
            marginTop: 15,
            alignSelf: 'center',
            fontWeight: '800',
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontSize: 15,
            marginBottom: 15,
            fontStyle: 'normal',
            marginTop: 15,
            alignSelf: 'center',
          }}>
          {props.description}
        </Text>
        <View style={styles.button}>
          <CustomButton text={buttonName(props.name)} onPress={() => onRegisterPressed(props.name)} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  size: {
    minwidth: '90%',
    backgroundColor: "#a3a0a9",
    elevation: 5,
    shadowColor: '#fff',
    borderRadius: 15,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginBottom: 15,
  },
});
