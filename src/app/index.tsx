import { ListItem } from '@/components/ListItem';
import { useTasks } from '@/hooks/useTasks';
import { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Keyboard} from 'react-native'

export default function HomeScreen(){

    const [taskText, setTaskText] = useState<string>("");
    const{tasks, addTask, removeTask, editTask} = useTasks();

    const handleAdd = () => {
        addTask (taskText);
        setTaskText('');
        Keyboard.dismiss(); // Fecha o teclado após adicionar a tarefa
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de compras! 🛒</Text>
           
           <View style={styles.buttonContainer}>
            <TextInput style={styles.input}
             placeholder="Adicione um item..." 
             value={taskText}
             onChangeText={setTaskText}/>

            <TouchableOpacity 
            style={styles.button}
            onPress={handleAdd}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                   <ListItem 
                    task={item}
                     onRemove={removeTask}
                     onEdit={editTask} 
                 />
                )}
            />
        </View>
    )
}
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eb85abfe',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 60,
        backgroundColor: '#D81B60',
        padding: 12,
        borderRadius: 15,
        color: 'antiquewhite',
        marginTop:45
    },  
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#05a14e', 
        padding: 10,
        borderRadius: 5,
        marginLeft: 10, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    input: {
        flex: 1,
        height: 45,
        borderColor: '#D81B60',
        borderWidth: 1.5,
        backgroundColor: '#FAEBD7',
        borderRadius: 5,
        paddingHorizontal: 15,
        width: '70%',
        fontSize: 13
    }
})