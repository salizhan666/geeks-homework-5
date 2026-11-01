import { Input, Button } from "antd"
import cls from './TodoCreate.module.scss'
import { useTodosStore } from "../../store/todos-store"

export const TodoCreate = () => {

    const setUserValue = useTodosStore((state) => state.setUserValue)
    const todoAdd = useTodosStore((state) => state.todoAdd)
    const userValue = useTodosStore((state) => state.userValue)

    return (
        <div className={cls.todoCreate}>
            <h2>Создать задачу</h2>
            <div className={cls.todoCreate__add}>
                <Input
                    placeholder="Напишите Вашу задачу..."
                    value={userValue}
                    onChange={(e) => setUserValue(e.target.value)}
                />
                <Button
                    type="primary"
                    onClick={() => todoAdd(userValue) }
                >
                    Создать
                </Button>
            </div>
        </div>
    )
}
