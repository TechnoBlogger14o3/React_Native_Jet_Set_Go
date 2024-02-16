// Utility function to format a flight object
export const formatFlight = flight => {
    // Create a copy of the flight object
    const formattedFlight = { ...flight };
    // Format departure time and arrival time using the formatTime function
    formattedFlight.displayData.source.depTime = formatTime(flight.displayData.source.depTime);
    formattedFlight.displayData.destination.arrTime = formatTime(flight.displayData.destination.arrTime);
    // Return the formatted flight object
    return formattedFlight;
};

// Utility function to format an ISO 8601 date string to a localized date and time string
export const formatTime = isoTimeString => {
    // Create a new Date object from the ISO 8601 date string
    const date = new Date(isoTimeString);
    // Return the date and time string in the local time zone
    return date.toLocaleString();
};

// Utility function to sort flights by price
export const sortFlightsByPrice = (flights, sortByPriceAsc) => {
    // Create a sorted copy of the flights array based on fare
    const sorted = flights.slice().sort((a, b) => {
        // Sort in ascending order if sortByPriceAsc is true, otherwise sort in descending order
        return sortByPriceAsc ? a.fare - b.fare : b.fare - a.fare;
    });
    // Return the sorted flights array and the updated sortByPriceAsc flag
    return { sortedFlights: sorted, sortByPriceAsc: !sortByPriceAsc };
};
