import { TodoList } from "./components/TodoList/TodoList"
import { ToastContainer } from "react-toastify"

export const App = () => {
  return (
    <>
      <TodoList />
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  )
}
