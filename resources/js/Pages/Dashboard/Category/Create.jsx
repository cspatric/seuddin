import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {Link, useForm} from "@inertiajs/react";
import {RadioGroup, Transition} from "@headlessui/react";
import Button from "@/Components/Button.jsx";
import Combobox from "@/Components/Combobox.jsx";
import TrendingDownIcon from '@/Assets/icons/trending-down.svg?react'
import TrendingUpIcon from '@/Assets/icons/trending-up.svg?react'
import classNames from "classnames";
import {useCompany} from "@/Contexts/CompanyContext.jsx";
const Create = ({ auth, mustVerifyEmail, companies, transactionCategories }) => {
    console.log(transactionCategories)
    const {selectedCompany, setSelectedCompany} = useCompany()

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: '',
        type: '',
        transaction_category_subgroup_id: '',
        transaction_category_group_id: '',
        company_id: selectedCompany?.id,
    });

    const [subgroups, setSubgroups] = useState([])

    useEffect(() => {
        const [group] = transactionCategories.filter(({id}) => data.transaction_category_group_id === id)
        setSubgroups(group?.transaction_category_subgroups)
        setData('transaction_category_subgroup_id', undefined)
    }, [data.transaction_category_group_id]);

    const submit = (e) => {
        e.preventDefault();

        post(route('categories.store'));
    };

    return (
        <AuthenticatedLayout companies={companies} user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Criar empresa</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Criar categoria</h2>
                    </header>
                    <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                        <input type="hidden"/>
                        <div>
                            <RadioGroup className="flex space-x-8" value={data.type} onChange={(value) => setData("type", value)}>
                                <RadioGroup.Option value="in" className="flex items-center space-x-2">
                                    {({ checked }) => (
                                        <>
                                            <div className={classNames('w-2 h-2 outline outline-2 outline-offset-2 outline-gray-400 rounded-full', {'bg-purple-900 !outline-purple-900': checked})}></div>
                                            <TrendingUpIcon className="text-green-500 h-6" />
                                            <span>Entrada</span>
                                        </>
                                    )}
                                </RadioGroup.Option>
                                <RadioGroup.Option value="out" className="flex items-center space-x-2">
                                    {({ checked }) => (
                                        <>
                                            <div className={classNames('w-2 h-2 outline outline-2 outline-offset-2 outline-gray-400 rounded-full', {'bg-purple-900 !outline-purple-900': checked})}></div>
                                            <TrendingDownIcon className="text-red-500 h-6" />
                                            <span>Saída</span>
                                        </>
                                    )}
                                </RadioGroup.Option>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-2">
                                <InputLabel htmlFor="name" value="Nome" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="transaction_category_group_id" value="Grupo" />

                                <Combobox id="transaction_category_group_id" value={data.transaction_category_group_id} options={transactionCategories} onChange={({id}) => setData('transaction_category_group_id', id)}/>

                                <InputError className="mt-2" message={errors.transaction_category_group_id} />
                            </div>
                            {subgroups?.length && (
                                <div className="col-span-2">
                                    <InputLabel htmlFor="transaction_category_subgroup_id">
                                        <span>Subgrupo</span>
                                        <span className="ml-1 italic text-gray-500">(opcional)</span>
                                    </InputLabel>

                                    <Combobox id="transaction_category_subgroup_id" value={data.transaction_category_subgroup_id} options={subgroups} onChange={({id}) => setData('transaction_category_subgroup_id', id)}/>

                                    <InputError className="mt-2" message={errors.transaction_category_subgroup_id} />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="primary" size="small" disabled={processing}>Criar categoria</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600 dark:text-gray-400">Dados salvos.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
