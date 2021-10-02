/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Test = () => {
    return (
        <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Hello World!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#ffffff',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
    },
});

export default Test;
