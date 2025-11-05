import { TextInput, PasswordInput, Button, NumberInput, Textarea } from "@mantine/core";
import { router, Link, Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
        nama: '',
        no_hp: '',
        alamat: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    console.log(data);
    

    function submit(e) {
        e.preventDefault();
        post(route('register')); // BE Laravel punya route register default breeze
    }
    
  return (
    <AuthLayout>
        <Head title="Register" />
        <div className="font-poppins">
        <h1 className="text-3xl font-extrabold text-center mb-3">Daftar</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Sudah Punya Akun? <Link href="/login" className="text-orange-500">Log In</Link>
        </p>

        <form onSubmit={submit} className="w-full">

          <TextInput size="md" radius="md" label="Nama Lengkap"  value={data.nama} onChange={(e) => setData('nama', e.target.value)} error={errors.nama} mb="md" />
          <TextInput size="md" radius="md" label="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} mb="md" />
          <Textarea size="md" radius="md" label="Alamat" value={data.alamat} onChange={(e) => setData('alamat', e.target.value)} error={errors.alamat} mb="md" />
          <TextInput size="md" radius="md" label="No. Telp" value={data.no_hp} onChange={(e) => setData('no_hp', e.target.value)} error={errors.no_hp} mb="md" />

          <PasswordInput size="md" radius="md" label="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password} mb="md" />
          <PasswordInput size="md" radius="md" label="Konfirmasi Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation} mb="lg" />

          <Button fullWidth type="submit" color="orange" disabled={processing}>Create Account</Button>
        </form>
        </div>
    </AuthLayout>
  )
}
