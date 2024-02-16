import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/flightStyles';

const FlightInfo = ({ label, value }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

export default FlightInfo;
