import {useCallback, useEffect, useMemo, useState} from 'react';
import Dropdown from '@/Components/Dropdown';
import {Link, router} from '@inertiajs/react';
import CompanyIcon from '@/Assets/icons/company.svg?react'
import BadgeIcon from '@/Assets/icons/badge.svg?react'
import PersonIcon from '@/Assets/icons/person.svg?react'
import PointOfSaleIcon from '@/Assets/icons/point-of-sale.svg?react'
import AnalyticsIcon from '@/Assets/icons/analytics.svg?react'
import PaymentsIcon from '@/Assets/icons/payments.svg?react'
import SettingsIcon from '@/Assets/icons/settings.svg?react'
import AccountBalanceIcon from '@/Assets/icons/account-balance.svg?react'
import TrendingDownIcon from '@/Assets/icons/trending-down.svg?react'
import HomeIcon from '@/Assets/icons/home.svg?react'
import Logo from '@/Assets/logo.svg?react'
import MenuIcon from '@/Assets/icons/menu.svg?react'
import MenuOpenIcon from '@/Assets/icons/menu-open.svg?react'
import classNames from "classnames";
import {hasPermission} from "@/Helpers/index.js";
import Combobox from "@/Components/Combobox.jsx";
import CompanySelector from "@/Components/CompanySelector.jsx";
import {useCompany} from "@/Contexts/CompanyContext.jsx";
import Button from "@/Components/Button.jsx";

const MenuItem = ({visible, Icon, label, active, href}) => {
    if (!visible) return null;
    return (
        <Link className="w-full mt-0" href={href}>
            <button className={classNames('flex justify-start items-center space-x-3 w-full  focus:outline-none focus:text-indigo-400 dark:text-white rounded-lg p-2', {
                'bg-white dark:bg-gray-900 shadow-md shadow-gray-300/5': active
            })}>
                <span className="rounded-md p-1 dark:bg-gray-900 text-black transition-all duration-200">
                    <Icon className={classNames('w-7', {'text-purple-800': active})} />
                </span>
                <p className="text-base text-left leading-4 text-black dark:text-white">{label}</p>
            </button>
        </Link>
    )
}

export default function Authenticated({ user, companies = [], header, children }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {page} = router
    const {selectedCompany, setSelectedCompany} = useCompany()

    const userHasPermission = useCallback((permissionSlug) => {
        if (!user) return;
        return hasPermission(permissionSlug, user.roles);
    }, [user])

    useEffect(() => {
        const [firstCompany] = companies
        if (!selectedCompany) setSelectedCompany(firstCompany)
    }, [selectedCompany]);

    const [pagePath] = page?.url?.split('?') ?? []

    const menuOptions = useMemo(() => {
        return [
            {
                label: 'Ínicio',
                Icon: HomeIcon,
                href: '/dashboard',
                active: pagePath === '/dashboard',
                visible: true
            },
            {
                label: 'Pagamentos',
                Icon: PaymentsIcon,
                href: route('paymentRequest.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/payments',
                visible: userHasPermission('view-payment-request'),
                category: 'Gestão de caixa'
            },
            {
                label: 'Contas',
                Icon: AccountBalanceIcon,
                href: route('account.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/accounts',
                visible: userHasPermission('view-payment-request'),
                category: 'Gestão de caixa'
            },
            {
                label: 'Despesas',
                Icon: TrendingDownIcon,
                href: route('transaction.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/transactions',
                visible: userHasPermission('view-transaction'),
                category: 'Gestão de caixa'
            },
            {
                label: 'Fechamentos de caixa',
                Icon: PointOfSaleIcon,
                href: route('endOfDayReport.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/reports',
                visible: userHasPermission('view-end-of-day-report'),
                category: 'Faturamento'
            },
            {
                label: 'Painel de acompanhamento',
                Icon: AnalyticsIcon,
                href: route('report.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/reports',
                visible: userHasPermission('view-transaction'),
                category: 'Administrativo'
            },
            {
                label: 'Fornecedores',
                Icon: CompanyIcon,
                href: route('supplier.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/suppliers',
                visible: userHasPermission('view-company'),
                category: 'Administrativo'
            },
            {
                label: 'Funcionários',
                Icon: BadgeIcon,
                href: route('employees.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/employees',
                visible: userHasPermission('view-employee'),
                category: 'Administrativo'
            },
            {
                label: 'Clientes',
                Icon: PersonIcon,
                href: route('customers.index', {companyId: selectedCompany?.id}),
                active: pagePath === '/dashboard/customers',
                visible: userHasPermission('view-customer'),
                category: 'Administrativo'
            },
        ]
    }, [page])

    const noCategoryItems = menuOptions.filter(item => !item.category);

    const categoryItems = menuOptions
        .filter(item => item.category && item.visible)
        .reduce((acc, item) => {
            acc[item.category] = acc[item.category] || [];
            acc[item.category].push(item);
            return acc;
        }, {});

    const visibleCategories = Object.keys(categoryItems).filter(
        category => categoryItems[category].length > 0
    );

    return (
        <div className="selection:purple-800">
            <aside className={classNames('fixed w-full max-w-[274px] transform transition-all duration-200 -translate-x-[274px] md:translate-x-0', {
                'translate-x-1': menuOpen
            })}>

                <div className="transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-screen dark:bg-gray-800 flex-col">
                    <div className="flex justify-start p-6 items-center">
                        <Link href="/">
                            <Logo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </Link>
                    </div>

                    <div className="mt-6 flex flex-col justify-start items-center px-4 w-full space-y-2 pb-5 ">
                        {noCategoryItems.map((props) => <MenuItem {...props} />)}
                        {visibleCategories.map((category) => {
                            return (
                                <>
                                    <h3 className="flex text-left w-full space-x-3 text-gray-500 px-2 uppercase text-xs">{category}</h3>
                                    {categoryItems[category].map((props) => <MenuItem {...props} />)}
                                </>
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
                <div className="max-w-7xl sm:px-6 lg:px-8 space-y-6 flex items-center justify-between w-full px-1 md:px-4 py-1 mx-auto flex-wrap-inherit">
                    <nav className="w-full">
                        {header && (
                            <header className="flex items-center justify-start my-2 w-full">
                                <button className="mr-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                                    {menuOpen ? (
                                        <MenuOpenIcon className="w-8" />
                                    ) : (
                                        <MenuIcon className="w-8" />
                                    )}
                                </button>
                                <div className="flex bg-white dark:bg-gray-800 shadow rounded-lg min-w-72">
                                    {userHasPermission('view-any-company') ? (
                                        <CompanySelector value={selectedCompany} companies={companies} onChange={(value) => setSelectedCompany(value)}/>
                                    ) : (
                                        <div className="max-w-7xl">{header}</div>
                                    )}
                                </div>
                                {userHasPermission('view-any-company') && (
                                    <Link className="ml-auto" href={route('settings.index', {companyId: selectedCompany?.id})}>
                                        <Button variant="secondary" size="small">
                                            <SettingsIcon className="w-4 mr-2 text-gray-500" />
                                            <span>Configurações</span>
                                        </Button>
                                    </Link>
                                )}
                            </header>
                        )}
                    </nav>
                </div>
                {children}
            </main>
        </div>
    )
}
