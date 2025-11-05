import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { TextInput, PasswordInput, Button, NumberInput, Textarea, Checkbox } from "@mantine/core";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
                <Head title="Login" />
                <h1 className="text-3xl font-bold text-center mb-3">Login</h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                  Belum Punya Akun? <Link href="/register" className="text-orange-500">Daftar Sekarang</Link>
                </p>
        
                <form onSubmit={submit} className="w-full">
                    <TextInput size="md" radius="md" label="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} mb="md" />
                    <PasswordInput size="md" radius="md" label="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password} mb="md" />
                    <Checkbox
                        label="Ingat"
                        checked={data.remember}
                        onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        color="orange"
                        mb="md"
                        />
                 {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-main focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <Button fullWidth type="submit" color="orange" disabled={processing}>Login</Button>
                </form>
            </AuthLayout>
    );
}
