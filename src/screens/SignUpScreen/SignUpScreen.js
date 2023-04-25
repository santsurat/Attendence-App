import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import React, {useState,useEffect} from 'react';
import axios, { AxiosError } from 'axios';
//import Radhasoami from '../../../assets/Image/Radhasoami.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
//import {useNavigation} from '@react-navigation/native';
import DateTimePickerScreen from '../../DateTimePickerScreen/DateTimePickerScreen';
import CheckBox from '@react-native-community/checkbox';
import {Card} from 'react-native-shadow-cards';
import {Dialog} from '../../components/Modal';
import {useNavigation,useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconto from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from '@react-native-async-storage/async-storage';
//import Spinner from '../Spinner';

const SignUpScreen = () => {

//   const getToken = async() => {
//     return await EncryptedStorage.getItem('login').then((response) => {return response});
//  };
 const initialState = {
   jigyashu: false,
   initiated: false,
 };
 const [state, setState] = useState(initialState);
 const [fullName, setFullName] = useState('');
 const [branchNumber, setBranchNumber] = useState('');
 const [fieldNumber, setFieldNumber] = useState('');
 const [fatherName, setFatherName] = useState('');
 const [todayCounter, setTodayCounter] = useState(0);
 const [isLoading, setIsLoading] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);


  const navigation = useNavigation();
  const route = useRoute();
  const finalDataFromRoute = route.params?.dataToBeSentOnSignUpScreen;
  useEffect(() => {
    let convertedData = {};
    if(finalDataFromRoute){
      //console.log(JSON.stringify(finalDataFromRoute));
      convertedData = JSON.parse(JSON.stringify(finalDataFromRoute));
      console.log(`dta${convertedData}`);
      setFullName(convertedData.name);
      setFatherName(convertedData.fatherName);
      if(convertedData.satsangType === "Jigyashu"){
        setState(type => ({...type,jigyashu :true,initiated : false}));
      } if(convertedData.satsangType === "Initiated"){
        setState(type => ({...type,jigyashu :false,initiated : true}));
      }
    }
  }, []);

  console.log(fullName)
  console.log(fatherName)
  console.log(state.initiated)
  console.log(state.jigyashu)
  

 
  const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      'submitted!',
      duration = 10,
      ToastAndroid.CENTER,
      25,
      50,
    );
  };

  const onRegisterPressed = async() => {

    const token =  await getToken();
    if (validateFields()) {
      const param = {
        name: fullName,
        fatherName: fatherName.length === 0 ? "string" : fatherName,
        satsangType: state.jigyashu ? 'jigyashu' : 'initiated',
        branchNumber: branchNumber.length === 0 ? 0 : branchNumber,
        fieldNumber: fieldNumber.length === 0 ? 0 : fieldNumber,
      };
      console.log(param);
      console.log("token", token);
      setIsLoading(true);
      axios
        .post(
          `https://aams.somee.com/api/FieldAttendence/postattendence`,
          param,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            resetFields();
            setIsLoading(false);
           showToastWithGravityAndOffset();
          } else {
            setIsModalOpen(true);
            resetFields();
          }
        })
        .catch((error) => {
          setIsLoading(false);
          alert("Problem with API!");
          if(typeof error === AxiosError){
            setIsModalOpen(true);
          }
        });
    }
  };

  const resetFields = () => {
    setFullName('');
    setBranchNumber('');
    setState({
      jigyashu: false,
      initiated: false,
    });
    setFieldNumber('');
    setFatherName('');
  };

  const validateFields = () => {
    let validate = true;
    if (fullName.length < 2) {
      validate = false;
      alert("Name is required.")
    }else if (state.jigyashu === false && state.initiated === false) {
      validate = false;
      alert("Checkbox are required.")
    }
    return validate;
  };

  const handleChangeCheckBox = (name, e) => {
    if (name === 'jigyashu') {
      if (e === true) {
        setState(data => ({...data, jigyashu: e, initiated: false}));
      }
      if (e === false) {
        setState(data => ({...data, jigyashu: e, initiated: false}));
      }
    } else {
      if (e === true) {
        setState(data => ({...data, jigyashu: false, initiated: e}));
      }
      if (e === false) {
        setState(data => ({...data, jigyashu: false,initiated: e}));
      }
    }
  };
 
  const logout = () => {
    setIsModalOpen(true);
  };

  const back = () =>{
    navigation.goBack();
  };

  return (
    
    <>
    
    
      <View style={{backgroundColor: "#e67e22"}}>
        <View>
          <Card style={styles.root}>
            <Iconto name="chevron-back-circle-outline" size={30} right={40}color={"#fff"} onPress={back}/>
            <Text style={styles.title}>Field Attendence</Text>
            {/* <Icon name="poweroff" size={20} color={"#fff"} left={40}onPress={logout} /> */}
          </Card>
        </View>

        <Card style={styles.Card}>
          <Card style={{backgroundColor:"#a3a0a9", borderRadius:30}}>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.containercheckbox}>
              <CheckBox
                style={styles.CheckBox}
                hideBox={false}
                tintColors={{ true:"#0d86ff", false: 'black' }}
                disabled={false}
                name="Jigyashu"
                value={state.jigyashu}
                onValueChange={e => handleChangeCheckBox('jigyashu', e)}
              />

              <Text style={styles.color}>Jigyashu</Text>

              <CheckBox
                style={styles.CheckBox}
                hideBox={false}
                name="Initiated"
                tintColors={{ true:"#0d86ff", false: 'black' }}
                disabled={false}
                value={state.initiated}
                onValueChange={e => handleChangeCheckBox('initiated', e)}
              />

              <Text style={styles.color}>Initiated</Text>
            </View>

            <CustomInput
              placeholder="Full Name"
              value={fullName}
              setValue={setFullName}
            />

            <CustomInput
              placeholder="Branch Number (Optional)"
              value={branchNumber}
              setValue={setBranchNumber}
            />

            <CustomInput
              placeholder="Father's Name (Optional)"
              value={fatherName}
              setValue={setFatherName}
            />
            <CustomInput
              placeholder="Field Number (Optional)"
              value={fieldNumber}
              setValue={setFieldNumber}
            />
            <View style={styles.newcard}>
              <Text style={{color: 'black',margin:5}}> Select Date : </Text>
              <DateTimePickerScreen />
            </View>
            <View style={styles.button}>
              <CustomButton text="Submit" onPress={onRegisterPressed} />
            </View>
            {isLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator animating={true} size={'large'} />
              </View>
            ) : null}
            <Dialog
              isModalOpen={isModalOpen}
              isLogOut = {false}
              setIsModalOpen={setIsModalOpen}
              modalText={'You have been logged out as session expired.'}
            />
            <Dialog
    isModalOpen={isModalOpen}
    isLogOut = {true}
    setIsModalOpen={setIsModalOpen}
    modalText={'Do you want logout ?'}
  />
          </ScrollView>
          </Card>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 60,
    backgroundColor:"#284387",
    width: '100%',
    justifyContent: "center",
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection:'row'
  },
  button: {
    width: '100%',
    marginVertical: 4,
  },
  title: {
    color: '#CA6924',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  color: {
    color: '#000000',
    marginHorizontal: 5,
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
  colortext: {
    color: '#000000',
  },
  Card: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    height: '85%',
    marginVertical: 25,
    alignSelf: 'center',
    width: '95%',
    elevation: 40,
    borderRadius: 20,
    backgroundColor: "#284387",
  },
  newcard: {
    height: 50,
    width: '100%',
    marginVertical: 10, 
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainer: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '90%',
  },
  containercheckbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40,
    marginBottom:20,
  },
  CheckBox:{
    marginRight:8,
    marginLeft:8
  }
});
export default SignUpScreen;
