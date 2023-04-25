import React from 'react';
import {View, Text, StyleSheet, Modal,Button} from 'react-native';
import CustomButton from '../components/CustomButton';
import {Card} from 'react-native-shadow-cards';
import {useNavigation} from '@react-navigation/native';


export const Dialog = props => {

  const navigation = useNavigation();
  const onRegisterPressed = () => {
    if (props.methodtoBeCalled !== null) {
      props.methodtoBeCalled && props.methodtoBeCalled();
    } else {
      props.setIsModalOpen(false);
      navigation.navigate('Login');
    }
  };
  const handleYes = () => {
    props.setIsModalOpen(false);
    navigation.navigate(("Login"))
  };
  const handleNo = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal transparent={true} visible={props.isModalOpen}>
       {props.isLogOut ? <Card style={styles.Card}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.colorPositionText}>{props.modalText}</Text>
            <View style={styles.buttonWidth}>
            
            <View style={styles.buttonstyle1}>
              <Button title="Yes" color={"#4169E1"}onPress={handleYes} />
              <View style={{left:60,}}>
              <Button title="No" color={"#4169E1"}onPress={handleNo} />
              </View></View>
              {/* <View style={styles.buttonstyle}>
              <Button title="No" color={"blue"}onPress={handleNo} style={{marginTop : 10}}/>
              </View> */}
            </View>
          </View>
        </Card>
        :
        <Card style={styles.Card}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.colorPositionText}>{props.modalText}</Text>
            <View style={styles.buttonWidth}>
              <CustomButton text="Ok!" onPress={onRegisterPressed} />
            </View>
          </View>
        </Card>
          }
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  colorPositionText: {
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
  },
  buttonWidth: {
    width: '50%',
    marginTop : 10,
    display : "flex",
    flexDirection : "column",
    height : "50%",
    justifyContent : "space-evenly",

  },
  Card: {
    display: 'flex',
    width: '80%',
    height: '19%',
    elevation: 1,
    borderRadius: 14,
    backgroundColor: '#969696',
    alignSelf: 'center',
    marginTop: 300,
  },
  buttonstyle1:{
  flexDirection:'row',
 
  },
  // buttonstyle:{
  //   alignSelf:'center',
  //   right:40,
    
  // }
});
