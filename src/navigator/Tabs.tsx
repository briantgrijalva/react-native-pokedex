import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabList } from './TabList';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabSearchScrean } from './TabSearch';

const Tab = createBottomTabNavigator();



export const Tabs = () => {
  return (
    <Tab.Navigator
        // eslint-disable-next-line react-native/no-inline-styles
        sceneContainerStyle={{
            backgroundColor: 'white',
        }}
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#5856D6',
            tabBarLabelStyle: {
                marginBottom: (Platform.OS === 'ios') ? 0 : 10,
            },
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255, 0.92)',
                borderWidth: 0,
                elevation: 0,
                height: (Platform.OS === 'ios') ? 80 : 60,
            },
        }}
    >
        <Tab.Screen
            name="Home"
            component={TabList}
            options={{
                tabBarLabel: 'Listado',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color}) => (
                    <Icon
                        color={color}
                        size={25}
                        name="list-outline"
                    />
                ),
            }}
        />
        <Tab.Screen
            name="SearchScreen"
            component={TabSearchScrean}
            options={{
                tabBarLabel: 'Busqueda',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color}) => (
                    <Icon
                        color={color}
                        size={25}
                        name="search-outline"
                    />
                ),
            }}
        />
    </Tab.Navigator>
  );
};
