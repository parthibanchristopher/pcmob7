import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { addNewPost } from "../features/notesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotesScreenAdd() {
    const navigation = useNavigation();
    const [entryTitle, setEntryTitle] = useState("");
    const [entryContent, setEntryContent] = useState("");
    const [entryRatings, setEntryRatings] = useState("");
    const [entryFavourites, setEntryFavourites] = useState("");
    const dispatch = useDispatch();

    const currentDate = new Date().getDate();

    const canSave = [entryTitle, entryContent].every(Boolean);

    const [userID, setUserID] = useState("");

    async function loadUserID() {
        const user = await AsyncStorage.getItem("token");
        try {
            setUserID(user);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const removeListener = navigation.addListener("focus", loadUserID);
        loadUserID();
        return () => {
            removeListener();
        };
    }, []);

    async function savePost() {
        if (canSave) {
            try {
                const post = {
                    id: nanoid(),
                    userid: userID,
                    title: entryTitle,
                    date: currentDate,
                    content: entryContent,
                    ratings: entryRatings,
                    favourite: entryFavourites
                };
                await dispatch(addNewPost(post));
            } catch (error) {
                console.error("Failed to save the post: ", error);
            } finally {
                navigation.goBack();
            }
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name={"arrow-left"} size={24} color={"black"} />
            </TouchableOpacity>
            <TextInput
                style={styles.noteTitle}
                placeholder={"note title"}
                value={entryTitle}
                onChangeText={(text) => setEntryTitle(text)}
                selectionColor={"gray"}
            />
            <TextInput
                style={styles.noteBody}
                placeholder={"Add your notes"}
                value={entryContent}
                onChangeText={(text) => setEntryContent(text)}
                selectionColor={"gray"}
                multiline={true}
            />
            <TextInput
                style={styles.noteBody}
                placeholder={"Add your ratings eg: 4/5"}
                value={entryRatings}
                onChangeText={(text) => setEntryRatings(text)}
                selectionColor={"gray"}
            />
            <TextInput
                style={styles.noteBody}
                placeholder={"Add to favourites? Yes/No"}
                value={entryFavourites}
                onChangeText={(text) => setEntryFavourites(text)}
                selectionColor={"gray"}
            />
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.button} onPress={
                async () => await savePost()
            }>
                <Text style={styles.buttonText}>Add Note</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 60,
        padding: 25,
    },
    noteTitle: {
        fontSize: 24,
        fontWeight: "600",
        marginTop: 30,
        marginBottom: 25,
    },
    noteBody: {
        fontSize: 15,
        fontWeight: "400",
        paddingBottom: 20
    },
    button: {
        backgroundColor: "black",
        borderRadius: 15,
        width: "100%",
        marginBottom: 20,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "400",
        fontSize: 17,
        padding: 20,
        color: "white",
    },
});