import React, { useState } from 'react';
import { Text, TextInput, Alert, Button, View, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen2 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>로그인</Text>

        <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
          <TextInput style={styles.input} 
                  placeholder='아이디 또는 이메일'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='비밀번호'
                  placeholderTextColor='grey'>
          </TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.reset({routes: [{name: 'ListScreen'}]})}>
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('stackFindID')}>
              <Text style={styles.findtext}>아이디 찾기1</Text>
            </TouchableOpacity>
            <Text style={{color:'black'}}>  |  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('stackFindPassword')}>
              <Text style={styles.findtext}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </Text>
        </View>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 40,
    color: 'black'
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  inputext: {
    marginTop: 80,
    width: 200,
    height: 100,
    padding: 10,
    fontSize: 40,
    textAlign:'left',
    marginBottom: 70,
  },
  findtext: {
    marginTop: 20,
    color: 'black'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '40%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  },
});

export default LoginScreen2;