import React, {useCallback, useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link, router, useForm} from "@inertiajs/react";
import DataTable from '@/Components/DataTable.jsx';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
const Edit = ({ auth, mustVerifyEmail, status, companies }) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const [companyToDelete, setCompanyToDelete] = useState(null)
    const {delete: destroy, processing} = useForm()
    const {data, current_page, total, links, from, to} = companies

    useEffect(() => {
        setConfirmingUserDeletion(!!companyToDelete)
    }, [companyToDelete]);

    const handleDelete = (id) => {
        destroy(route('company.destroy', companyToDelete.id))
        setCompanyToDelete(null)
        setConfirmingUserDeletion(false)
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Todas as Empresas</h2>}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <header className="flex items-center">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Empresas</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Empresas ajudam a organizar processos e participantes dentro de uma mesma empresa
                            </p>
                        </div>
                        <Link className="ml-auto" href={route('company.create')}>
                            <PrimaryButton>Criar empresa</PrimaryButton>
                        </Link>

                    </header>
                    <section className="mt-4 rounded-md overflow-hidden">
                        <DataTable
                            className="dark:bg-gray-800"
                            columns={[
                                {name: 'Id', sortable: true, selector: row => row.id},
                                {name: 'Razão Social', sortable: true, selector: row => row.name},
                                {name: 'CNPJ', sortable: true, selector: row => row.tax_id},
                                {name: 'Nome', sortable: true, selector: row => row.short_name},
                                {
                                    cell: (d) => [
                                        <Link href={route('company.edit', d.id)}>
                                            <button className="mx-2">Editar</button>
                                        </Link>,
                                        <button onClick={() => setCompanyToDelete(d)} className="mx-2 text-red-500">Excluir</button>
                                    ]
                                }
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
                onClose={() => setCompanyToDelete(null)}
                className="relative z-50"
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Deletar empresa
                    </h2>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 mb-6">
                        <p className="text-sm text-gray-500">
                            Tem certeza que deseja deletar a empresa: {companyToDelete?.name}? Esta ação não pode ser desfeita.
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton className="mx-2" onClick={() => setCompanyToDelete(null)}>Cancelar</SecondaryButton>
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
