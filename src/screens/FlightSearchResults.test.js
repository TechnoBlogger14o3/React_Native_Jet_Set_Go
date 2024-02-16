import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FlightSearchResults from './FlightSearchResults';

const sampleData = {
    "data": {
        "result": [
            {
                "id": "1",
                "fare": 3840,
                "displayData": {
                    "source": {
                        "airport": {
                            "cityCode": "DEL",
                            "cityName": "Delhi",
                            "terminal": "3",
                            "airportCode": "DEL",
                            "airportName": "Indira Gandhi Airport",
                            "countryCode": "IN",
                            "countryName": "India"
                        },
                        "depTime": "2023-03-31T06:20"
                    },
                    "airlines": [
                        {
                            "airlineCode": "AB",
                            "airlineName": "JetSpice",
                            "flightNumber": "1234"
                        }
                    ],
                    "stopInfo": "Non stop",
                    "destination": {
                        "airport": {
                            "cityCode": "BOM",
                            "cityName": "Mumbai",
                            "terminal": "2",
                            "airportCode": "BOM",
                            "airportName": "Mumbai",
                            "countryCode": "IN",
                            "countryName": "India"
                        },
                        "arrTime": "2023-03-31T08:40"
                    },
                    "totalDuration": "2h 20m"
                }
            }
        ]
    },
    "message": "Success"
};

jest.mock('react-native-loading-spinner-overlay', () => 'MockedSpinner');
jest.mock('../utility/utils', () => ({
    formatFlight: jest.fn(data => data),
    sortFlightsByPrice: jest.fn((flights, asc) => {
        if (asc) return { sortedFlights: flights.sort((a, b) => a.fare - b.fare), sortByPriceAsc: !asc };
        else return { sortedFlights: flights.sort((a, b) => b.fare - a.fare), sortByPriceAsc: !asc };
    })
}));

describe('FlightSearchResults', () => {
    test('renders loading spinner when loading is true', () => {
        const { getByText } = render(<FlightSearchResults />);
        expect(getByText('Loading...')).toBeTruthy();
    });

    test('renders search input and sort button when data is loaded', async () => {
        const { getByPlaceholderText, getByText } = render(<FlightSearchResults />);
        expect(getByPlaceholderText('Search by airline name...')).toBeTruthy();
        expect(getByText('Sort by Price')).toBeTruthy();
    });

    test('filters flights when search text is entered', async () => {
        const { getByPlaceholderText, getByText } = render(<FlightSearchResults />);
        const searchInput = getByPlaceholderText('Search by airline name...');
        fireEvent.changeText(searchInput, 'JetSpice');
        expect(getByText('JetSpice')).toBeTruthy(); // Assuming InfoView component renders airline name
    });

    test('sorts flights by price when sort button is pressed', async () => {
        const { getByText } = render(<FlightSearchResults />);
        const sortButton = getByText('Sort by Price');
        fireEvent.press(sortButton);
        expect(sortFlightsByPrice).toHaveBeenCalledTimes(1);
    });

});
