import React, { Component } from 'react';
import { View, Text, FlatList, TouchableNativeFeedback, Animated, TextInput, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { styles } from '../styles/flightStyles'; // Import styles
import InfoView from '../component/InfoView'; // Import InfoView component
import { API_URL } from '../utility/constants'; // Import API_URL constant
import { formatFlight, sortFlightsByPrice } from '../utility/utils'; // Import utility functions
import Icon from 'react-native-vector-icons/MaterialIcons';

class FlightSearchResults extends Component {
    state = {
        flights: [],
        loading: true,
        error: null,
        sortedFlights: [],
        filteredFlights: [],
        sortByPriceAsc: true,
        buttonScale: new Animated.Value(1),
        searchText: ''
    };

    componentDidMount() {
        this.fetchFlights(); // Fetch flights data when component mounts
    }

    // Function to fetch flights data
    fetchFlights = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                // Format each flight in the data and update state
                const flights = data.data.result.map(formatFlight);
                this.setState({ flights, sortedFlights: flights, loading: false });
            })
            .catch(error => {
                // Handle error if fetching data fails
                this.setState({ error: error.message, loading: false });
            });
    };

    // Function to handle sorting flights by price
    sortFlightsByPrice = () => {
        const { sortedFlights, sortByPriceAsc } = this.state;
        // Sort flights by price and update state
        const { sortedFlights: sorted, sortByPriceAsc: newSortByPriceAsc } = sortFlightsByPrice(sortedFlights, sortByPriceAsc);
        this.setState({ sortedFlights: sorted, sortByPriceAsc: newSortByPriceAsc }); // Update sortedFlights directly
        // Animate button press
        Animated.sequence([
            Animated.timing(this.state.buttonScale, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(this.state.buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start();
    };

    // Function to handle search input change
    handleSearchChange = text => {
        const { sortedFlights } = this.state;
        // Filter flights based on search text and update state
        const filteredFlights = sortedFlights.filter(flight =>
            flight.displayData.airlines[0].airlineName &&
            flight.displayData.airlines[0].airlineName.toLowerCase().includes(text.toLowerCase())
        );
        this.setState({ searchText: text, filteredFlights });
    };

    render() {
        const { loading, error, buttonScale, searchText, filteredFlights } = this.state;
        let flightsToDisplay = this.state.sortedFlights; // Set the default list to display

        if (searchText) {
            // If there is search text, filter the flights
            flightsToDisplay = filteredFlights;

            // If there are no filtered flights, show the default message
            if (flightsToDisplay.length === 0) {
                return (
                    <View style={styles.container}>
                        {/* Search input field */}
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search by airline name..."
                                onChangeText={this.handleSearchChange}
                                value={searchText}
                            />
                        </View>
                        <Text>No Results Found</Text>
                    </View>
                );
            }
        }

        // Render loading spinner if data is still loading
        if (loading) {
            return (
                <View style={styles.container}>
                    <Spinner visible={loading} textContent={'Loading...'} textStyle={styles.spinnerText} />
                </View>
            );
        }

        // Render error message if there's an error
        if (error) {
            return <Text>Error: {error}</Text>;
        }

        // Render the main content once data is loaded
        return (
            <View style={styles.container}>
                {/* Search input field */}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by airline name..."
                    onChangeText={this.handleSearchChange}
                    value={searchText}
                />
                {/* FlatList to display flights */}
                <FlatList
                    style={{ flex: 1 }} // Allow the FlatList to take up all available space
                    data={flightsToDisplay}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <InfoView flight={item} />} // Render InfoView component for each item
                />
                {/* Sort button */}
                <TouchableNativeFeedback onPress={this.sortFlightsByPrice}>
                    <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
                        <Text style={styles.buttonText}>Sort by Price</Text>
                    </Animated.View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

export default FlightSearchResults;
