import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
// import { useAuthStore } from "../../store/auth/auth-store";
import { useRegister } from "../../store/auth/register-store";

export const RegisterFormAuth = () => {

    // const registerData = useAuthStore((state) => state.registerData)
    // const setRegisterData = useAuthStore((state) => state.setRegisterData)

    const { handleSubmit, isPending } = useRegister()

    const { register, formState } = useForm({
        mode: 'onChange'
    });

    // const onSubmit = (data) => {
    //     setRegisterData(data)
    //     console.log(registerData);
    // }

    return (
        <>
            <form
                className="mx-auto my-8 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-center mb-4 text-xl font-bold leading-7 tabular-nums text-slate-900">Registretion</h2>

                <label className="mb-2 block text-sm font-semibold text-slate-700">Login</label>
                <input
                    placeholder="Enter your login"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20" {
                    ...register('login', {
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
                    {formState.errors.login?.message}
                </p>

                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                    placeholder="you@example.com"
                    className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                    {
                    ...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email"
                        }
                    })
                    }
                />
                <p className="mt-1 mb-4 min-h-5 text-sm text-red-600">
                    {formState.errors.email?.message}
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
                    Register
                </button>


                <Link to='/auth?step=login' className="inline-block text-blue-500 mt-4 hover:text-blue-700">
                    Do you have an account? Log In
                </Link>
            </form>
        </>
    )
}
