// layouts/DashboardLayout.jsx
import React, { useEffect, useState } from "react";
import { AppShell } from "@mantine/core";
import Sidebar from "./Sidebar";
import { Head, router } from "@inertiajs/react";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, title }) => {
    const [opened, { toggle }] = useDisclosure();
    const [darkMode, setDarkMode] = useState(false);
    useHotkeys([["ctrl+k", () => setDarkMode((prev) => !prev)]]);

    const theme = localStorage.getItem("theme");
    useEffect(() => {
        setDarkMode(theme ? true : false);
    }, []);
    useEffect(() => {
        localStorage.setItem("theme", darkMode ? 1 : "");
    }, [darkMode]);

    return (
        <AppShell
            withBorder={false}
            transitionDuration={"400"}
            navbar={{
                // width: "20%",
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened, desktop: opened },
            }}
            padding="md"
        >
            <AppShell.Navbar
                // transitionDuration={"2000ms"}
                visibleFrom="sm"
                className={`${darkMode ? "dark" : ""}`}
            >
                <Sidebar currentUrl={location.pathname} />
            </AppShell.Navbar>

            <AppShell.Main
                className={`${
                    darkMode ? "dark bg-dashboard-dark" : "bg-dashboard"
                } overflow-x-auto`}
            >
                <Head title={title} />
                <div className="w-full h-12 bg-white rounded-md !shadow-normal flex justify-between items-center mb-5 dark:bg-slate-800 dark:text-white transition duration-200 ">
                    <Navbar
                        toggle={toggle}
                        opened={opened}
                        setDarkMode={setDarkMode}
                        darkMode={darkMode}
                    />
                </div>
                <div className="w-full overflow-x-auto">{children}</div>
            </AppShell.Main>
        </AppShell>
    );
};

export default DashboardLayout;

