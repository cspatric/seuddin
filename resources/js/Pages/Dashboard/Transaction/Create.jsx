import React, {useMemo} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Combobox from "@/Components/Combobox.jsx";
import {Transition} from "@headlessui/react";
import Dropzone from "@/Components/Dropzone.jsx";
import CloudUploadIcon from '@/Assets/icons/cloud-upload.svg?react'

const Create = ({ auth, mustVerifyEmail, status, transactionCategories }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        date: '',
        value: '',
        payment_method: '',
        file: undefined,
        remarks: '',
        status: '',
        category_id: '',
    });

    const paymentMethodOptions = useMemo(() => [
        {name: 'Dinheiro', value: 'money'},
        {name: 'Transferência Bancária', value: 'bank_transfer'},
        {name: 'Pix', value: 'pix'},
        {name: 'Cartão de Crédito', value: 'credit_card'},
    ], [])

    const submit = (e) => {
        e.preventDefault();

        post(route('transaction.store'));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nova despesa</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Cadastrar despesa</h2>
                    </header>
                    <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <InputLabel htmlFor="date" value="Data" />

                                <TextInput
                                    id="date"
                                    className="mt-1 block w-full"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                    isFocused
                                    type="date"
                                />

                                <InputError className="mt-2" message={errors.date} />
                            </div>
                            <div>
                                <InputLabel htmlFor="value" value="Valor" />

                                <TextInput
                                    id="value"
                                    placeholder="R$ 115,45"
                                    className="mt-1 block w-full"
                                    value={data.value.detail?.value}
                                    onNumberFormat={({detail}) => setData('value', detail)}
                                    required
                                    currency="BRL"
                                    format="currency"
                                />

                                <InputError className="mt-2" message={errors.value} />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="category_id" value="Categoria" />
                                <Combobox
                                    options={transactionCategories}
                                    value={data.category_id}
                                    onChange={({value}) => setData('category_id', value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="payment_method" value="Método de pagamento" />
                                <Combobox
                                    options={paymentMethodOptions}
                                    value={data.payment_method}
                                    onChange={({value}) => setData('payment_method', value)}
                                />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="file" value="Arquivo" />

                                <Dropzone onFilesAccepted={(e) => setData('file', e.target.files[0])}>
                                    <div className="rounded-full bg-black/5 my-2 p-2">
                                        <CloudUploadIcon className="w-5 h-5" />
                                    </div>
                                    <p>
                                        <span>Arraste e solte o arquivo aqui, ou </span>
                                        <span className="underline">clique para selecionar.</span>
                                    </p>
                                    <p>Formatos aceitos: .pdf, .jpg, .png</p>
                                </Dropzone>

                                <InputError className="mt-2" message={errors.file} />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="remarks" value="Observações" />

                                <TextInput
                                    id="remarks"
                                    className="mt-1 block w-full"
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                    isFocused
                                    multiline
                                />

                                <InputError className="mt-2" message={errors.remarks} />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Cadastrar despesa</PrimaryButton>

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
