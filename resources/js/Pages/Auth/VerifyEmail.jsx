import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Text } from '@mantine/core';
import AuthLayout from '@/Layouts/AuthLayout';

export default function VerifyEmail({ status }) {

    const { post, processing } = useForm({});

    const resend = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Verifikasi Email" />

            <div className='text-center mb-6 font-poppins'>
                <h1 className='text-2xl font-bold'>Verifikasi Email</h1>
                <p className='text-sm text-gray-500 mt-1'>
                    Kami telah mengirim link verifikasi ke email kamu.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <Text c="green" ta="center" mb="lg">
                    Link verifikasi baru telah dikirim ke email kamu!
                </Text>
            )}

            <form onSubmit={resend}>
                <Button 
                    type="submit" 
                    fullWidth 
                    color="orange" 
                    disabled={processing}
                    mb="md"
                >
                    Kirim Ulang Email Verifikasi
                </Button>
            </form>

            <Text ta="center" size="sm" mt="md">
                Salah email?{' '}
                <Link href={route('logout')} method="post" as="button" className='text-orange-500'>
                    Logout
                </Link>
            </Text>
        </AuthLayout>
    );
}
