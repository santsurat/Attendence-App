import React, {useState, useEffect} from 'react';

import {Text, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {useNavigation} from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import {Dialog} from '../components/Modal';


const QrScanner = () => {
  const navigation = useNavigation();
  const [data, setData] = useState('');
 const [isModalOpen, setIsModalOpen] = useState(false);
  const [finalData, setFinalData] = useState({
    name: '',
    satsangType: '',
    fatherName: '',
    branch: '',
  });

  const onDialogPress = () =>{
    setIsModalOpen(false);
  };

  const retrieveData = () => {
    const splitData = data.split('|');
    const breakSplitData = splitData[0].charAt(splitData[0].length - 1);
    const breakSplitBranch = splitData[5].split(',');
    setFinalData(value => ({
      ...value,
      name: splitData[1],
      satsangType: breakSplitData,
      fatherName: splitData[2],
      branch: breakSplitBranch[0],
    }));
    const dataToBeSentOnSignUpScreen = {
      name: splitData[1],
      satsangType: breakSplitData === 'J' ? 'Jigyashu' : 'Initiated',
      fatherName: splitData[2],
      branch: breakSplitBranch[0],
    };
    if(breakSplitBranch[0].toLowerCase() !== "adanbagh" ) {
      //back();
      setIsModalOpen(true);
   }else{
    navigation.navigate('SignUpScreen', {dataToBeSentOnSignUpScreen});
   }
    setFinalData({
      name: '',
      satsangType: '',
      fatherName: '',
      branch: '',
    });
    setData('');
    setVisible(false);
  };

  useEffect(() => {
    if (data.length > 0 && data.includes('|')) {
      retrieveData();
    }
  }, [data]);


  const [visible,setVisible] = React.useState(false);

  const activateFlashMode =() => {
    if(visible){
      return RNCamera.Constants.FlashMode.torch;
    }else{
      RNCamera.Constants.FlashMode.off;
    }
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={({data}) => {
          setData(data);
          console.log(data);
        }}
        reactivate={true}
        flashMode={activateFlashMode()}
        reactivateTimeout={100}
        showMarker={true}
        topContent={
          <View style={{display:'flex', flexDirection:'row'}}>
             <MaterialCommunityIcons 
            style={{right:20}}
              onPress = {
              () => {
                setVisible(!visible)
              }
            }
            name={visible === false ? "flashlight-off" : "flashlight"}
            size={30}
            color={"black"}
            />
            <Text
              style={{
                color: 'black',
                padding: 5,
                backgroundColor: 'yellow',
                borderRadius: 10,
                display:'flex',
                marginBottom:40
              }}>
              {'Scan the Satsang Card'}
            </Text>
          </View>
        }
        bottomContent={
          <View>
            <Text
              style={{
                color: 'black',
                padding: 10,
                backgroundColor: 'yellow',
                borderRadius: 10,
                marginTop: 30,
              }}>{`Name : ${finalData.name}, SatsangiType : ${
              finalData.satsangType === 'J' ? 'Jigyashu' : 'Initiated'
            }, Father Name : ${finalData.fatherName}, Branch : ${
              finalData.branch
            }`}</Text>
          </View>
        }
      />
      <Dialog
              isModalOpen={isModalOpen}
              isLogOut = {false}
              setIsModalOpen={setIsModalOpen}
              modalText={'Please use only AdanBagh UID Card.'}
              methodtoBeCalled = {onDialogPress}
            />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#e67e22',
  },
});

export default QrScanner;
