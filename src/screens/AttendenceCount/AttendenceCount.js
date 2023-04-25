import {StyleSheet, Text, View, ScrollView,ActivityIndicator} from 'react-native';
import React,{useState} from 'react';
import {Card} from 'react-native-shadow-cards';
import DateTimePickerScreen from '../../DateTimePickerScreen/DateTimePickerScreen';
import CustomButton from '../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Iconto from 'react-native-vector-icons/Ionicons';
import {Dialog} from '../../components/Modal';
import {Dialog as SessionExpireModal} from '../../components/Modal';
import DateTimePickerManual from '../../components/DatePickerManual';



export default function AttendenceCount() {


  const getTodayDate = () => {
    const dt = new Date();
    const x = dt.toISOString().split('T');
    const x1 = x[0].split('-');
    console.log(x1);
    //console.log(x1[2] + "/" + x1[1] + "/" + x1[0]);
    return x1[1] + '/' + x1[2] + '/' + x1[0];
  };

  const [morningAttendence,setMorningAttendence] = useState(0);
  const [eveningAttendence,setEveningAttendence] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFromSelectedDate, setUserFromSelectedDate] = useState(
    getTodayDate(),
  );
  const [userToSelectedDate, setUserToSelectedDate] = useState(getTodayDate());
  setUserFromSelectedDate;

  const getToken = async() => {
    return await EncryptedStorage.getItem('login').then((response) => {return response});
 };



  const onAttendenceCount = async (finalDate) => {
   //const finalDate = getTodayDate();
    const token =  await getToken();
      setIsLoading(true);
      axios
       // .get(`https://aams.somee.com/api/FieldAttendence/getCurrentDayCountForMorning`,
        .get(`https://sant9258-001-site1.htempurl.com/api/FieldAttendence/getCurrentDayCountForMorning?todaysDate=${finalDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(res => {
          if (res.status === 200) {
            setIsLoading(false);
            setMorningAttendence(res.data)
          } else {
            setIsLoading(false);
            alert("Problem with API");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
  };

  const onAttendenceCountEvening = async (finalDate) => {
    //const finalDate = getTodayDate();
    const token =  await getToken();
      setIsLoading(true);
      axios
       // .get(`https://aams.somee.com/api/FieldAttendence/getCurrentDayCountForEvening`,
        .get(`https://sant9258-001-site1.htempurl.com/api/FieldAttendence/getCurrentDayCountForEvening?todaysDate=${finalDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
        .then(res => {
          if (res.status === 200) {
            setIsLoading(false);
            setEveningAttendence(res.data);
            console.log(res.data);
          } else {
            setIsLoading(false);
            alert("Problem with API");
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Problem with API");
          if(error.status === 401){
            setIsModalOpen(true);
          }
        });
  };

  const navigation = useNavigation();

  const logout = () => {
    setIsModalOpen(true);
  };
  const back = () =>{
    navigation.navigate(("Dashboard"))
  };

  return (
    <>
    <View style={{backgroundColor:"#e67e22"}}>
      <Card style={styles.card}>
        <Iconto name="chevron-back-circle-outline" size={30} right={40} color={"#fff"} onPress={back}/>
        <Text style={styles.Textcolor}>Daily Attendence Count</Text>
        {/* <Icon
          name="poweroff"
          size={20}
          right={15}
          color={'#fff'}
          onPress={logout}
        /> */}
      </Card>

      <Card style={styles.mainCard}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{justifyContent: 'space-evenly'}}>
          <Card style={styles.inputCard1}>
            <Text style={styles.Textcolor1}>{`Morning Attendence : ${morningAttendence === 0 ? 0 : morningAttendence}`}</Text>
            <View style={styles.date}>
              <Text style={{color: 'black'}}> Select Date : </Text>
              <DateTimePickerManual
                  setUserFromSelectedDate={setUserFromSelectedDate}
                  fromPage={'selectFrom'}
                />
            </View>
            <View style={styles.button}>
              <CustomButton text="Get Attendence" onPress={() => onAttendenceCount(userFromSelectedDate)} />
            </View>
          </Card>

          <Card style={styles.inputCard2}>
            <Text style={styles.Textcolor2}>{`Evening Attendence : ${eveningAttendence === 0 ? 0 : eveningAttendence}`}</Text>
            <View style={styles.date}>
              <Text style={{color: 'black'}}> Select Date : </Text>
              <DateTimePickerManual
                  setUserToSelectedDate={setUserToSelectedDate}
                  fromPage={'selectTo'}
                />
            </View>
            <View style={styles.button}>
              <CustomButton text="Get Attendence" onPress={() => onAttendenceCountEvening(userToSelectedDate)} />
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
     isLogOut = {true}
     setIsModalOpen={setIsModalOpen}
     modalText={'Do you want logout ?'}
   />
   <SessionExpireModal
              isModalOpen={isModalOpen}
              isLogOut = {false}
              setIsModalOpen={setIsModalOpen}
              modalText={'You have been logged out as session expired.'}
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
    backgroundColor:"#284387",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
  },
  mainCard: {
    height: '86%',
    marginVertical: 20,
    alignSelf: 'center',
    width: '95%',
    elevation: 40,
    borderRadius: 20,
    backgroundColor:"#284387",
  },
  Textcolor1: {
    color: '#000000',
    margin: 60,
    marginBottom: 0,
    fontSize: 20,
    textAlign : "center"
  },
  Textcolor2: {
    color: '#000000',
    margin: 60,
    marginBottom: 0,
    fontSize: 20,
    textAlign : "center"
  },
  inputCard1: {
    alignItems: 'center',
    backgroundColor: "#a3a0a9",
    borderRadius:20,
    shadowColor:'#fff'
  },
  inputCard2: {
    alignItems: 'center',
    backgroundColor:"#a3a0a9",
    borderRadius:20,
    shadowColor:'#fff'
  },
  scrollContainer: {
    marginVertical: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '100%',
    height: '90%',
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    marginBottom: 15,
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
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
