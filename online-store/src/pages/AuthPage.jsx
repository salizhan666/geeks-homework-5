import { LoginFormAuth } from "../components/auth/LoginFormAuth"
import { RegisterFormAuth } from "../components/auth/RegisterFormAuth"
import { useAppSearchParams } from "../hooks/useAppSearchParams"

export const AuthPage = () => {
  const { get } = useAppSearchParams()

  const mode = get('step') || 'login'

  const form = {
    login: <LoginFormAuth />,
    register: <RegisterFormAuth />,

  }

  return form[mode]
}
