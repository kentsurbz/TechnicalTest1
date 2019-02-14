/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, Button, Alert, CheckBox } from 'react-native';
import Logo from './img_src/Logo.png'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const onButtonPress = () => {
  Alert.alert('Login Success!');
}
export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
      buttonIsDisabled: true,
      check: false,
    }

    this.onChangeEmailHandler = this.onChangeEmailHandler.bind(this);
    this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
    this.emailEditingHandler = this.emailEditingHandler.bind(this);
  }

  onChangeEmailHandler(email) {
    this.setState({ email })
  }

  onChangePasswordHandler(password) {
    this.setState({ password })
  }


  emailEditingHandler() {
    const {buttonIsDisabled,password} =this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = this.state.email;
    passwordLength = this.state.password.length;
    
    if (email.length == 0) {
      this.setState({
        errorEmail: 'email is required',
      })
    }
    else if (reg.test(email) == false) {
      this.setState({
        errorEmail: 'not correct format for email address',
      })
    }
    else {
      this.setState({
        errorEmail: '',
      })
    }
    if(reg.test(email) && passwordLength > 5 && passwordLength < 13){
      this.state.buttonIsDisabled = false
    }
    else{
      this.state.buttonIsDisabled = true
    }
  }

  passwordEditingHandler() {
    const {buttonIsDisabled,email} =this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordLength = this.state.password.length;
    emailLength = this.state.email;
    if (passwordLength == 0) {
      this.setState({
        errorPassword: 'password is required',
      })
    }
    else if (passwordLength < 6 || passwordLength > 12) {
      this.setState({
        errorPassword: 'please use at least 6 - 12 characters',
      });
    }
    else {
      this.setState({
        errorPassword: '',
      })
    }
    if(reg.test(emailLength) && passwordLength > 5 && passwordLength < 13){
      this.state.buttonIsDisabled = false
    }
    else{
      this.state.buttonIsDisabled = true
    }
  }


  render() {

    return (
      <View style={styles.container}>

        <ScrollView>

          <View style={styles.logo}>
            <Image source={Logo} ></Image>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.textLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                label="Email"
                keyboardType="email-address"
                placeholder="Input email address"
                placeholderStyle={styles.placeholder}
                value={this.state.email}
                style={styles.input}
                onChangeText={(email) => { this.onChangeEmailHandler(email) }}
                onEndEditing={(email) => { this.emailEditingHandler() }}
                underlineColorAndroid='rgba(0,0,0,0)' />

              <Text style={styles.textError}>
                {this.state.errorEmail}
              </Text>
            </View>
            <Text style={styles.textLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                label="Password"
                placeholder="Input password"
                placeholderStyle={styles.placeholder}
                value={this.state.password}
                style={styles.input}
                onChangeText={(password) => { this.onChangePasswordHandler(password) }}
                onEndEditing={(password) => { this.passwordEditingHandler() }}
                secureTextEntry
                underlineColorAndroid='rgba(0,0,0,0)' />
            </View>
            <Text style={styles.textError}>
              {this.state.errorPassword}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox style={styles.checkboxContainer}
                unCheckedColor='#7c57bb'
                checkedColor='7c57bb'
                value={this.state.checked}
                onValueChange={() => this.setState({ checked: !this.state.checked })} />
              <Text style={styles.checkboxText} >Remember Me</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button onPress={onButtonPress}
                disabled={this.state.buttonIsDisabled}
                title="Login"
                color="#7c57bb" />
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 8
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonStyle: {
    borderRadius: 25,
  },
  checkboxText: {
    marginTop: 7,
    color: '#000',
  },
  checkboxContainer: {
    borderColor: '#7c57bb',
    opacity: .4,
    borderWidth: 1.5,
    borderRadius: 5,
  },
  loginContainer: {
    flex: 1,
    marginTop: 20,
  },
  textLabel: {
    marginTop: 20,
    color: '#000',
    fontSize: 20,
    paddingVertical: 3,
    fontWeight: '600'
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    resizeMode: 'contain'
  },
  inputContainer: {
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: '#7c57bb',
    height: 40,
  },
  textError: {
    color: 'red',
    fontStyle: 'italic',
    paddingTop: 3
  },

});
