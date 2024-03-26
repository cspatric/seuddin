import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import SettingsIcon from '@/Assets/icons/settings.svg?react'
import TrendingUpIcon from '@/Assets/icons/trending-up.svg?react'
import TrendingDownIcon from '@/Assets/icons/trending-down.svg?react'
import LockFilledIcon from '@/Assets/icons/lock-filled.svg?react'
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import DataTable from "@/Components/DataTable.jsx";
import React from "react";
import Button from "@/Components/Button.jsx";
import classNames from "classnames";
import {useCompany} from "@/Contexts/CompanyContext.jsx";


const TransactionCategoryItem = ({transactionCategory}) => {
    const {name, type, company_id} = transactionCategory

    const iconMapping = {
        'in': TrendingUpIcon,
        'out': TrendingDownIcon
    }

    const Icon = iconMapping[type]

    return (

        <div className="flex">
            <Icon className={classNames('w-5', {'text-green-500': type === 'in', 'text-red-500': type === 'out'})} />
            <p className="text-xs px-3 py-2">{name}</p>
            {!company_id ? (<LockFilledIcon className="w-4 text-gray-300"/>) : (<div></div>)}
        </div>
    )
}

export default function Settings({ auth, companies, groups }) {
    const {selectedCompany, setSelectedCompany} = useCompany()
    return (
        <AuthenticatedLayout
            user={auth.user}
            companies={companies}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="flex">
                        <p className="flex items-center py-4 text-lg text-purple-900 mr-5">
                            <SettingsIcon className="w-6"/>
                            <span>Configurações</span>
                        </p>
                        <div className="space-x-3 my-3 text-sm font-semibold">
                            <button disabled className="py-2 text-gray-500">Empresa</button>
                            <button className="py-2 text-purple-900 border-b border-purple-900">Categorias</button>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <header className="flex items-center">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Categorias</h2>
                            </div>
                            <Link className="ml-auto mr-3" href={route('company.create')}>
                                <Button variant="secondary" size="small">Novo subgrupo</Button>
                            </Link>
                            <Link className="" href={route('category.create', {companyId: selectedCompany?.id})}>
                                <Button variant="primary" size="small">Nova Categoria</Button>
                            </Link>
                        </header>
                        <section className="mt-4 rounded-md overflow-hidden">
                            {groups.map(({name, transaction_categories, transaction_category_subgroups}) => (
                                <div>
                                    <header className="bg-gray-100 p-4 uppercase text-xs">{name}</header>
                                    <div className="p-2 border border-gray-100">
                                        {transaction_categories.map((item) => (
                                            <TransactionCategoryItem transactionCategory={item} />
                                        ))}
                                        {transaction_category_subgroups.map(({name: subgroupName, transaction_categories: subgroupTransactionCategories}) => (
                                            <div>
                                                <header className="bg-gray-50 p-4 text-xs">{subgroupName}</header>
                                                <div className="p-2">
                                                    {subgroupTransactionCategories.map((item) => (
                                                        <TransactionCategoryItem transactionCategory={item} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
