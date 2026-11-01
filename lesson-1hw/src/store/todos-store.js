import { create } from "zustand";
import { toast } from "react-toastify";

export const useTodosStore = create((set) => {

    return {
        todoToggle: (id) => {
            set((state) => ({
                todos: state.todos.map((item) => {
                    return item.id === id ? { ...item, checkbox: !item.checkbox } : item
                })
            }))
        },

        todoAdd: (value) => {
            set((state) => {
                console.log(state.todos);
                // const newId = state.todos[state.todos.length - 1].id + 1;
                const newId = state.todos.length

                if (!state.userValue) {
                    toast.warning("Пожалуйста введите текст в поле ввода")
                    return {}
                }
                toast.success("Задача добавлена в Ваш список")

                return {
                    userValue: '',
                    todos: [
                        ...state.todos,
                        {
                            id: newId,
                            title: value,
                            checkbox: false
                        }
                    ]
                }
            })
        },

        todoDelete: (id) => {
            set((state) => {
                toast.error("Задача удалена из списка")
                return {
                    todos: state.todos.filter((item) => {
                        return item.id !== id
                    })
                }
            })
        },

        setUserValue: (value) => set({ userValue: value }),

        userValue: '',

        todos: []
    }
})
