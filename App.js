import React, { useState,useEffect } from 'react';
import { Button, TextInput,View,Text,StyleSheet,Pressable,ToastAndroid } from 'react-native';
import auth from '@react-native-firebase/auth';

const  App= ()=> {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [data,setData]=useState({})
  const [num,setNum]=useState(null)
  const [otp, setOTP] = useState('');
  const [code, setCode] = useState(null);

  function onAuthStateChanged(user) {
    setData(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log("confirmation",confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(otp);
      ToastAndroid.showWithGravity(
        "OTP Verify Successfully",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setNum(null)
      setCode(null)
      setConfirm(null)
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
    <View>
       <TextInput placeholder='Country Code' value={code} onChangeText={text => setCode(text)} style={styles.input}  />
       <TextInput placeholder='Enter Your Moblie Number' value={num} onChangeText={text => setNum(text)} style={styles.input} keyboardType="number-pad" />
       {/* +1 650-555-3434 */}
        <Button
        title="Phone Number SignIn"
        onPress={() => {
          signInWithPhoneNumber(`${code}${num}`)
          setConfirm(true)
        }}
        style={styles.btn}
      />
    </View>
    );
  }

  return (
    <View style={styles.container}>
      
      <TextInput placeholder='123456' value={otp} onChangeText={text => setOTP(text)} style={styles.input} keyboardType="number-pad" />
      <Button title="Verify OTP" onPress={() => confirmCode()}  />
      <View>
        <Text>Phone: {code} {num} </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    width:"100%",
    flex:1
  },
  input:{
    borderWidth:1,
    borderColor:'black',
    width:"50%",
    alignSelf:'center',
    borderRadius:10,
    margin:5,
    // padding:0
  },
  btn:{
    borderWidth:1,
    width:"20%",
    alignSelf:'center',
    borderRadius:10,
    margin:5,
    backgroundColor:'red'
  }
})
export default App