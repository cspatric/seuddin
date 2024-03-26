import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {Link, useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import DataTable from "@/Components/DataTable.jsx";
const Edit = ({ auth, mustVerifyEmail, status, customer, users, companies }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        company_id: customer.company_id,
        email: customer.email,
        name: customer.name,
        tax_id: customer.tax_id,
    });
    const submit = (e) => {
        e.preventDefault();

        patch(route('customers.update', customer.id));
    };
    return (
        <AuthenticatedLayout user={auth.user} companies={companies} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{customer.name}</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Atualizar cliente</h2>
                    </header>
                    <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <InputLabel htmlFor="email" value="E-mail" />

                                <TextInput
                                    id="email"
                                    placeholder="Santa Cruz Consultoria"
                                    className="mt-1 block w-full"
                                    value={data.short_name}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>
                            <div>
                                <InputLabel htmlFor="tax_id" value="CPF/CNPJ" />

                                <TextInput
                                    id="tax_id"
                                    placeholder="999.999.999-99"
                                    className="mt-1 block w-full"
                                    value={data.tax_id}
                                    onChange={(e) => setData('tax_id', e.target.value)}
                                    required
                                    mask="999.999.999-99"
                                />

                                <InputError className="mt-2" message={errors.tax_id} />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="name" value="Nome Completo" />

                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    placeholder="João Carlos Silva."
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Atualizar cliente</PrimaryButton>

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

export default Edit;
