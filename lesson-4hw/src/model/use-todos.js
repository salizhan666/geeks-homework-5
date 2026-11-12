import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { todoService } from '../service/todo-service.js'

export const useTodos = (page) => {
    return useQuery({
        queryKey: ['todos', { page }],
        queryFn: (meta) => todoService.getTasks({ page }, meta),
        placeholderData: keepPreviousData,
    })
}
