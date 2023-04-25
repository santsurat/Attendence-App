import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View>
      <Text style={styles.root}>Home, sweet home</Text>
    </View>
  )
}
const styles=StyleSheet.create({
    root:{
      color:'#000000',
        fontSize:24,
        alignSelf:'center'
       }
})
export default Home