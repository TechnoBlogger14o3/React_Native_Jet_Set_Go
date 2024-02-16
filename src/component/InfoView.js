import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/flightStyles';
import FlightInfo from './FlightInfo'; // Import the FlightInfo component

const InfoView = ({ flight }) => {
    // Array of labels and corresponding values
    const flightInfo = [
        { label: 'Flight Number', value: flight.displayData.airlines[0].flightNumber },
        { label: 'Flight Name', value: flight.displayData.airlines[0].airlineName },
        { label: 'Departure', value: flight.displayData.source.airport.cityName },
        { label: 'Destination', value: flight.displayData.destination.airport.cityName },
        { label: 'Departure Time', value: flight.displayData.source.depTime },
        { label: 'Arrival Time', value: flight.displayData.destination.arrTime },
        { label: 'Duration', value: flight.displayData.totalDuration },
        { label: 'Stop Info', value: flight.displayData.stopInfo },
        { label: 'Fare', value: flight.fare }
    ];

    return (
        <View style={styles.flightContainer}>
            {/* Render FlightInfo component for each label and value pair */}
            {flightInfo.map((info, index) => (
                <FlightInfo key={index} label={info.label} value={info.value} />
            ))}
        </View>
    );
};

export default InfoView;
