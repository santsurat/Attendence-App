import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView } from 'react-native'
import React, { useState } from 'react'
//import Radhasoami from '../../../assets/Image/Radhasoami.png';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';



const NewPasswordScreen = () => {
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const onSubmitPressed = () => {
        console.warn('onSubmitPressed')
    }
    const onSignUp = () => {
        console.warn('SignUp')
    };
    
    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>
    
                <CustomInput placeholder="Code" value={code} setValue={setCode} />

                <CustomInput placeholder="Enter your new password" value={newPassword} setValue={setNewPassword} />

                <CustomButton text="Submit" onPress={onSubmitPressed} />

                {/* <CustomButton text="Resend code"
                    onPress={onResendPress}
                    type="TERITARY" /> */}



                <CustomButton text="Back to Sign in"
                    onPress={onSignUp}
                    type="TERTIARY" />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    },

})
export default NewPasswordScreen