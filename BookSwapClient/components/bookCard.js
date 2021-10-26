import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { IconButton, Colors } from 'react-native-paper';

import {
  useFonts,
  Rosario_500Medium,
  Rosario_300Light_Italic,
} from '@expo-google-fonts/rosario';

const BookCard = (props) => {
  const [fontsLoaded] = useFonts({
    Rosario_500Medium,
    Rosario_300Light_Italic,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View
        /* I need this outerCard style because the shadows were not working
        on the LinearGradient, so I wrapped everything in a View */
        style={styles.outerCard}
      >
        {props.removeBtn ? (
          <TouchableOpacity>
            <IconButton
              style={styles.minusButton}
              icon="minus"
              color={Colors.white}
              size={33}
              onPress={() => props.removeBtn(props.bookObj.ISBN)}
            />
            <IconButton
              style={styles.minusButton}
              icon="minus-circle"
              color={Colors.red500}
              size={33}
              onPress={() => props.removeBtn(props.bookObj.ISBN)}
            />
          </TouchableOpacity>
        ) : null}
        {props.addBtn ? (
          <TouchableOpacity onPress={() => props.addBtn(props.bookObj)}>
            <LinearGradient
              colors={['#A73FD3', '#5D3FD3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              {props.bookObj.thumbnail || props.bookObj.imageLinks ? (
                <View style={styles.imageContainer}>
                  <Image
                    source={{
                      uri:
                        props.bookObj.thumbnail ||
                        props.bookObj.imageLinks.thumbnail,
                    }}
                    style={styles.image}
                  />
                </View>
              ) : null}
              <View style={styles.textContainer}>
                <Text style={styles.textTitle}>{props.bookObj.title}</Text>
                <Text style={styles.textAuthor}>{props.bookObj.authors}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <LinearGradient
            colors={['#AA336A', '#5D3FD3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            {props.bookObj.thumbnail || props.bookObj.imageLinks ? (
              <View style={styles.imageContainer}>
                <Image
                  source={{
                    uri:
                      props.bookObj.thumbnail ||
                      props.bookObj.imageLinks.thumbnail,
                  }}
                  style={styles.image}
                />
              </View>
            ) : null}
            <View style={styles.textContainer}>
              <Text style={styles.textTitle}>{props.bookObj.title}</Text>
              <Text style={styles.textAuthor}>{props.bookObj.authors}</Text>
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  outerCard: {
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    zIndex: -5,
  },
  card: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    // padding: 6,
    zIndex: -5,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 2,
  },
  textTitle: {
    color: 'white',
    paddingTop: 30,
    paddingBottom: 10,
    fontSize: 18,
    fontFamily: 'Rosario_500Medium',
    width: 240,
    textAlign: 'center',
  },
  textAuthor: {
    color: 'white',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Rosario_300Light_Italic',
  },
  imageContainer: {
    width: 90,
    height: 144,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 5,
    zIndex: -5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    zIndex: -5,
  },
  minusButton: {
    position: 'absolute',
    top: -11,
    left: -13,
    zIndex: 10,
  },
});

export default BookCard;
