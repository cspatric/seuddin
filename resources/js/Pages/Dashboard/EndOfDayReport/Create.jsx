import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
const Create = ({ auth, mustVerifyEmail, status }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        closing_date: new Date(),
        initial_cash_balance: '',
        cash_sales_total: '',
        cash_receipts_accounts_receivable: '',
        cash_expenses_total: '',
        final_cash_balance: '',
        credit_sales_total: '',
        pix_transfer_sales_total: '',
        card_sales_total: '',
        payment_link_sales_total: '',
        other_sales_modalities_total: '',
        accounts_receivable_pix_transfer_total: '',
        remarks: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('paymentRequest.store'));
    };
    return (
        <AuthenticatedLayout user={auth.user} header={
            <>
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Novo fechamento de caixa</h2>
                <p>Aqui você irá colocar o fechamento de caixa diário, de acordo com o que aconteceu na movimentação da empresa</p>
            </>
        }>
            <form onSubmit={submit} className="max-w-7xl mx-auto grid grid-cols-2 sm:px-6 lg:px-8 gap-6">
                <div className="space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="font-medium text-gray-600 dark:text-gray-100 uppercase text-xs">Lançamentos em dinheiro</h2>
                        </header>
                        <div className="mt-6 space-y-6 max-w-xl">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <InputLabel htmlFor="cash_sales_total" value="Vendas em dinheiro" />
                                    <p className="text-xs text-gray-500">Excluindo recebimento de crediário</p>
                                    <TextInput
                                        id="cash_sales_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.cash_sales_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('cash_sales_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.cash_sales_total} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="cash_receipts_accounts_receivable" value="Total recebimento crediário" />

                                    <TextInput
                                        id="cash_receipts_accounts_receivable"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.cash_receipts_accounts_receivable.detail?.value}
                                        onNumberFormat={({detail}) => setData('cash_receipts_accounts_receivable', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.initial_cash_balance} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="cash_expenses_total" value="Despesas pagas" />

                                    <TextInput
                                        id="cash_expenses_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.cash_expenses_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('cash_expenses_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.initial_cash_balance} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="font-medium text-gray-600 dark:text-gray-100 uppercase text-xs">Detalhes do lançamento de caixa</h2>
                        </header>
                        <div className="mt-6 space-y-6 max-w-xl">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-2">
                                    <InputLabel htmlFor="closing_date" value="Data de fechamento" />

                                    <TextInput
                                        id="closing_date"
                                        className="mt-1 block w-full"
                                        value={data.closing_date}
                                        onChange={(e) => setData('closing_date', e.target.value)}
                                        required
                                        isFocused
                                        type="date"
                                    />

                                    <InputError className="mt-2" message={errors.closing_date} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="initial_cash_balance" value="Saldo inicial" />

                                    <TextInput
                                        id="initial_cash_balance"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.initial_cash_balance.detail?.value}
                                        onNumberFormat={({detail}) => setData('initial_cash_balance', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.initial_cash_balance} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="final_cash_balance" value="Saldo final" />

                                    <TextInput
                                        id="final_cash_balance"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.final_cash_balance.detail?.value}
                                        onNumberFormat={({detail}) => setData('final_cash_balance', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.final_cash_balance} />
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
                                <PrimaryButton disabled={processing}>Enviar fechamento de caixa</PrimaryButton>

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
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="font-medium text-gray-600 dark:text-gray-100 uppercase text-xs">Lançamentos no Cartão de Crédito</h2>
                        </header>
                        <div className="mt-6 space-y-6 max-w-xl">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <InputLabel htmlFor="payment_link_sales_total" value="Vendas no link de pagamento" />

                                    <TextInput
                                        id="payment_link_sales_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.payment_link_sales_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('payment_link_sales_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.payment_link_sales_total} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="card_sales_total" value="Vendas na máquina" />

                                    <TextInput
                                        id="card_sales_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.card_sales_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('card_sales_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.card_sales_total} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="font-medium text-gray-600 dark:text-gray-100 uppercase text-xs">Lançamentos no Pix</h2>
                        </header>
                        <div className="mt-6 space-y-6 max-w-xl">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <InputLabel htmlFor="pix_transfer_sales_total" value="Vendas no Pix" />

                                    <TextInput
                                        id="pix_transfer_sales_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.pix_transfer_sales_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('pix_transfer_sales_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.pix_transfer_sales_total} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="accounts_receivable_pix_transfer_total" value="Crediário no Pix" />

                                    <TextInput
                                        id="accounts_receivable_pix_transfer_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.accounts_receivable_pix_transfer_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('accounts_receivable_pix_transfer_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.accounts_receivable_pix_transfer_total} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <header>
                            <h2 className="font-medium text-gray-600 dark:text-gray-100 uppercase text-xs">Outros</h2>
                        </header>
                        <div className="mt-6 space-y-6 max-w-xl">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <InputLabel htmlFor="credit_sales_total" value="Vendas no crediário" />
                                    <p className="text-xs text-gray-500">Informar apenas o que foi VENDIDO, não incluir o que foi RECEBIDO</p>

                                    <TextInput
                                        id="credit_sales_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.credit_sales_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('credit_sales_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.credit_sales_total} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="other_sales_modalities_total" value="Outros meios" />

                                    <TextInput
                                        id="other_sales_modalities_total"
                                        placeholder="R$ 115,45"
                                        className="mt-1 block w-full"
                                        value={data.other_sales_modalities_total.detail?.value}
                                        onNumberFormat={({detail}) => setData('other_sales_modalities_total', detail)}
                                        required
                                        currency="BRL"
                                        format="currency"
                                    />

                                    <InputError className="mt-2" message={errors.other_sales_modalities_total} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthenticatedLayout>
    );
};

export default Create;
