import { useForm } from "react-hook-form"
import { data, Link } from "react-router-dom"
import { useLogin } from "../../store/auth/login-store"
// import { useAuthStore } from "../../store/auth-store"


export const LoginFormAuth = () => {

    // const loginData = useAuthStore((state) => state.loginData)
    // const setLoginData = useAuthStore((state) => state.setLoginData)

    const { register, formState } = useForm({
        mode: 'onChange'
    })

    const { handleSubmit, isPending } = useLogin()

    // const onSubmit = (data) => {
    //     setLoginData(data)
    //     console.log(loginData);
    // }

    return (
        <>
            <form
                className="mx-auto my-8 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center mb-4 text-xl font-bold leading-7 tabular-nums text-slate-900">Sign In</h2>

                <label className="mb-2 block text-sm font-semibold text-slate-700">Login</label>
                <input
                    placeholder="Enter your login"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20" {
                    ...register('loginOrEmail', {
                        required: 'Login is required',
                        minLength: {
                            value: 2,
                            message: 'Min length is 2'
                        },
                        pattern: {
                            value: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
                            message: 'Login must be 3–20 characters, start with a letter, and contain only Latin letters, numbers, or underscores'
                        }
                    })
                    }
                />
                <p className="mt-1 mb-4 min-h-5 text-sm text-red-600">
                    {formState.errors.loginOrEmail?.message}
                </p>

                <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                <input

                    placeholder="Example: Hello123"
                    type="password"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                    {
                    ...register('password', {
                        required: 'Password is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/,
                            message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number, with no spaces.'
                        }
                    })
                    }
                />
                <p className="mt-1 mb-4 min-h-5 text-sm text-red-600">
                    {formState.errors.password?.message}
                </p>

                <button type="submit" disabled={isPending} className="flex items-center justify-center gap-2 min-h-11 w-full cursor-pointer rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700 active:bg-teal-900">
                    Sign In
                </button>

                <Link to='/auth?step=register' className="inline-block text-blue-500 mt-4 hover:text-blue-700">
                    Don't have an account? Register
                </Link>
            </form>
        </>
    )
}
