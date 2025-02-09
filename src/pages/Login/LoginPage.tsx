import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

interface LoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<LoginForm>({
        defaultValues: {
            email: 'cliente@eps.com',
            password: '1234',
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: LoginForm) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                data
            );

            if (response.status === 200 && response.data) {
                alert('Login exitoso');
                navigate('/dating');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            console.error('Error en el login:', err);
            setError('Credenciales incorrectas o error en el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center pt-20">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full md:w-[300px]"
                >
                    <Input
                        {...register('email', {
                            required: 'Email is required',
                        })}
                        type="email"
                        placeholder="Email"
                        label="Email"
                    />
                    <Input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        type="password"
                        placeholder="Password"
                        label="Password"
                    />

                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="bg-[#16254c] hover:bg-blue-900 text-white py-2 px-4 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    );
};
