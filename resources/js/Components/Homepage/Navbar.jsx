import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Group, Burger, Drawer, Button } from '@mantine/core';
import { usePage, Link, router } from '@inertiajs/react';
import classes from '../../../css/Navbar.module.css'; // import CSS
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { changeLanguage } from '@/i18n';


export default function Navbar() {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [opened, setOpened] = useState(false);
    const SCROLL_THRESHOLD = 80;
    const { t, i18n } = useTranslation();
    const [langDropdown, setLangDropdown] = useState(false);
     const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // menu items
    const menuItems = [
        { name: t('home'), path: '/', hash: '#home' },
        { name: t('produk_kami'), path: '/', hash: '#produk' },
        { name: t('tentang_kami'), path: '/', hash: '#about' },
        { name: t('toko'), path: '/', hash: '#toko' },
        { name: t('keranjang'), path: '/cart', hash: '' }, 
    ];

    // cek aktif
    const isActive = (path, hash = '') => {
        if (hash) {
            return window.location.hash === hash; // untuk #section
        } else {
            const currentPath = window.location.pathname.replace(/\/$/, '');
            const targetPath = path.replace(/\/$/, '');
            return currentPath === targetPath; // untuk full path
        }
    };

    const navbarVariants = {
        top: { width: '100%', borderRadius: 0, backgroundColor: 'rgba(252,248,241,0)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
        scrolled: { 
            width: window.innerWidth < 1024 ? "92%" : "75%",
            padding: window.innerWidth < 1024 ? "8px 16px" : "10px 40px",
            marginTop: "12px",
            borderRadius: 40,
            backgroundColor: "rgba(255,255,255,0.25)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
        }
    };

    const variants = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 14 } } };
    const containerVariants = { show: { transition: { staggerChildren: 0.12 } } };

    return (
        <>
            {/* NAVBAR */}
            <motion.div
                variants={navbarVariants}
                animate={scrolled ? "scrolled" : "top"}
                transition={{ type: "spring", stiffness: 90, damping: 18, mass: 0.6 }}
                className="h-12 sm:h-14 lg:h-20 flex items-center fixed z-20 transition-all"
                style={{ top: 0, left: "50%", transform: "translateX(-50%)", transition: 'background 0.5s ease-in-out' }}
            >
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-0 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer">
                        <img src="/logo.png" alt="Logo" className="w-16 h-auto" />
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden lg:flex lg:gap-8">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.hash ? item.path + item.hash : item.path}
                               className={`font-semibold ${classes['underline-anim']} 
                                ${isActive(item.path, item.hash)
                                    ? "text-white text-stroke-orange"
                                    : "text-gray-900"
                                }
                                hover:text-white hover:text-stroke-hover
                                `}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Login/Logout Desktop */}
                    <div className="hidden lg:flex">
                        {!auth.user ? (
                            <Link href={route('login')}>
                                <Button radius="xl" color="orange" size='md'>Login</Button>
                            </Link>
                        ) : (
                            <Button radius="xl" color="orange" size='md' onClick={() => router.post(route("logout"))}>Logout</Button>
                        )}
                    </div>

                    {/* Burger Mobile */}
                    <div className="lg:hidden">
                        <Burger opened={opened} onClick={() => setOpened(true)} />
                    </div>
                </div>
            </motion.div>

            {/* MOBILE DRAWER */}
            <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" size="80%" position="right">
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col space-y-6">
                    {menuItems.map((item) => (
                        <motion.div key={item.name} variants={variants}>
                            <a
                                href={item.hash ? item.path + item.hash : item.path}
                                className={`${classes['underline-anim']} text-lg font-semibold ${
                                    isActive(item.path, item.hash) ? 'active text-orange-600' : 'text-gray-900'
                                }`}
                                onClick={() => setOpened(false)}
                            >
                                {item.name}
                            </a>
                        </motion.div>
                    ))}
                    <motion.div variants={variants} className="pt-6 border-t">
                        {!auth.user ? (
                            <Link href={route('login')} className={`${classes['underline-anim']} text-lg font-semibold text-gray-900`} onClick={() => setOpened(false)}>Login</Link>
                        ) : (
                            <Link href={route('logout')} method="post" as="button" className={`${classes['underline-anim']} text-lg font-semibold text-gray-900`}>Logout</Link>
                        )}
                    </motion.div>
                </motion.div>
            </Drawer>
                <motion.div
                 // 🔥 bikin draggable
      drag
      dragMomentum={false} 
      dragElastic={0.15} 
      dragTransition={{ bounceStiffness: 200, bounceDamping: 12 }}

      // 🔥 posisi awal (misalnya kanan bawah)
      style={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 9999 }}

      // 🔥 ENTRY POP
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -6, 0], // floating effect
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: {
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 0.4,
        },
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}

      // 🔥 HOVER WIGGLE
    //   whileHover={{
    //     rotate: [-4, 4, -4, 0],
    //     transition: { duration: 0.35 },
    //   }}

      // 🔥 BOUNCE saat ditekan
      whileTap={{
        scale: 0.8,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 12,
        },
      }} className="fixed bottom-4 right-4 z-50">
                <div className="relative bg-white border border-solid border-primary-main rounded-full">
                    <Icon
                        icon="mdi:earth"
                        className="cursor-pointer text-gray-700 hover:text-orange-600"
                        width={36}
                        height={36}
                        style={{ color: "rgb(250 177 47 / var(--tw-border-opacity, 1))" }}
                        onClick={() => setLangDropdown(!langDropdown)}
                    />
                    {langDropdown && (
                        <div className="absolute bottom-12 right-0 w-28 bg-white shadow-lg rounded-md overflow-hidden z-50">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {changeLanguage('id'); setLangDropdown(false)}}
                            >
                                Indonesia
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => {changeLanguage('en'); setLangDropdown(false)}}
                            >
                                English
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
