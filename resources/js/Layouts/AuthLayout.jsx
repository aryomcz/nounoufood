import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex h-fit items-center justify-center pt-6 sm:pt-0 bg-gradient-to-br from-primary-60 via-primary-main to-secondary-main min-h-screen">
            <div className="overflow-hidden bg-white px-12 py-12 shadow-md h-full rounded-xl flex flex-col justify-center max-w-xl w-full my-5">
                {children}
            </div>
        </div>
    );
}
