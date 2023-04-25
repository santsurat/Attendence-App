import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Card} from 'react-native-shadow-cards';
import DateTimePickerScreen from '../../DateTimePickerScreen/DateTimePickerScreen';
import CustomButton from '../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RNFS from 'react-native-fs';
import Iconto from 'react-native-vector-icons/Ionicons';
import RNFetchBlob from 'rn-fetch-blob';
import {Dialog} from '../../components/Modal';
import DateTimePickerManual from '../../components/DatePickerManual';

export default function AttendenceCount() {
  const onRegisterPressed = () => {
    // navigation.navigate('AttendenceCount');
  };

  const getTodayDate = () => {
    const dt = new Date();
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1);
    //console.log(x1[2] + "/" + x1[1] + "/" + x1[0]);
    return x1[1] + '/' + x1[2] + '/' + x1[0];
  };
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFromSelectedDate, setUserFromSelectedDate] = useState(
    getTodayDate(),
  );
  const [userToSelectedDate, setUserToSelectedDate] = useState(getTodayDate());
  setUserFromSelectedDate;
  const [dailyDate, setDailyDate] = useState(getTodayDate());
  setUserFromSelectedDate;

  const getToken = async () => {
    return await EncryptedStorage.getItem('login').then(response => {
      return response;
    });
  };

  const dayExcelSheet = async (finalDate, day) => {
  
    console.log(finalDate);
    console.log(day);
    setIsLoading(true);
    const token = await getToken();
    // const fileUrl = `https://aams.somee.com/api/FieldAttendence/exportToExcel?startDate=${finalDate}&dayType=${day}`;
    const fileUrl = `https://sant9258-001-site1.htempurl.com/api/FieldAttendence/exportToExcel?startDate=${finalDate}&dayType=${day}`;
    const fileExt = '.xlsx';
    const fileDir = RNFetchBlob.fs.dirs.DownloadDir;
    const fileName = `attendence_${new Date().getTime()}${fileExt}`;
    const filePath = `${fileDir}/${fileName}`;
    console.log(fileUrl);
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: fileName,
        path: filePath,
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      IOSBackgroundTask: true,
    })
      .fetch('GET', fileUrl, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        console.log('file downloaded', res.path());
        setIsLoading(false);
        alert(
          'File Downloaded in Downloads Folder in your device.Please Check.',
        );
      })
      .catch(err => {
        console.log('error downloading file', err);
        alert(err);
        setIsLoading(false);
      });
  };

  const dayToDayExcelSheets = async (startDate, endDate, day) => {
    console.log(startDate);
    console.log(endDate);
    console.log(day);
    setIsLoading(true);
    const token = await getToken();
    // const fileUrl = `https://aams.somee.com/api/FieldAttendence/exportToExcelDateToDate?startDate=${startDate}&endDate=${endDate}&dayType=${day}`;
    const fileUrl = `https://sant9258-001-site1.htempurl.com/api/FieldAttendence/exportToExcelDateToDate?startDate=${startDate}&endDate=${endDate}&dayType=${day}`;
    const fileExt = '.xlsx';
    const fileDir = RNFetchBlob.fs.dirs.DownloadDir;
    const fileName = `attendenceDayToDay_${new Date().getTime()}${fileExt}`;
    const filePath = `${fileDir}/${fileName}`;
    console.log(token);

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        fileCache: true,
        indicator: true,
        title: fileName,
        path: filePath,
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      IOSBackgroundTask: true,
    })
      .fetch('GET', fileUrl, {
        Authorization: `Bearer ${token}`,
      })
      .then(res => {
        console.log('file downloaded', res.path());
        setIsLoading(false);
        alert(
          'File Downloaded in Downloads Folder in your device.Please Check.',
        );
      })
      .catch(err => {
        console.log('error downloading file', err);
        alert('Problem while downloading Excel report.');
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsModalOpen(true);
  };
  const back = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <>
      <View style={{backgroundColor: '#e67e22'}}>
        <Card style={styles.card}>
          <Iconto
            name="chevron-back-circle-outline"
            size={30}
            right={40}
            color={'#fff'}
            onPress={back}
          />
          <Text style={styles.Textcolor}>Excel Sheet Report</Text>

          {/* <Icon
            name="poweroff"
            size={20}
            color={'#fff'}
            left={50}
            onPress={logout}
          /> */}
        </Card>

        <Card style={styles.mainCard}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{justifyContent: 'space-evenly'}}>
            <Card style={styles.inputCard1}>
              <View>
                <Text style={styles.today}>Today Attendence</Text>
              </View>
              <View style={styles.date}>
                <Text style={{color: 'black'}}> Select Date : </Text>
                {/* <DateTimePickerScreen /> */}
                <DateTimePickerManual
                  setUserFromSelectedDate={setDailyDate}
                  fromPage={'selectFrom'}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  text="Get Excel (Morning)"
                  onPress={() => dayExcelSheet(dailyDate, 'morning')}
                />
                <CustomButton
                  text="Get Excel (Evening)"
                  onPress={() => dayExcelSheet(dailyDate, 'evening')}
                />
              </View>
            </Card>
            <Card style={styles.inputCard2}>
              <View>
                <Text style={styles.monthly}>Monthly/Weekly Attendence</Text>
              </View>
              <View style={styles.date0}>
                <Text style={{color: 'black'}}> Select From : </Text>
                <DateTimePickerManual
                  setUserFromSelectedDate={setUserFromSelectedDate}
                  fromPage={'selectFrom'}
                />
              </View>
              <View style={styles.date1}>
                <Text style={{color: 'black'}}>Select To : </Text>
                <DateTimePickerManual
                  setUserToSelectedDate={setUserToSelectedDate}
                  fromPage={'selectTo'}
                />
              </View>
              

              <View style={styles.button}>
                <CustomButton
                  text="Get Excel (Morning)"
                  onPress={() =>
                    dayToDayExcelSheets(
                      userFromSelectedDate,
                      userToSelectedDate,
                      'morning',
                    )
                  }
                />
                <CustomButton
                  text="Get Excel (Evening)"
                  onPress={() =>
                    dayToDayExcelSheets(
                      userFromSelectedDate,
                      userToSelectedDate,
                      'evening',
                    )
                  }
                />
              </View>
            </Card>
          </ScrollView>
        </Card>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} size={'large'} />
          </View>
        ) : null}
      </View>
      <Dialog
        isModalOpen={isModalOpen}
        isLogOut={true}
        setIsModalOpen={setIsModalOpen}
        modalText={'Do you want logout ?'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  Textcolor: {
    color: '#CA6924',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  card: {
    height: 60,
    backgroundColor: '#284387',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
  },
  mainCard: {
    marginVertical: 25,
    alignSelf: 'center',
    width: '95%',
    elevation: 40,
    borderRadius: 20,
    backgroundColor: '#284387',
    height: '85%'
  },
  inputCard1: {
    alignItems: 'center',
    backgroundColor: '#a3a0a9',
    borderRadius: 20,
    shadowColor: '#fff',
  },
  inputCard2: {
    alignItems: 'center',
    backgroundColor: '#a3a0a9',
    borderRadius: 20,
    shadowColor: '#fff',
    marginTop : 20
  },
  scrollContainer: {
    marginVertical: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  today: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 40,
  },
  monthly: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  date: {
    marginBottom: 20,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date0: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  date1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
