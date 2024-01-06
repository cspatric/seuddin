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

const Create = ({ auth, mustVerifyEmail, status }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        request_date: '',
        payment_date: '',
        amount: '',
        recipient_name: '',
        barcode_number: '',
        payment_type: '',
        pix_key: '',
        key_type: '',
        file: undefined,
        remarks: '',
    });

    const paymentTypeOptions = useMemo(() => [
        {name: 'Boleto', value: 'slip'},
        {name: 'Pix', value: 'pix'},
    ], [])

    const pixKeyTypeOptions = useMemo(() => [
        {name: 'CPF/CNPJ', value: 'document'},
        {name: 'Celular', value: 'phone'},
        {name: 'E-mail', value: 'email'},
        {name: 'Aleatória', value: 'random'},
    ], [])

    const submit = (e) => {
        e.preventDefault();

        post(route('paymentRequest.store'));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nova solicitação de pagamento</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Enviar solicitação de pagamento</h2>
                    </header>
                    <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <InputLabel htmlFor="request_date" value="Data da solicitação" />

                                <TextInput
                                    id="request_date"
                                    className="mt-1 block w-full"
                                    value={data.request_date}
                                    onChange={(e) => setData('request_date', e.target.value)}
                                    required
                                    isFocused
                                    type="date"
                                />

                                <InputError className="mt-2" message={errors.request_date} />
                            </div>
                            <div>
                                <InputLabel htmlFor="payment_date" value="Data do pagamento" />

                                <TextInput
                                    id="payment_date"
                                    className="mt-1 block w-full"
                                    value={data.payment_date}
                                    onChange={(e) => setData('payment_date', e.target.value)}
                                    required
                                    isFocused
                                    type="date"
                                />

                                <InputError className="mt-2" message={errors.payment_date} />
                            </div>
                            <div>
                                <InputLabel htmlFor="amount" value="Valor" />

                                <TextInput
                                    id="amount"
                                    placeholder="R$ 115,45"
                                    className="mt-1 block w-full"
                                    value={data.amount.detail?.value}
                                    onNumberFormat={({detail}) => setData('amount', detail)}
                                    required
                                    currency="BRL"
                                    format="currency"
                                />

                                <InputError className="mt-2" message={errors.amount} />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="recipient_name" value="Nome do destinatário" />

                                <TextInput
                                    id="recipient_name"
                                    className="mt-1 block w-full"
                                    placeholder="Ricardo Alvares Silva"
                                    value={data.recipient_name}
                                    onChange={(e) => setData('recipient_name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.recipient_name} />
                            </div>
                            <div className="col-span-2">
                                <InputLabel htmlFor="payment_type" value="Tipo de pagamento" />
                                <Combobox
                                    options={paymentTypeOptions}
                                    value={data.payment_type}
                                    onChange={({value}) => setData('payment_type', value)}
                                />
                            </div>
                            {data.payment_type === 'pix' && (
                                <>
                                    <div>
                                        <InputLabel htmlFor="key_type" value="Tipo de chave Pix" />
                                        <Combobox
                                            options={pixKeyTypeOptions}
                                            value={data.key_type}
                                            onChange={({value}) => setData('key_type', value)}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="pix_key" value="Chave Pix" />

                                        <TextInput
                                            id="pix_key"
                                            className="mt-1 block w-full"
                                            value={data.pix_key}
                                            onChange={(e) => setData('pix_key', e.target.value)}
                                            required
                                            isFocused
                                        />

                                        <InputError className="mt-2" message={errors.pix_key} />
                                    </div>
                                </>
                            )}
                            {data.payment_type === 'slip' && (
                                <>
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="barcode_number" value="Código de Barras" />

                                        <TextInput
                                            id="barcode_number"
                                            className="mt-1 block w-full"
                                            value={data.barcode_number}
                                            onChange={(e) => setData('barcode_number', e.target.value)}
                                            isFocused
                                            multiline
                                        />

                                        <InputError className="mt-2" message={errors.barcode_number} />
                                    </div>
                                    <div className="col-span-2">
                                        <InputLabel htmlFor="file" value="Arquivo" />

                                        <Dropzone onFilesAccepted={(e) => setData('file', e.target.files[0])}>
                                            <div className="rounded-full bg-black/5 my-2 p-2">
                                                <CloudUploadIcon className="w-5 h-5" />
                                            </div>
                                            <p>
                                                <span>Arraste e solte o arquivo do boleto aqui, ou </span>
                                                <span className="underline">clique para selecionar.</span>
                                            </p>
                                            <p>Formatos aceitos: .pdf, .jpg, .png</p>
                                        </Dropzone>

                                        <InputError className="mt-2" message={errors.barcode_number} />
                                    </div>
                                </>
                            )}
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
                            <PrimaryButton disabled={processing}>Solicitar pagamento</PrimaryButton>

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
