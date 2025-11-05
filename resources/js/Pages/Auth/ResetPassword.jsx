import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <AuthLayout>
        <Head title="Reset Password" />

        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Masukkan password baru anda</p>

        <form onSubmit={submit} className="w-full">

            <TextInput
                size="md"
                radius="md"
                label="Email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
                mb="md"
                readOnly
            />

            <PasswordInput
                size="md"
                radius="md"
                label="Password Baru"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                mb="md"
            />

            <PasswordInput
                size="md"
                radius="md"
                label="Konfirmasi Password Baru"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
                mb="lg"
            />

            <Button fullWidth type="submit" color="orange" loading={processing}>
                Reset Password
            </Button>
        </form>
        </AuthLayout>
    )
}
