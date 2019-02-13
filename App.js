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
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const email = this.state.email;

    if (email.length == 0) {
      this.setState({
        errorEmail: 'Email is required',
        disabled: true,
      })
    }
    else if (reg.test(email) == false) {
      this.setState({
        errorEmail: 'Invalid Email',
        disabled: true,
      })
    }
    else {
      this.setState({
        errorEmail: '',
        disabled: false
      })
    }
  }

  passwordEditingHandler() {
    const passwordLength = this.state.password.length;
    if (passwordLength == 0) {
      this.setState({
        errorPassword: 'Password is required',
        disabled: true,
      })
    }
    else if (passwordLength < 6 || passwordLength > 12) {
      this.setState({
        errorPassword: 'Password length must be 6-12 characters',
        disabled: true,
      });
    }
    else {
      this.setState({
        errorPassword: '',
        disabled: false,
      })
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
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
            <Text style={styles.textError}>
              {this.state.errorPassword}
            </Text>
            {/* <CheckBox title={"remember"} value={this.state.check} onChange={() => this.checkBoxRemember()} title = "Remember Me"/> */}
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                checkedColor='#7c57bb'
                value={this.state.checked}
                onValueChange={() => this.setState({ checked: !this.state.checked })} />
              <Text style={styles.checkboxText} > Remember Me</Text>
            </View>
            <Button style={styles.buttonStyle} onPress={onButtonPress}
              // disabled={this.state.buttonIsDisabled}
              title="Login"
              color="#7c57bb"
              accessibilityLabel="See an informative alert"></Button>
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
  },
  buttonStyle: {
    marginTop: 30,
    alignItems: 'baseline'
  },
  checkboxText: {
    marginTop: 5,
    color: '#000',
  },
  checkboxContainer: {
    borderColor: '#ffffff',
    opacity: .4,
    margin: 0,
    padding: 0,
    borderRadius: 0,
  },
  loginContainer: {
    marginTop: 20,
    flex: 1,
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
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: '#7c57bb',
    borderRadius: 5,
    height: 40,
  },
  textError: {
    color: 'red',
    fontStyle: 'italic',
    paddingTop: 3
  },

});
