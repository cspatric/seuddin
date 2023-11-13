import {useMemo, useState, useCallback} from 'react';
import Dropdown from '@/Components/Dropdown';
import { Link, router } from '@inertiajs/react';
import ParticipantIcon from '@/Assets/icons/participant.svg?react'
import CompanyIcon from '@/Assets/icons/company.svg?react'
import ConsultantIcon from '@/Assets/icons/assignment-ind.svg?react'
import SupervisorAccountIcon from '@/Assets/icons/supervisor-account.svg?react'
import SettingsAccountBoxIcon from '@/Assets/icons/settings-account-box.svg?react'
import ProcessIcon from '@/Assets/icons/process.svg?react'
import AdminIcon from '@/Assets/icons/admin.svg?react'
import Logo from '@/Assets/logo.svg?react'
import MenuIcon from '@/Assets/icons/menu.svg?react'
import MenuOpenIcon from '@/Assets/icons/menu-open.svg?react'
import classNames from "classnames";
import {hasPermission} from "@/Helpers/index.js";

export default function Authenticated({ user, header, children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {page} = router

    const userHasPermission = useCallback((permissionSlug) => {
        if (!user) return;
        return hasPermission(permissionSlug, user.roles);
    }, [user])

    const menuOptions = useMemo(() => {
        return [
            {
                label: 'Clientes',
                Icon: CompanyIcon,
                href: route('company.index'),
                active: page?.url === '/dashboard/companies',
                visible: true
            },
        ]
    }, [page])

    return (
        <>
            <aside className={classNames('fixed w-full max-w-[274px] transform transition-all duration-200 -translate-x-[274px] md:translate-x-0', {
                'translate-x-1': menuOpen
            })}>

                <div className="transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-screen dark:bg-gray-800 flex-col">
                    <div className="flex justify-start p-6 items-center">
                        <Link href="/">
                            <Logo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>

                    <div className="mt-6 flex flex-col justify-start items-center px-4 w-full space-y-4 pb-5 ">
                        {menuOptions.map(({label, Icon, href, active, visible}) => {
                            if (!visible) return null;
                            return (
                                <Link className="w-full" href={href}>
                                    <button className={classNames('flex jusitfy-start items-center space-x-3 w-full  focus:outline-none  focus:text-indigo-400 dark:text-white rounded-lg p-2', {
                                        'bg-white dark:bg-gray-900 shadow-md': active
                                    })}>
                                    <span className={classNames('rounded-md p-1 shadow-md bg-white dark:bg-gray-900 text-gray-500 transition-all duration-200', {
                                        'bg-gradient-to-br from-purple-900 to-purple-500 text-white': active
                                    })}>
                                        <Icon />
                                    </span>
                                        <p className="text-base leading-4 text-gray-500 dark:text-white">{label}</p>
                                    </button>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="flex flex-col justify-between items-center pb-6 px-6 w-full mt-auto">
                        <div className=" flex justify-between items-center w-full">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <div className="flex justify-center items-center  space-x-2">
                                        <div className="flex justify-start flex-col items-start">
                                            <p className="cursor-pointer text-sm leading-5 dark:text-white">{user.name}</p>
                                            <p className="cursor-pointer text-xs leading-3 text-gray-500 dark:text-gray-300">{user.email}</p>
                                        </div>
                                    </div>
                                </Dropdown.Trigger>

                                <Dropdown.Content align="bottom-left">
                                    <Dropdown.Link href={route('profile.edit')}>Perfil</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Sair
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>

                        </div>
                    </div>
                </div>
            </aside>
            <main className={classNames('md:ml-[274px] mx-4 md:mx-0 bg-gray-100 dark:bg-gray-900 transform transition-all duration-200', {
                'block translate-x-[274px]': menuOpen
            })}>
                <div className="flex items-center justify-between w-full px-1 md:px-4 py-1 mx-auto flex-wrap-inherit">
                    <nav>
                        {header && (
                            <header className="flex items-center justify-start">
                                <button className="mr-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                                    {menuOpen ? (
                                        <MenuOpenIcon className="w-8" />
                                    ) : (
                                        <MenuIcon className="w-8" />
                                    )}
                                </button>
                                <div className="max-w-7xl py-6">{header}</div>
                            </header>
                        )}
                    </nav>
                </div>
                {children}
            </main>
        </>
    )
}
