import React from 'react'

import { Group, Text } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';

export default function Navbar() {
    return (
        <div className="bg-[#FFC256] h-20 flex items-center shadow-md">
            
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-0 flex justify-between items-center">
                
                <div className="flex items-center cursor-pointer">
                    
                    <img 
                        src="/logo.png" 
                        alt="Logo NounouFood" 
                        className="w-32 h-auto"
                    />
                </div>
                
                <Group spacing="xl" className="hidden md:flex"> 

                    <a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                        Home
                    </a>
                    <a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                        Produk Kami
                    </a>
                    <a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                        Tentang Kami
                    </a>
                    <a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                        Checkout
                    </a>
                    <a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                        Keranjang
                    </a>
                </Group>
                
                <a href="#" className="flex items-center space-x-2 text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                    
                    <a href="#" className="flex items-center space-x-2 text-gray-900 font-semibold hover:text-[#E43535] transition-colors">
                        {/* Ganti placeholder dengan Ikon Asli */}
                        <IconUserCircle 
                            size={28}       // Ukuran ikon, sesuaikan jika terlalu besar/kecil
                            stroke={1.5}    // Ketebalan garis ikon
                            className="text-gray-900" // Warna ikon (Tailwind)
                        />
                        <span className="hidden sm:inline">
                            Profile
                        </span>
                    </a>
                </a>
            </div>
        </div>
    );
}