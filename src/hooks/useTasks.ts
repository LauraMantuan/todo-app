import {Task} from "@/types";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY= "@task_key"

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    //1. Carregar dados ao iniciar 
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const savedTasks = await AsyncStorage.getItem('TASKS_KEY');
                if (savedTasks) {
                    setTasks(JSON.parse(savedTasks));
                }
            } catch (error) {
                console.error('Erro ao carregar tarefas:', error);
            } finally {
                setIsInitialLoad(false);
            }
        };

        loadTasks();
    }, []); 

    //2. Salvar dados quando houver mudanças
    useEffect(() => {
        if (isInitialLoad) return; // Evita salvar durante o carregamento inicial 
            const saveTasks = async () => {
                try {
                    await AsyncStorage.setItem('TASKS_KEY', JSON.stringify(tasks));
                } catch (error) {
                    console.error('Erro ao salvar tarefas:', error);
                }
            }; 
            saveTasks();
        }, [tasks, isInitialLoad])
    
    //3. Função adionar tarefas
    const addTask = (text: string) => {
        if (text.trim() === "") return; // Evita adicionar tarefas vazias
        const newTask: Task = {
            id: Date.now().toString(),
            text
        };
        //Atualiza pegando o estado anterior e adicionando a nova tarefa
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }         
   
    
    //4. Função remover tarefas
    const removeTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter(item => item.id !== id));
    };

    //5. Função editar tarefas
    const editTask = (id: string, newText: string) => {
       if (newText.trim() === "") return;
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, text: newText } : task
            )
        );
    }

     return { tasks, addTask, removeTask, editTask };


}