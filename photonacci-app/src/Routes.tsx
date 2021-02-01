import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./Home";
import Photo from './Photo';

const Stack = createStackNavigator();

 function Routes() {
     return(
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: '#fff'
                    }
                }}
            >
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Photo" component={Photo}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;