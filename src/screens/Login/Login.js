import {
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Radhasoami from '../../../assets/Image/Radhasoami.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Card} from 'react-native-shadow-cards';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const validateFields = () => {
    let validate = true;
    if (username.length < 5) {
      validate = false;
    }if (password.length < 8) {
      validate = false;
    }
    return validate;
  };

  const onSignInPressed = () => {
    navigation.navigate('Dashboard');
  };
  const onSignUp = () => {
   alert("Contact to Email Id - upsu10@gmail.com");
  };

  const [show,setShow] = React.useState(false);
  const [visible,setVisible] = React.useState(true);

  return (
    <ScrollView style={{backgroundColor:"#e67e22"}}>
      <View style={styles.root}>
        <Image
          source={Radhasoami}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <Card style={styles.Card}>
          <View>
            <Text style={styles.container}>
            ATTENDENCE MANAGEMENT SYSTEM
            </Text>
          </View>

          <View style={styles.shadow}>
            <Icon style={{marginTop : 20,paddingRight : 10,paddingLeft:20}}name="user" size={30} color="black"/>
            <CustomInput
              placeholder="Username"
          
              value={username}
              setValue={setUsername}
            />
           
          </View>

          <View style={styles.look}>
            <Icon style={{marginTop : 20,paddingRight : 10, paddingLeft:20 }} name="lock" size={30} color="black" />
            <CustomInput
              placeholder="Password"
              value={password}
          
              setValue={setPassword}
              secureTextEntry={visible}
            />
            <MaterialCommunityIcons 
            style={styles.btnEye} onPress = {
              () => {
                setVisible(!visible)
                setShow(!show)
                
              }
            }
            name={show === true ? "eye-outline" : "eye-off-outline"}
            size={30}
            color={"black"}
            />
          </View>
          <View style={styles.button}>
            <CustomButton text="Sign In" onPress={onSignInPressed} />
          </View>

          <CustomButton
            text="If any query ? Click me !"
            onPress={onSignUp}
            type="TERTIARY"
          />
        </Card>
      </View>
      {isLoading ? (
              <View style={styles.loading}>
                <ActivityIndicator animating={true} size={'large'} />
              </View>
            ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    marginVertical:40
   
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 200,
    marginBottom: 10,
  },
  btnEye:{
  position:'absolute',
  left:"105%",
  alignSelf:'center'
  
  },
  container: {
    color: '#CA6924',//rgb(255, 89, 0)
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  shadow: {
    width: '80%',
    
    flexDirection:'row'
  },
  look: {
    width: '80%',
    
    flexDirection:'row'
  },
  
  button: {
    width: '95%',
   paddingLeft:50,
   
   
  },
  Card: {
    width: '90%',
    elevation: 1,
    borderRadius: 14,
     backgroundColor:"#a3a0a9",
     shadowColor:'#fff'
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
export default Login;
