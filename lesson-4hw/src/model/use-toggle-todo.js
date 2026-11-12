import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export const useToggleTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: todoService.toggleTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => console.error('Не удалось изменить статус', error),
    })
}
