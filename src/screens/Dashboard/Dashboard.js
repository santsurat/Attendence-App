import {View, Text, ScrollView, StyleSheet, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Card} from 'react-native-shadow-cards';
import DashboardCard from '../../components/DashboardCard';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dialog} from '../../components/Modal';
import {useNavigation} from '@react-navigation/native';

// import Login from '../Login/Login';
// import {Dialog} from '../../components/Modal';

const cardsData = [
  {
    id: 1,
    name: 'morningAttendence',
    title: 'Morning/Evening Attendence(Manual)',
    description: 'Please press below to mark regular morning/evening attendence manually.',
  },
  {
    id: 2,
    name: 'qrAttendence',
    title: 'Morning/Evening Attendence(QR Scanner)',
    description: 'Please press below to mark regular morning/evening attendence with QR Scanner.',
  },
  {
    id: 3,
    name: 'dailyAttendenceCount',
    title: 'Daily Attendence Count',
    description:
      'Please press below to get instant attendence count for today(Morning/Evening).',
  },
  {
    id: 4,
    name: 'excelSheet',
    title: 'Excel Sheet For Regular Attendence',
    description:
      'Please press below to get consolidated excel attendence chart for given set of period.',
  },
];

const Dashboard = () => {
  const navigation = useNavigation();
  const [disableBackButton, setDisableBackButton] = useState(false);
  useEffect(() => {
    
    const backAction = () => {
      console.log('inuse');
      //BackHandler.exitApp()
      if (disableBackButton) {
        console.log('yes');
      //  return true; // Prevent default behavior (exit app)
      } else {
        console.log('no');
       // return false; // Allow default behavior (go back)
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [disableBackButton]);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <View style={{backgroundColor: '#e67e22'}}>
        <View>
          <Card style={styles.card}>
            <Text style={styles.Textcolor}>Manage Attendence</Text>
            <Icon 
              name="poweroff" size={20} color={"#fff"} left={30}onPress={logout}
            />
          </Card>
        </View>
        <Card style={styles.card1}>
          <ScrollView style={styles.scrollContainer}>
            {cardsData.map(data => (
              <DashboardCard
                key={data.id}
                title={data.title}
                description={data.description}
                name={data.name}
                setDisableBackButton={setDisableBackButton}
              />
            ))}
            <Dialog
              isModalOpen={isModalOpen}
              isLogOut={true}
              setIsModalOpen={setIsModalOpen}
              modalText={'Do you want logout ?'}
            />
          </ScrollView>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Textcolor: {
    color: '#CA6924',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'normal',
    
  },
  card: {
    height: 60,
    backgroundColor:"#284387",
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection:'row',
  },
  card1: {
    height: '85%',
    marginVertical: 25,
    alignSelf: 'center',
    width: '95%',
    elevation: 40,
    borderRadius: 20,
    backgroundColor: '#284387',
  },
  scrollContainer: {
    marginVertical: 10,
    alignSelf: 'center',
  },
});
export default Dashboard;
