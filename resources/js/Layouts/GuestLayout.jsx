import ApplicationLogo from '@/Components/ApplicationLogo';
import Footer from '@/Components/Homepage/Footer';
import Navbar from '@/Components/Homepage/Navbar';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="w-full min-h-screen">
           <Navbar/>
            <div className="w-full overflow-hidden bg-white">
                {children}
            </div>
            <Footer />
        </div>
    );
}
