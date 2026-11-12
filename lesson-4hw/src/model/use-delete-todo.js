import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export const useDeleteTodo = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: todoService.deleteTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => console.error('Не удалось удалить задачу', error),
    })
}
