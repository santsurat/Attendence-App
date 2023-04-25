import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../screens/Login/Login";
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen/index'
import Dashboard from '../screens/Dashboard/Dashboard';
import AttendenceCount from '../screens/AttendenceCount/AttendenceCount';
import ExcelSheet from '../screens/ExcelSheet/ExcelSheet'
import QrScanner from '../components/QrScanner';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} styles={styles.root}>
       <Stack.Screen name="Login" component={Login} />
       <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
       <Stack.Screen name="AttendenceCount" component={AttendenceCount} />
       <Stack.Screen name="ExcelSheet" component={ExcelSheet} />
       <Stack.Screen name="Dashboard" component={Dashboard} />
       <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
       <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
       <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="QrScanner" component={QrScanner} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles=StyleSheet.create({
    root:{
        color:'#000000'
    }
})
export default Navigation