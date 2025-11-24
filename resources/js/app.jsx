import '../css/app.css';
import './bootstrap';
import "@mantine/core/styles.css";
import '@mantine/dropzone/styles.css';
import "@mantine/dates/styles.css";
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { createInertiaApp } from '@inertiajs/react';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from "@mantine/dates";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import dayjs from "dayjs";
import "dayjs/locale/id";
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

dayjs.locale("id");

const appName = import.meta.env.VITE_APP_NAME || 'Nounoufood';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
             <I18nextProvider i18n={i18n}>        
                <MantineProvider>
                    <Notifications />
                    <ModalsProvider>
                    <DatesProvider settings={{ locale: "id" }}>
                        <App {...props} />
                    </DatesProvider>
                    </ModalsProvider>
                </MantineProvider>
             </I18nextProvider>
        );
    },
    progress: {
        color: '#FAB12F',
    },
});
