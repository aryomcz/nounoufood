import React from 'react'
import { Title, Text } from '@mantine/core';
import { IconMapPin, IconBrandWhatsapp, IconMail, IconBrandInstagram } from '@tabler/icons-react';

export default function Footer() {
    const backgroundImageUrl = '/Footer.png'; 

    return (
        <footer 
            className="text-gray-900"
            style={{ 
                backgroundImage: `url(${backgroundImageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-[#FFC256]/90 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Bagian Utama Footer: Grid 4 Kolom */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        
                        {/* Kolom 1: Logo, Judul, Alamat & Kontak */}
                        <div className="space-y-6">
                            {/* Logo */}
                            <img 
                                src="/logo.png" 
                                alt="Logo NounouFood" 
                                className="w-40 h-auto" 
                            />
                            
                            {/* Judul "Pasti Enaknya!" */}
                            <Title order={3} className="text-gray-900 !text-2xl font-bold">
                                Pasti Enaknya!
                            </Title>

                            <div className="flex flex-col md:flex-row md:items-start gap-15 md:gap-20">
                                {/* Alamat */}
                                <div className="flex items-start space-x-3 flex-shrink-0">
                                    <IconMapPin size={24} stroke={2} className="text-gray-900 flex-shrink-0 mt-1" />
                                    <Text className="text-gray-900 leading-relaxed">
                                        Botani Square Lantai UG, <br /> Yogya Junction Dramaga,<br />
                                        Home Production <br /> (Taman Cimanggu, Kota Bogor)
                                    </Text>
                                </div>

                                {/* WhatsApp */}
                                <div className="flex items-center space-x-2 mt-10">
                                    <IconBrandWhatsapp size={24} stroke={2} className="text-gray-900" />
                                    <a 
                                        href="https://wa.me/6281936110396" 
                                        className="text-gray-900 hover:text-[#E43535] transition-colors whitespace-nowrap text-sm cursor-pointer" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        +62 819-3611-0396
                                    </a>
                                </div>

                                {/* Email */}
                                <div className="flex items-center space-x-2 mt-10">
                                    <IconMail size={24} stroke={2} className="text-gray-900" />
                                    <a 
                                        href="mailto:Nastiticahayagemilang@gmail.com" 
                                        className="text-gray-900 hover:text-[#E43535] transition-colors whitespace-nowrap text-sm cursor-pointer"
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Nastiticahayagemilang@gmail.com
                                    </a>
                                </div>

                                {/* Instagram */}
                                <div className="flex items-center space-x-2 mt-10">
                                    <IconBrandInstagram size={24} stroke={2} className="text-gray-900" />
                                    <a 
                                        href="https://instagram.com/Danggedang_official" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-gray-900 hover:text-[#E43535] transition-colors whitespace-nowrap text-sm cursor-pointer"
                                    >
                                        @Danggedang_official
                                    </a>
                                </div>
                            </div>
                        </div>
                            
                        {/* Kolom 2: Navigasi */}
                        <div className="space-y-4">
                            <Title order={4} className="font-bold text-gray-900 !text-xl mb-4">Navigasi</Title>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Home</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Pages</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Tentang Kami</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Services</a></li>
                            </ul>
                        </div>

                        {/* Kolom 3: Quick Link */}
                        <div className="space-y-4">
                            <Title order={4} className="font-bold text-gray-900 !text-xl mb-4">Quick Link</Title>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Contact Us</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">FAQs</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Cart</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Pages</a></li>
                            </ul>
                        </div>

                        {/* Kolom 4: Marketplace */}
                        <div className="space-y-4">
                            <Title order={4} className="font-bold text-gray-900 !text-xl mb-4">Marketplace</Title>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">Shopee</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">TikTok</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Copyright Bar */}
                    <div className="border-t border-gray-700 pt-6 mt-8">
                        <div className="text-center">
                            <Text className="text-gray-700 text-sm">
                                Copyright © {new Date().getFullYear()} NouNouFood.id. All rights reserved.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
