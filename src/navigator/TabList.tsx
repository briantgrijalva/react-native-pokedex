// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
    HomeScreen: undefined,
    PokemonScreen: { SimplePokemon: SimplePokemon, color: string }
}



const Stack = createStackNavigator<RootStackParams>();

export const TabList = () => {
  return (
    // <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="PokemonScreen" component={PokemonScreen}/>
        </Stack.Navigator>
    // </NavigationContainer>
  );
};
