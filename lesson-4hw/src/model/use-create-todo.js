import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export const useCreateTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: todoService.createTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => console.error('Не удалось создать задачу', error),
    })
}
