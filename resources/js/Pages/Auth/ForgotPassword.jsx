import AuthLayout from '@/Layouts/AuthLayout'
import { useForm, Head, Link } from '@inertiajs/react'
import { TextInput, Button } from '@mantine/core'

export default function ForgotPassword() {
  const { data, setData, post, processing, errors } = useForm({ email: '' })

  const submit = e => {
    e.preventDefault()
    post(route('password.email'))
  }

  return (
    <AuthLayout>
      <Head title="Lupa Password"/>
        <div className='text-center mb-6 font-poppins'>
            <h1 className='text-2xl font-bold'>Lupa Password</h1>
            <p className='text-sm text-gray-500 mt-1'>
                Isi Email
            </p>
        </div>

      <form onSubmit={submit} className="space-y-4">
        <TextInput
          label="Email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          error={errors.email}
        />

        <Button fullWidth type="submit" color="orange" loading={processing}>
          Kirim Link Reset
        </Button>
      </form>

      <p className="text-center mt-4">
        <Link href="/login" className="text-orange-500">
          Kembali ke Login
        </Link>
      </p>
    </AuthLayout>
  )
}
