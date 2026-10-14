import { Task } from "@/types";
import { Text } from "expo-router/build/react-navigation";
import React from "react";
import { StyleSheet,TextInput, TouchableOpacity, View } from "react-native";

interface ListItemProps {
    task: Task;
    onRemove: (id:string) => void;
    onEdit: (id: string, newText: string) => void;
}

export function ListItem({task, onRemove, onEdit}: ListItemProps) {
        //Estado para controlar a edição do item
    const [isEditing, setIsEditing] = React.useState(false);
    //Estado para controlar o texto temporário
    const [editedText, setEditedText] = React.useState(task.text);

    const handleSave = () => {
        onEdit(task.id, editedText);
        setIsEditing(false);
    }   

    return (
        <View style={styles.taskCard}>
            {isEditing ? (
        <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={setEditedText}
            autoFocus
        />
    ) : (
        <Text style={styles.taskText}>{task.text}</Text>
    )}

            <View style={styles.actionContainer}>
                {isEditing ? (
                    <TouchableOpacity 
                    style={[styles.actionButton, styles.saveButton]}
                    onPress={handleSave}
                   >
                        <Text style={styles.buttonText}>✏️</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => {
                        setIsEditing(true); }}
                   >
                        <Text style={styles.buttonText}>✅ </Text>
                    </TouchableOpacity>
                
                )}

                <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => onRemove(task.id)}>
                    <Text style={styles.buttonText}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    taskCard:{
        backgroundColor: '#D81B60',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#D81B60',
    },
    taskText: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
        marginRight: 10,
    },
    editInput: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        padding:0,
        marginRight: 10,
    },  
    actionContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    editButton: {
        backgroundColor: '#05a14e',
    },
    saveButton:{
        backgroundColor: '#05a14e',
    },
    deleteButton: {
        backgroundColor: '#D81B60',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})