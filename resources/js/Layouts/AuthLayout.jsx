import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function AuthLayout({ children }) {
    return (
        <div className="flex h-fit items-center justify-center pt-6 sm:pt-0 bg-gradient-to-br from-[#FEF3E2] via-[#FAB12F] to-[#DD0303]">
            <div className="overflow-hidden bg-white px-24 py-12 shadow-md min-h-screen rounded-xl flex flex-col justify-center w-3/5">
                {children}
            </div>
        </div>
    );
}
