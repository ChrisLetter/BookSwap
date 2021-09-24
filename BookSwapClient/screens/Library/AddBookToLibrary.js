import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { UserContext } from '../../AuthContext';

const AddBookToLibrary = ({ navigation }) => {
  const [title, setTitle] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [isbn, setIsbn] = useState(null);

  function handleSubmit() {
    if (title === null && authors === null && isbn === null) {
      Alert.alert('Please enter some valid input in the field');
    } else {
      navigation.navigate('Select a Book From The List', {
        FormInfo: { title: title, authors: authors, isbn: isbn },
      });
      setTitle(null);
      setAuthors(null);
      setIsbn(null);
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ paddingBottom: 30, paddingTop: 30 }}
        onPress={() => navigation.navigate('ScanISBN')}
      >
        <Text>Scan ISBN code with your camera</Text>
      </TouchableOpacity>
      <Text>Or fill the following form</Text>
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>Title</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>Authors</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={authors}
        onChangeText={setAuthors}
      />
      <Text style={{ paddingBottom: 30, paddingTop: 30 }}>ISBN</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'grey' }}
        value={isbn}
        onChangeText={setIsbn}
        // TODO set digit input instead of normal keyboard
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View>
          <Text style={{ paddingBottom: 30, paddingTop: 30 }}>Submit!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddBookToLibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
