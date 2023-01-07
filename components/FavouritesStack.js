import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { FAVOURITES_SCREEN, NOTES_SCREEN } from "../constants";
import NotesScreenAdd from "../screens/NotesScreenAdd";
import NotesScreenHome from "../screens/NotesScreenHome";
import NotesScreenDetails from "../screens/NotesScreenDetails";
import FavouriteScreenHome from "../screens/FavouriteScreenHome";

const FavStackNav = createStackNavigator();

export default function FavouriteStack() {
    return (
        <FavStackNav.Navigator>
            <FavStackNav.Screen
                name={FAVOURITES_SCREEN.Home}
                component={FavouriteScreenHome}
                options={{ headerShown: false }}
            />
            <FavStackNav.Screen
                name={NOTES_SCREEN.Add}
                component={NotesScreenAdd}
                options={{ headerShown: false }}
            />
            <FavStackNav.Screen
                name={NOTES_SCREEN.Details}
                component={NotesScreenDetails}
                options={{ headerShown: false }}
            />
        </FavStackNav.Navigator>
    );
}