import { useTodosStore } from '../../store/todos-store';
import cls from './TodoList.module.scss';
import { Button, Flex } from 'antd';
import { TodoCreate } from '../TodoCreate/TodoCreate'
import { DeleteFilled } from '@ant-design/icons';

export const TodoList = () => {


    const todos = useTodosStore((state) => state.todos)
    const todoToggle = useTodosStore((state) => state.todoToggle)
    const todoDelete = useTodosStore((state) => state.todoDelete)


    return (
        <>
            <div className={cls.todoList}>
                <TodoCreate />
                <h2>Список задач</h2>
                <Flex gap={10} vertical>
                    {
                        todos.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className={`${cls.todoList__item} ${item.checkbox ? cls.active : ''}`}
                                >
                                    <div className={cls.todoList__item__title}>
                                        <button
                                            className={`${cls.todoList__item__title__button}`}
                                            onClick={() => todoToggle(item.id)}
                                        >
                                            {item.checkbox && "✔"}
                                        </button>
                                        <h3>{item.title}</h3>
                                    </div>
                                    <Button size='small' color='danger' variant='solid' onClick={() => todoDelete(item.id)}><DeleteFilled /></Button>
                                </div>
                            )
                        })
                    }
                </Flex>
                {!todos.length && <span className={cls.todoList__empty}>У Вас нет задач</span>}
            </div>
        </>
    )
}
