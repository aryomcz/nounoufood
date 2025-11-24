import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Homepage/Footer';
import Navbar from '@/Components/Homepage/Navbar';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="w-full min-h-screen relative">
           <Navbar/>
            <div className="w-full overflow-hidden bg-tertiary-80 pb-10">
                {children}
            </div>
            <Footer />
        </div>
    );
}
