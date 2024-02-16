import React from 'react';
import { View } from 'react-native';
import FlightSearchResults from './src/screens/FlightSearchResults';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <FlightSearchResults />
    </View>
  );
};

export default App;