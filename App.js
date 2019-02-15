/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView, TextInput, Alert, Dimensions } from 'react-native';
import Logo from './img_src/Logo.png'
import { CheckBox } from 'react-native-elements'
import Button from 'react-native-button'

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
      checked: false,
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
    var { buttonIsDisabled, password } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = this.state.email;
    var passwordLength = this.state.password.length;

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
    if (reg.test(email) && passwordLength > 5 && passwordLength < 13) {
      this.state.buttonIsDisabled = false
    }
    else {
      this.state.buttonIsDisabled = true
    }
  }

  passwordEditingHandler() {
    var { buttonIsDisabled, email } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passwordLength = this.state.password.length;
    var emailLength = this.state.email;
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
    if (reg.test(emailLength) && passwordLength > 5 && passwordLength < 13) {
      this.state.buttonIsDisabled = false
    }
    else {
      this.state.buttonIsDisabled = true
    }
  }


  render() {

    return (
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} >

          <View style={styles.logo}>
            <Image source={Logo} />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.textLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="Email"
                keyboardType="email-address"
                placeholder="Input email address"
                value={this.state.email}
                placeHolderTextStyle={styles.placeHolderHint}
                onChangeText={(email) => { this.onChangeEmailHandler(email) }}
                onEndEditing={(email) => { this.emailEditingHandler() }}
                underlineColorAndroid='rgba(0,0,0,0)' />
            </View>

            <Text style={styles.textError}>
              {this.state.errorEmail}
            </Text>
            <Text style={styles.textLabel}>Password</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                label="Password"
                placeholder="Input password"
                value={this.state.password}
                placeHolderTextStyle={styles.placeHolderHint}
                onChangeText={(password) => { this.onChangePasswordHandler(password) }}
                onEndEditing={(password) => { this.passwordEditingHandler() }}
                secureTextEntry
                underlineColorAndroid='rgba(0,0,0,0)' />
            </View>

            <Text style={styles.textError}>
              {this.state.errorPassword}
            </Text>

            <View style={{ flexDirection: 'row' }}>

              <CheckBox
                title='Remember me'
                textAlign='center'
                containerStyle={{ marginLeft: 10, marginRight: 20, padding: 0, borderWidth: 0, backgroundColor: 'white' }}
                checkedColor='#7c57bb'
                uncheckedColor='#7c57bb'
                checked={this.state.checked}
                onPress={() => this.setState({ checked: !this.state.checked })} />
            </View>

            <View style={styles.buttonContainer}>
              <Button style={{ fontSize: 20, color: 'white' }} onPress={onButtonPress}
                disabled={this.state.buttonIsDisabled}
                disabledContainerStyle={{ backgroundColor: '#dddddd' }}
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 7, backgroundColor: '#7c57bb' }}
              >Sign In</Button>
            </View>

          </View>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
  },
  placeHolderHint: {
    fontStyle: 'italic'
  },
  buttonContainer: {
    marginTop: 20,
  },
  loginContainer: {
    padding: 20,
    width: Dimensions.get('window').width,
    marginTop: 20,
  },
  textLabel: {
    marginTop: 5,
    color: '#000',
    fontSize: 20,
    fontWeight: '600'
  },
  logo: {
    alignItems: 'center',
    marginTop: 50,
    resizeMode: 'contain'
  },
  inputContainer: {
    borderRadius: 7,
    paddingLeft: 8,
    borderWidth: 1.5,
    borderColor: '#7c57bb',
  },
  textError: {
    marginLeft: 4,
    color: 'red',
    fontStyle: 'italic',
  },

});
