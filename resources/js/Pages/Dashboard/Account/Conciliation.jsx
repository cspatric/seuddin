import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link, router, useForm} from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {hasPermission} from "@/Helpers/index.js";
import MoneyImage from "@/Assets/images/money.png";
import ConciliationItem from "@/Components/ConciliationItem.jsx";
import Button from "@/Components/Button.jsx";
const Edit = ({ auth, mustVerifyEmail, status, companies, transactions, account, customers, employees, suppliers, categories }) => {
    const [imageSrc, setImageSrc] = useState(MoneyImage);
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const [transactionToDelete, setTransactionToDelete] = useState(null)
    const {data: formData, setData, delete: destroy, processing, post, get} = useForm()
    const {data, current_page, total, links, from, to} = transactions
    const fileInputRef = useRef(null);

    useEffect(() => {
        setConfirmingUserDeletion(!!transactionToDelete)
    }, [transactionToDelete]);

    useEffect(() => {
        if (!account) return
        if (!account.bank) return setImageSrc(MoneyImage)
        const importImage = async () => {
            try {
                const imageModule = await import(`../../../Assets/images/bank/${account?.bank?.compe_code}.webp`);
                setImageSrc(imageModule.default);
            } catch (error) {
                console.error(`Error importing image: ${error}`);
            }
        };
        importImage().then(null);
    }, [account]);

    const userHasPermission = useCallback((permissionSlug) => {
        if (!auth.user) return;
        return hasPermission(permissionSlug, auth.user.roles);
    }, [auth])

    const handleDelete = (id) => {
        destroy(route('transaction.destroy', transactionToDelete.id))
        setTransactionToDelete(null)
        setConfirmingUserDeletion(false)
    }

    const transactionTypeOptions = useMemo(() => [
        {name: 'Pagamento', value: 'payment'},
        {name: 'Transferência', value: 'transfer'},
    ], [])

    const handleFileSelect = ({target}) => {
        setData('file', target.files[0])
        post(route('conciliation.upload', account.id))
    }

    return (
        <AuthenticatedLayout user={auth.user} companies={companies} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Todas as Despesas</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header className="flex items-center mb-3">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Conciliação bancária</h2>
                        </div>

                        <div className="ml-auto">
                            <Button size="small" variant="primary" onClick={() => fileInputRef.current?.click()}>Importar OFX</Button>
                            <input className="hidden" ref={fileInputRef} type="file" onChange={handleFileSelect} />
                        </div>

                    </header>
                    <div className="flex">
                        <div className="flex flex-row items-center">
                            <img className="w-12 flex-shrink-0 rounded-md border border-gray-200" src={imageSrc} alt={account?.bank?.name} />
                            <div className="ml-2">
                                <p className="text-xl font-bold break-all">{account.description}</p>
                                <p className="text-xs text-gray-400">AG {account.bank_agency_number} / CC {account.bank_account_number}-{account.bank_account_verification_digit} </p>
                            </div>
                        </div>
                    </div>
                    <section className="mt-4 rounded-md overflow-visible">
                        {data.map(transaction => (
                            <ConciliationItem
                                transaction={transaction}
                                associations={[
                                    ...customers.map((customer) => ({type: 'customer', ...customer})),
                                    ...suppliers.map((supplier) => ({type: 'supplier', ...supplier})),
                                    ...employees.map((employee) => ({type: 'employee', ...employee}))
                                ]}
                                categories={categories}
                                onDelete={() => setTransactionToDelete(transaction)}
                            />
                        ))}
                    </section>
                </div>
            </div>
            <Modal
                show={confirmingUserDeletion}
                onClose={() => setTransactionToDelete(null)}
                className="relative z-50"
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Deletar transação
                    </h2>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <p className="text-sm text-gray-500">
                            Tem certeza que deseja deletar a transação: {transactionToDelete?.id}? Esta ação não pode ser desfeita.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton className="mx-2" onClick={() => setTransactionToDelete(null)}>Cancelar</SecondaryButton>
                        <DangerButton onClick={handleDelete} className="ml-3" disabled={processing}>
                            Excluir
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Edit;
