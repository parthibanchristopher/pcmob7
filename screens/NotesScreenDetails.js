import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch } from "react-redux";
import { deletePostThunk, updatePostThunk } from "../features/notesSlice";

export default function NotesScreenDetails() {
    const route = useRoute();
    const titleInputRef = useRef();
    const navigation = useNavigation();
    const params = route.params;
    const [entryTitle, setEntryTitle] = useState(params.title);
    const [entryDate, setEntryDate] = useState(params.date);
    const [entryContent, setEntryContent] = useState(params.content);
    const [entryRatings, setEntryRatings] = useState(params.ratings);
    const [entryFavourites, setEntryFavourites] = useState(params.favourites);
    const [editable, setEditable] = useState(false);
    const dispatch = useDispatch();
    const id = params.id;

    async function updatePost(id) {
        try {
            const updatedPost = {
                id,
                title: entryTitle,
                content: entryContent,
                ratings: entryRatings,
                favourite: entryFavourites
            };
            await dispatch(updatePostThunk(updatedPost));
        } catch (error) {
            console.error("Failed to update the post: ", error);
        } finally {
            navigation.goBack();
        }
    }

    async function deletePost(id) {
        try {
            await dispatch(deletePostThunk(id));
        } catch (error) {
            console.error("Failed to update the post: ", error);
        } finally {
            navigation.goBack();
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome name={"arrow-left"} size={24} color={"black"} />
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                <TouchableOpacity style={{ marginLeft: 15 }}>
                    <FontAwesome name={"star"} size={24} color={"orange"} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setEditable(!editable);
                        if (!editable) {
                            setTimeout(() => titleInputRef.current.focus(), 100);
                        } else {
                            setTimeout(() => titleInputRef.current.blur(), 100);
                        }
                    }}
                    style={{ marginLeft: 15 }}
                >
                    <FontAwesome
                        name={"pencil"}
                        size={24}
                        color={editable ? "forestgreen" : "black"}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletePost(id)} style={{ marginLeft: 15 }}>
                    <FontAwesome name={"trash"} size={24} color={"black"} />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.noteTitle}
                placeholder={"Entry Title"}
                value={entryTitle}
                onChangeText={(text) => setEntryTitle(text)}
                selectionColor={"gray"}
                editable={editable}
                ref={titleInputRef}
            />
            <View style={styles.entryDetails}>
                <Text>Ratings: </Text>
                <TextInput
                    style={styles.noteBody}
                    placeholder={"Entry Rating"}
                    value={entryRatings}
                    onChangeText={(text) => setEntryRatings(text)}
                    selectionColor={"gray"}
                    editable={editable}
                    multiline={true}
                />
            </View>
            <View style={styles.entryDetails}>
                <Text>Favourite: </Text>
                <TextInput
                    style={styles.noteBody}
                    placeholder={"Favourite"}
                    value={entryFavourites}
                    onChangeText={(text) => setEntryFavourites(text)}
                    selectionColor={"gray"}
                    editable={editable}
                    multiline={true}
                />
            </View>
            <View style={styles.entryDetails}>
                <Text>Date: </Text>
                <TextInput
                    style={styles.noteBody}
                    placeholder={"Entry Date"}
                    value={entryDate}
                    onChangeText={(text) => setEntryDate(text)}
                    selectionColor={"gray"}
                    editable={false}
                    multiline={true}
                />
            </View>
            <View style={styles.entryDetails}>
                <Text>Details: </Text>
                <TextInput
                    style={styles.noteBody}
                    placeholder={"Entry Details"}
                    value={entryContent}
                    onChangeText={(text) => setEntryContent(text)}
                    selectionColor={"gray"}
                    editable={editable}
                    multiline={true}
                />
            </View>

            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.button} onPress={
                async () => updatePost(id)
            }>
                <Text style={styles.buttonText}>Save</Text>
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
    entryDetails: {
        paddingTop: 10,
        paddingBottom: 10
    },
    noteBody: {
        fontSize: 15,
        fontWeight: "400",
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