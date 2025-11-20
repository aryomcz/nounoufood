import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'poppins': ['Poppins', 'sans-serif'],
                'poppins-2': ['Poppins-2', 'sans-serif'],
            },
            colors: {
                'primary-60': "#FEEFD5",
                'primary-70': "#FDE0AC",
                'primary-80': "#FCD082",
                'primary-90': "#FFC256",
                'primary-main': "#FAB12F",
                'primary-110': "#C88E26",
                'primary-120': "#966B1C",
                'primary-130': "#654713",
                'primary-140': "#332409",
                'secondary-60': "#F8CDCD",
                'secondary-70': "#F19A9A",
                'secondary-80': "#EB6868",
                'secondary-90': "#E43535",
                'secondary-main': "#DD0303",
                'secondary-110': "#B10202",
                'secondary-120': "#850202",
                'secondary-130': "#580101",
                'secondary-140': "#2C0101",
                'tertiary-60': "#FFFDF9",
                'tertiary-70': "#FFFAF3",
                'tertiary-80': "#FEF8EE",
                'tertiary-90': "#FEF5E8",
                'tertiary-main': "#FEF3E2",
                'tertiary-110': "#EFD9B6",
                'tertiary-120': "#E0BE8A",
                'tertiary-130': "#D0A45E",
                'tertiary-140': "#C18932",
                'tertiary-150': "#B26F06",
                dashboard: "rgb(245,245,249)",
                "dashboard-dark": "rgb(15 23 42)",

            },
        },
    },

    plugins: [forms],
};
