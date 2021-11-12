import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {
  useFonts,
  Rosario_400Regular_Italic,
} from '@expo-google-fonts/rosario';
import AppLoading from 'expo-app-loading';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LibraryStackParamList } from './../../interfaces/types';

type Props = NativeStackScreenProps<LibraryStackParamList, 'Insert A New Book'>;

const AddBookToLibrary = ({ navigation }: Props) => {
  const [fontsLoaded] = useFonts({ Rosario_400Regular_Italic });
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [isbn, setIsbn] = useState('');

  function handleSubmit() {
    if (title === null && authors === null && isbn === null) {
      Alert.alert('Please enter some valid input in the field');
    } else {
      navigation.navigate('Select a Book From The List', {
        FormInfo: { title: title, authors: authors, isbn: isbn },
      });
      setTitle('');
      setAuthors('');
      setIsbn('');
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header2}>
          Fill at least one field or scan the ISBN {'\n'}
          code with your camera
        </Text>
        <TextInput
          label="Title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          mode="outlined"
        />
        <TextInput
          label="Author"
          style={styles.input}
          value={authors}
          onChangeText={setAuthors}
          mode="outlined"
        />
        <TextInput
          label="ISBN"
          style={styles.input}
          value={isbn}
          onChangeText={setIsbn}
          mode="outlined"
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.buttonSearch}
          labelStyle={styles.label}
        >
          Search
        </Button>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate('Scan ISBN code')}
          style={styles.buttonISBN}
          labelStyle={styles.label}
          contentStyle={styles.buttonContent}
        >
          Scan isbn
        </Button>
      </View>
    );
  }
};

export default AddBookToLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  header2: {
    fontFamily: 'Rosario_400Regular_Italic',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  buttonISBN: {
    marginHorizontal: 20,
    marginTop: 170,
    padding: 10,
    fontSize: 20,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#5D3FD3',
  },
  buttonSearch: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: '#AA336A',
  },
  label: {
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: 'row-reverse',
  },
});
