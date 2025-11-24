import React from 'react';
import { Title, Text } from '@mantine/core';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
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
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Bagian Utama Footer: Grid 4 Kolom */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        
                        {/* Kolom 1: Logo, Judul, Alamat & Kontak */}
                        <div className="space-y-6">
                            <img src="/logo.png" alt="Logo NounouFood" className="w-40 h-auto" />
                            <Title order={3} className="text-gray-900 !text-2xl font-bold">
                                {t('pasti_enaknya', 'Pasti Enaknya!')}
                            </Title>

                            <div className="md:hidden flex flex-col md:flex-row md:items-start gap-15 md:gap-20">
                                {/* Alamat */}
                                <div className="flex items-start space-x-3 flex-shrink-0">
                                    <Icon icon="akar-icons:location" width={24} height={24}/>
                                    <Text className="text-gray-900 leading-relaxed">
                                        Botani Square Lantai UG, <br /> Yogya Junction Dramaga,<br />
                                        Home Production <br /> (Taman Cimanggu, Kota Bogor)
                                    </Text>
                                </div>

                                {/* WhatsApp */}
                                <div className="flex items-center space-x-2 mt-10">
                                    <Icon icon="ic:baseline-whatsapp" width={24} />
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
                                    <Icon icon="lucide:mail" width={24} />
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
                                    <Icon icon="lucide:instagram" width={24}/>
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
                            <Title order={4} className="font-bold text-gray-900 !text-xl mb-4">{t('navigasi', 'Navigasi')}</Title>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('home')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('pages', 'Pages')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('tentang_kami')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('services', 'Services')}</a></li>
                            </ul>
                        </div>

                        {/* Kolom 3: Quick Link */}
                        <div className="space-y-4">
                            <Title order={4} className="font-bold text-gray-900 !text-xl mb-4">{t('quick_link', 'Quick Link')}</Title>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('contact_us', 'Contact Us')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('faqs', 'FAQs')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('keranjang')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('pages', 'Pages')}</a></li>
                            </ul>
                        </div>

                        {/* Kolom 4: Marketplace */}
                        <div className="space-y-4">
                            <Title order={4} className="font-bold text-gray-900 !text-xl mb-4">{t('marketplace', 'Marketplace')}</Title>
                            <ul className="space-y-3">
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('shopee', 'Shopee')}</a></li>
                                <li><a href="#" className="text-gray-900 font-semibold hover:text-[#E43535] transition-colors">{t('tiktok', 'TikTok')}</a></li>
                            </ul>
                        </div>  
                    </div>

                    {/* Alamat Desktop */}
                    <div className='w-full hidden md:flex justify-between gap-2 h-20'>
                        <div className="flex gap-2 h-full items-center flex-shrink-0">
                            <Icon icon="akar-icons:location" width={24} height={24}/>
                            <p className="text-gray-900 leading-relaxed text-xs lg:text-base">
                                Botani Square Lantai UG, <br /> Yogya Junction Dramaga,<br />
                                        Home Production <br /> (Taman Cimanggu, Kota Bogor)
                            </p>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex gap-2 h-full items-center">
                            <Icon icon="ic:baseline-whatsapp" width={24} />
                            <a 
                                href="https://wa.me/6281936110396" 
                                className="text-gray-900 hover:text-[#E43535] transition-colors text-xs lg:text-base cursor-pointer" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                +62 819-3611-0396
                            </a>
                        </div>

                        {/* Email */}
                        <div className="flex gap-2 h-full items-center">
                            <Icon icon="lucide:mail" width={24} />
                            <a 
                                href="mailto:Nastiticahayagemilang@gmail.com" 
                                className="text-gray-900 hover:text-[#E43535] transition-colors text-xs lg:text-base cursor-pointer text-wrap"
                                target="_blank"
                            >
                                Nastiticahayagemilang@gmail.com
                            </a>
                        </div>

                        {/* Instagram */}
                        <div className="flex gap-2 h-full items-center">
                            <Icon icon="lucide:instagram" width={24}/>
                            <a 
                                href="https://instagram.com/Danggedang_official" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-900 hover:text-[#E43535] transition-colors text-xs lg:text-base cursor-pointer"
                            >
                                @Danggedang_official
                            </a>
                        </div>
                    </div>
                    
                    {/* Copyright Bar */}
                    <div className="border-t border-gray-700 pt-6 mt-8">
                        <div className="text-center">
                            <Text className="text-gray-700 text-sm">
                                {`Copyright © ${new Date().getFullYear()} NouNouFood.id. All rights reserved.`}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
