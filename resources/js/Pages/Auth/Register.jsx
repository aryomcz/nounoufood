import { TextInput, PasswordInput, Button, Textarea } from "@mantine/core";
import { router, Link, Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useState } from "react";

export default function Register() {
  const { data, setData, post, processing, errors, transform } = useForm({
    nama: '',
    no_hp: '',
    alamat: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [phone, setPhone] = useState("");
  
  function normalizePhone(input) {
    if (!input) return "";

    // hilangkan semua karakter kecuali angka
    let cleaned = input.replace(/\D/g, "");

    // hilangkan leading "0" setelah kode negara (contoh: 620812 → 62812)
    cleaned = cleaned.replace(/^(\d{1,3})0+/, "$1");

    return cleaned;
  }

  transform((data) => ({
    ...data,
    no_hp: normalizePhone(data.no_hp) // ← aman juga
  }));
  

  function submit(e) {
    e.preventDefault();
    post(route('register'));
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

          <TextInput size="md" radius="md" label="Nama Lengkap"
            value={data.nama}
            onChange={(e) => setData('nama', e.target.value)}
            error={errors.nama}
            mb="md"
          />

          <TextInput size="md" radius="md" label="Email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            error={errors.email}
            mb="md"
          />

          <Textarea autosize size="md" radius="md" label="Alamat"
            value={data.alamat}
            onChange={(e) => setData('alamat', e.target.value)}
            error={errors.alamat}
            mb="md"
          />

          <div className="mb-4">
            <label className="block mb-1 font-medium">Nomor Telepon</label>

              <PhoneInput
                placeholder="Masukkan nomor telepon"
                value={data.no_hp}
                onChange={(value) => 
                  setData("no_hp", value)
                }
                defaultCountry="ID"
                international
                className="w-full [&>input]:w-full [&>input]:rounded-lg [&>input]:border-[#ced4da] focus:outline-none"
              />

            {errors.no_hp && (
              <p className="text-red-500 text-sm mt-1">{errors.no_hp}</p>
            )}
          </div>


          <PasswordInput size="md" radius="md" label="Password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            error={errors.password}
            mb="md"
          />

          <PasswordInput size="md" radius="md" label="Konfirmasi Password"
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            error={errors.password_confirmation}
            mb="lg"
          />

          <Button fullWidth type="submit" color="orange" disabled={processing}>
            Create Account
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
