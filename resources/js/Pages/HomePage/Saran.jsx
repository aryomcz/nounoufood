import { useState, useEffect } from 'react';
import { Modal, Button, Textarea, Stack, Text } from '@mantine/core';
import { useForm, usePage } from '@inertiajs/react';

export default function Saran({ canGiveAdvice, maxSaran, currentSaran }) {
    const [modalOpened, setModalOpened] = useState(false);

    // Form Inertia
    const { data, setData, post, reset, processing, errors } = useForm({
        saran: ''
    });

    // Cek apakah user masih bisa menambahkan saran
    const canSubmit = canGiveAdvice && currentSaran < maxSaran;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('advice.store'), {
            onSuccess: () => {
                reset();
                setModalOpened(false);
            }
        });
    };

    return (
        <div className='w-full flex justify-center items-center'>
            {/* Tombol buka modal */}
            {canSubmit && (
                <Button color={"orange"} onClick={() => setModalOpened(true)}>
                    Berikan Saran
                </Button>
            )}

            {/* Modal Mantine */}
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Kirim Saran"
                centered
            >
                <form onSubmit={handleSubmit}>
                    <Stack>
                        <Textarea
                            placeholder="Tulis saranmu di sini"
                            value={data.saran}
                            onChange={(e) => setData('saran', e.target.value)}
                            error={errors.saran}
                            required
                        />
                        <Button color='orange' type="submit" fullWidth disabled={processing}>
                            {processing ? 'Mengirim...' : 'Kirim Saran'}
                        </Button>
                    </Stack>
                </form>
            </Modal>

            {!canSubmit && canGiveAdvice && (
                <Text mt="md" c="red">
                    Anda sudah mengirim semua saran yang diperbolehkan.
                </Text>
            )}
        </div>
    );
}
