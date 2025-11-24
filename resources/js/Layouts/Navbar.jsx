import { Link, router, usePage } from "@inertiajs/react";
import { Avatar, Burger, Button, Drawer, Flex, Image, Menu, Text } from "@mantine/core";
import React from "react";
import Sidebar from "./Sidebar";
// import { IconHome } from "@tabler/icons-react";

const Navbar = ({ toggle, opened, setDarkMode, darkMode }) => {

    const { auth } = usePage().props

    return (
        <>
            <Burger
                onClick={toggle}
                size="sm"
                className="ml-2 duration-[400ms]"
                color={`${darkMode ? "white" : "black"}`}
            />
            <Drawer hiddenFrom="sm" opened={opened} onClose={toggle}>
                <Sidebar currentUrl={location.pathname}/>
            </Drawer>

            <div className="mr-2 cursor-pointer">
                <div className="flex items-center">
                    <Button
                        variant="transparent"
                        onClick={() => setDarkMode((val) => !val)}
                    >
                        {/* <IconMoon
                            color="white"
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-1000 ${
                                darkMode
                                    ? "opacity-1"
                                    : "opacity-0 animate-spin"
                            }`}
                        />
                        <IconSun
                            color="black"
                            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-1000 ${
                                darkMode
                                    ? "opacity-0 animate-spin"
                                    : "opacity-1"
                            }`}
                        /> */}
                    </Button>
                    <Menu
                        width={200}
                        transitionProps={{
                            transition: "pop-top-right",
                            duration: 150,
                        }}
                    >
                        <Menu.Target>
                            <Avatar
                              radius="xl"
                              color="orange"
                              bd={"1px solid orange"}
                              size="md">
                                {auth.user.nama.slice(0, 2).toUpperCase()}
                            </Avatar>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>
                                <div className="flex gap-2 items-center">
                                    {/* <div className="rounded-full w-10 h-10 border-2"></div> */}
                                    {/* <Image
                                        src={profile}
                                        className="!w-10 !h-10 object-contain !rounded-full"
                                    /> */}
                                    <div>
                                        {/* <Text size="sm">{`${
                                            user?.first_name ?? ""
                                        } ${user?.last_name ?? ""}`}</Text>
                                        <Text size="sm" className="!opacity-70">
                                            {user?.role?.name ?? ""}
                                        </Text> */}
                                    </div>
                                </div>
                            </Menu.Label>
                            <Menu.Divider />
                            <Menu.Item onClick={() => router.get("/")}>
                                <Flex align={"center"} gap={8}>
                                    {/* <IconHome size={"1.2rem"} color="grey" /> */}
                                    <div>Home</div>
                                </Flex>
                            </Menu.Item>
                            <Menu.Item
                                onClick={() =>
                                    router.get(route("profile.edit"))
                                }
                            >
                                <Flex align={"center"} gap={8}>
                                    {/* <IconUser size={"1.2rem"} color="grey" /> */}
                                    <div>Profile</div>
                                </Flex>
                            </Menu.Item>
                            <Menu.Item
                                onClick={() => {
                                    router.post(route("logout"));
                                }}
                            >
                                <Flex align={"center"} gap={8}>
                                    {/* <IconLogout2 size={"1.2rem"} color="grey" /> */}
                                    <Link href={route('logout')} method="post" as="button" className='text-orange-500'>
                    Logout
                </Link>
                                </Flex>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>
        </>
    );
};

export default Navbar;
