import React, {useCallback, useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link, router, useForm} from "@inertiajs/react";
import DataTable from '@/Components/DataTable.jsx';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import OpenInNewIcon from "@/Assets/icons/open-in-new.svg?react";
import ContentCopyIcon from "@/Assets/icons/content-copy.svg?react";
import CommentIcon from "@/Assets/icons/comment.svg?react";
import {Popover} from "@headlessui/react";
import Tooltip from "@/Components/Tooltip.jsx";
import {hasPermission} from "@/Helpers/index.js";
const Index = ({ auth, companies, mustVerifyEmail, status, paymentRequests }) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const [paymentRequestToDelete, setPaymentRequestToDelete] = useState(null)
    const {delete: destroy, processing} = useForm()
    const {data, current_page, total, links, from, to} = paymentRequests

    useEffect(() => {
        setConfirmingUserDeletion(!!paymentRequestToDelete)
    }, [paymentRequestToDelete]);

    const userHasPermission = useCallback((permissionSlug) => {
        if (!auth.user) return;
        return hasPermission(permissionSlug, auth.user.roles);
    }, [auth])

    const handleDelete = (id) => {
        destroy(route('paymentRequest.destroy', paymentRequestToDelete.id))
        setPaymentRequestToDelete(null)
        setConfirmingUserDeletion(false)
    }

    return (
        <AuthenticatedLayout user={auth.user} companies={companies} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Todas as Solicitações de pagamento</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header className="flex items-center">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Solicitações de pagamento</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Empresas ajudam a organizar processos e participantes dentro de uma mesma empresa
                            </p>
                        </div>
                        <Link className="ml-auto" href={route('paymentRequest.create')}>
                            <PrimaryButton>Nova solicitação de pagamento</PrimaryButton>
                        </Link>

                    </header>
                    <section className="mt-4 rounded-md overflow-hidden">
                        <DataTable
                            className="dark:bg-gray-800"
                            columns={[
                                {
                                    name: 'Empresa',
                                    sortable: true,
                                    cell: (d) => [
                                        <Link href={d.company?.id} className="underline text-purple-800">
                                            {d.company?.name}
                                        </Link>
                                    ],
                                    visible: userHasPermission('view-any-payment-request')
                                },
                                {name: 'Tipo de pagamento', sortable: true, selector: row => row.payment_type},
                                {name: 'Chave Pix/Código de barras', sortable: true, cell: (d) => [
                                    <Tooltip text="Clique para copiar">
                                        <p className="break-all">
                                            <span className="">{d.payment_type === 'pix' ? d.pix_key : d.barcode_number}</span>
                                            <ContentCopyIcon className="flex-shrink-0 inline" />
                                        </p>
                                    </Tooltip>
                                ]},
                                {name: 'Nome', sortable: true, selector: row => row.recipient_name},
                                {name: 'Observações', sortable: true, cell: (d) => [
                                    <Tooltip text={d.remarks}>
                                        <div className="flex items-center">
                                            <CommentIcon className="flex-shrink-0" />
                                        </div>
                                    </Tooltip>
                                    ]},
                                {name: 'Status', sortable: true, selector: row => row.status},
                                {name: 'Arquivo', cell: (d) => [
                                    d.payment_type === 'slip' && (
                                        <a target="_blank" href={d.file_url}>
                                            <OpenInNewIcon className="mx-2" />
                                        </a>
                                    )
                                ]},
                                {
                                    cell: (d) => [
                                        <button onClick={() => setPaymentRequestToDelete(d)} className="mx-2 text-red-500">Excluir</button>
                                    ]
                                },
                            ]}
                            data={data}
                            pagination
                            paginationTotalRows={total}
                            paginationOptions={{
                                links,
                                from,
                                to
                            }}
                        />
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
                        Deletar empresa
                    </h2>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <p className="text-sm text-gray-500">
                            Tem certeza que deseja deletar a empresa: {paymentRequestToDelete?.name}? Esta ação não pode ser desfeita.
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

export default Index;
