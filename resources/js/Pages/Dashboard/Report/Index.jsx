import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link, router, useForm} from "@inertiajs/react";
import DataTable from '@/Components/DataTable.jsx';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import {hasPermission} from "@/Helpers/index.js";
const Edit = ({ auth, mustVerifyEmail, status, companies, transactions }) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const [paymentRequestToDelete, setPaymentRequestToDelete] = useState(null)
    const {delete: destroy, processing} = useForm()

    console.log(transactions)

    const columns = useMemo(() => {
        const months = new Set(transactions.map(t => t.date?.toLocaleString('default', { month: 'long' })));
        return [
            {
                name: 'Category',
                selector: row => row.category,
            },
            ...Array.from(months).map(month => ({
                name: month,
                selector: row => row.data.find(d => d.month === month)?.amount || 0,
            })),
        ];
    }, [transactions]);

    useEffect(() => {
        setConfirmingUserDeletion(!!paymentRequestToDelete)
    }, [paymentRequestToDelete]);

    const userHasPermission = useCallback((permissionSlug) => {
        if (!auth.user) return;
        return hasPermission(permissionSlug, auth.user.roles);
    }, [auth])

    const handleDelete = (id) => {
        destroy(route('transaction.destroy', paymentRequestToDelete.id))
        setPaymentRequestToDelete(null)
        setConfirmingUserDeletion(false)
    }

    return (
        <AuthenticatedLayout user={auth.user} companies={companies} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Todas as Despesas</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header className="flex items-center">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Despesas</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Empresas ajudam a organizar processos e participantes dentro de uma mesma empresa
                            </p>
                        </div>
                        <Link className="ml-auto" href={route('transaction.create')}>
                            <PrimaryButton>Nova despesa</PrimaryButton>
                        </Link>

                    </header>
                    <section className="mt-4 rounded-md overflow-x-hidden overflow-y-visible">
                        <DataTable transactions={transactions} columns={columns} />
                    </section>
                </div>
            </div>
            <Modal
                show={confirmingUserDeletion}
                onClose={() => setPaymentRequestToDelete(null)}
                className="relative z-50"
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Deletar despesa
                    </h2>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <p className="text-sm text-gray-500">
                            Tem certeza que deseja deletar a despesa: {paymentRequestToDelete?.name}? Esta ação não pode ser desfeita.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton className="mx-2" onClick={() => setPaymentRequestToDelete(null)}>Cancelar</SecondaryButton>
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
