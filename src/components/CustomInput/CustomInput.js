import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({value , setValue ,placeholder , secureTextEntry,}) => {
  return (
    <View style={styles.root}>
      <TextInput 
      value={value}
      maxLength={20}
      onChangeText={setValue}
      placeholder={placeholder} 
      placeholderTextColor={"black"}
      style={styles.input} 
      secureTextEntry={secureTextEntry}
      />
    </View>
  )
}
const styles=StyleSheet.create({
    root:{
        backgroundColor:'white',
        width:'100%',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:10,
        marginVertical:10
    },
    input:{
        color:'#000000'
    }
})
export default CustomInput