import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import bgImage from '../assets/images/photo_bg.png';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  //   const navigation = useNavigation();

  const handleRegister = () => {
    console.log('Register:', {
      login: login,
      email: email,
      password: password,
    });
    setLogin('');
    setEmail('');
    setPassword('');

    navigation.navigate('BottomNavigator');
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }
    } catch (error) {
      console.log('RegistrationScreen => ImagePicker: ', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.flexContainer}
    >
      <View style={{ ...styles.container, ...styles.flexContainer }}>
        <ImageBackground style={styles.bgImage} source={bgImage}>
          <KeyboardAvoidingView
            style={styles.flexContainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={-100}
          >
            <View style={{ ...styles.wrapContainer, ...styles.flexContainer }}>
              <View style={{ ...styles.boxAuth }}>
                <View style={styles.avatarBox}>
                  <TouchableOpacity style={styles.plusBtn} onPress={pickImage}>
                    <AntDesign
                      name="pluscircleo"
                      style={styles.pluscircleo}
                      size={25}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.title}>Реєстрація</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={[
                      styles.inputData,
                      focusedInput === 'login' && styles.isFocus,
                    ]}
                    onFocus={() => setFocusedInput('login')}
                    onBlur={() => setFocusedInput(null)}
                    value={login}
                    onChangeText={setLogin}
                    placeholder="Логін"
                  ></TextInput>

                  <TextInput
                    style={[
                      styles.inputData,
                      focusedInput === 'email' && styles.isFocus,
                    ]}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    placeholder="Адреса електронної пошти"
                  ></TextInput>

                  <View style={styles.divPassword}>
                    <TextInput
                      style={[
                        styles.inputData,
                        focusedInput === 'password' && styles.isFocus,
                      ]}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      autoCompleteType="password"
                      autoCorrect={false}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Пароль"
                      secureTextEntry={true}
                    ></TextInput>

                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.showPasswordTextStyle}>
                        {showPassword ? 'Приховати' : 'Показати'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.btnRegister}
                  onPress={handleRegister}
                >
                  <Text style={styles.btnRegisterText}>Зареєструватися</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnLogin}
                  // onPress={() => navigation.navigate('LoginScreen')}
                >
                  <Text style={styles.btnLoginText}>Вже є аккаунт? Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },

  container: {
    position: 'relative',
    fontFamily: 'Roboto-Bold',
  },

  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  wrapContainer: {
    justifyContent: 'flex-end',
  },

  boxAuth: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    paddingBottom: 78,
  },

  avatarBox: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 16,
    marginTop: -60,
  },

  plusBtn: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 14,
    marginRight: -13,
  },

  pluscircleo: {
    color: '#FF6C00',
  },

  title: {
    marginTop: 32,
    backgroundColor: '#ffffff',
    color: '#212121',

    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 35,
  },

  inputContainer: {
    paddingTop: 32,
    rowGap: 16,
    paddingBottom: 43,
    backgroundColor: '#ffffff',
  },

  inputData: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 6,
    borderWidth: 1,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
  },

  divPassword: {
    position: 'relative',
  },

  showPasswordTextStyle: {
    position: 'absolute',
    bottom: 15,
    right: 32,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#1B4371',
  },

  btnRegister: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    marginHorizontal: 16,
    paddingVertical: 16,
  },

  btnRegisterText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#FFFFFF',
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  btnLogin: {
    marginTop: 16,
  },

  btnLoginText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#1B4371',
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  isFocus: {
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
});

export default RegistrationScreen;
