import React, {useCallback, useEffect, useMemo, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link, router, useForm} from "@inertiajs/react";
import DataTable from '@/Components/DataTable.jsx';
import SecondaryButton from "@/Components/SecondaryButton.jsx";
import Modal from "@/Components/Modal.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import TrendingDownIcon from "@/Assets/icons/trending-down.svg?react";
import TrendingUpIcon from "@/Assets/icons/trending-up.svg?react";
import SyncAltIcon from "@/Assets/icons/sync-alt.svg?react";
import ChevronLeftIcon from "@/Assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "@/Assets/icons/chevron-right.svg?react";
import CommentIcon from "@/Assets/icons/comment.svg?react";
import {Menu, Popover} from "@headlessui/react";
import Tooltip from "@/Components/Tooltip.jsx";
import {hasPermission} from "@/Helpers/index.js";
import classNames from "classnames";
import {InputNumberFormat} from "@react-input/number-format";
import { ResponsiveLine } from '@nivo/line'
import {
    eachDayOfInterval,
    isSameDay,
    format,
    isSameMonth,
    addMonths,
    subMonths,
    lastDayOfMonth,
    parseISO,
    formatISO, startOfMonth, getDay
} from 'date-fns';
import {uniq} from "lodash";
import Button from "@/Components/Button.jsx";

const AccountItem = ({account, onClick, active}) => {
    const {description, transactions, bank_agency_number, bank_account_number, bank_account_verification_digit} = account
    const balance = useMemo(() => Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, currency: 'BRL', style: 'currency' }).format(transactions.reduce((acc, {amount}) => acc + parseFloat(amount), 0)), [transactions])
    return (
        <div
            key={account.id}
            className={classNames('flex flex-row justify-between rounded-md relative cursor-pointer select-none py-2 dark:text-white dark:bg-gray-700 px-2', {'bg-purple-50': active})}
            onClick={onClick}>
            <div className="flex flex-col mr-3">
                <p className="break-all text-wrap flex-break text-purple-900">
                    {description}
                </p>
                {account?.bank ? (
                    <p className="text-xs text-gray-400">AG {bank_agency_number} / CC {bank_account_number}-{bank_account_verification_digit} </p>
                ) : (
                    <p className="text-xs text-gray-400">Conta Offline</p>
                )}
            </div>
            <p className="flex-shrink-0 text-sm">{balance}</p>
        </div>
    )
}

const Edit = ({ auth, companies, mustVerifyEmail, status, accounts }) => {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const [paymentRequestToDelete, setPaymentRequestToDelete] = useState(null)
    const {delete: destroy, processing} = useForm()
    const {data, current_page, total, links, from, to} = accounts
    const [selected, setSelected] = useState(data[0])
    const [imageSrc, setImageSrc] = useState(null);
    const daysInMonth = eachDayOfInterval({ start: new Date(2024, 0, 1), end: new Date(2024, 0, 31) });
    let currentBalance = 0;
    const lastMonth = subMonths(new Date(), 1)
    const currentMonth = useMemo(() => new Date(), [router])
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)

    const lastMonthBalance = useMemo(() => {
        const {transactions} = selected
        return transactions
            .filter((transaction) => isSameMonth(new Date(transaction.date), lastMonth))
            .reduce((totalBalance, transaction) => totalBalance + parseFloat(transaction.amount), 0);
    }, [selected]);

    const accountStatement = useMemo(() => {
        const {transactions} = selected
        const distinctTransactionDays = uniq(transactions.map(transaction => format(parseISO(transaction.date), 'dd/MM/yy')))
        return distinctTransactionDays.map((day) => {
            return {data: transactions.filter((transaction) => format(parseISO(transaction.date), 'dd/MM/yy') === day)}
        })
    }, [selected, selectedMonth]);

    const aggregatedTransactions = daysInMonth.map((day) => ({
        x: day.toString(),
        y: 0,
    }));

    useEffect(() => {
        if (!selectedMonth) return;
        if (selectedMonth === currentMonth) return;
        router.reload({ data: {startDate: startOfMonth(selectedMonth), endDate: lastDayOfMonth(selectedMonth)} })
    }, [selectedMonth]);

    useEffect(() => {
        const [firstAccount] = data
        setSelected(firstAccount)
    }, [data]);

    useEffect(() => {
        accountStatement.unshift({date: formatISO(lastDayOfMonth(lastMonth)), balance: lastMonthBalance, remarks: 'Saldo Anterior'})
    }, [accountStatement]);

    // Update data array with transactions and fill in missing days
    useEffect(() => {
        if (!selected) return
        const {transactions} = selected

        transactions.forEach((transaction) => {
            const date = new Date(transaction.date);

            // Update balance and add transaction amount
            currentBalance += parseFloat(transaction.amount);

            // Find the index of the day in the data array
            const dayIndex = aggregatedTransactions.findIndex((day) => isSameDay(new Date(day.x), date));

            // Update the corresponding day if found
            if (dayIndex !== -1) {
                aggregatedTransactions[dayIndex].y = currentBalance;
            }
        });
    }, [selected, selectedMonth]);

    useEffect(() => {
        setConfirmingUserDeletion(!!paymentRequestToDelete)
    }, [paymentRequestToDelete]);

    useEffect(() => {
        if (!selected) return
        const importImage = async () => {
            try {
                const imageModule = await import(`../../../Assets/images/bank/${selected?.bank?.compe_code}.gif`);
                setImageSrc(imageModule.default);
            } catch (error) {
                const imageModule = await import(`../../../Assets/images/bank/default.png`);
                setImageSrc(imageModule.default);
                console.error(`Error importing image: ${error}`);
            }
        };
        importImage();
    }, [aggregatedTransactions]);

    const userHasPermission = useCallback((permissionSlug) => {
        if (!auth.user) return;
        return hasPermission(permissionSlug, auth.user.roles);
    }, [auth])

    const chartData = [
        {
            id: 'transactions',
            data: aggregatedTransactions,
        },
    ];

    const handleDelete = (id) => {
        destroy(route('paymentRequest.destroy', paymentRequestToDelete.id))
        setPaymentRequestToDelete(null)
        setConfirmingUserDeletion(false)
    }

    const handleIncreaseMonth = () => {
        const month = addMonths(selectedMonth, 1)
        setSelectedMonth(month)
    }
    const handleDecreaseMonth = () => {
        const month = subMonths(selectedMonth, 1)
        setSelectedMonth(month)
    }

    return (
        <AuthenticatedLayout user={auth.user} companies={companies} header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Todas as Contas</h2>}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-6 sm:px-6 lg:px-8 gap-6">
                <div className="space-y-6 sm:col-span-2">
                    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <header className="flex items-center">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Contas</h2>
                            </div>

                        </header>
                        <section className="mt-4 rounded-md overflow-hidden">
                            <div className="flex flex-row items-center justify-between">
                                <p>Conta</p>
                                <p>Saldo (R$)</p>
                            </div>
                            {data.map((account) => (
                                <AccountItem active={selected.id === account.id} account={account} onClick={() => setSelected(account)} />
                            ))}
                        </section>
                    </div>
                </div>

                <div className="space-y-6 sm:col-span-4">
                    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <div className="flex flex-row items-center">
                            <img className="w-12 flex-shrink-0" src={imageSrc} alt={selected?.bank?.name} />
                            <div className="ml-2">
                                <p className="text-xl font-bold break-all">{selected.description}</p>
                                <p className="text-xs text-gray-400">AG {selected.bank_agency_number} / CC {selected.bank_account_number}-{selected.bank_account_verification_digit} </p>
                            </div>

                            <div className="flex flex-row items-center ml-auto">
                                <ChevronLeftIcon className="text-purple-900" width={28} onClick={handleDecreaseMonth} />
                                <p>{format(selectedMonth, 'MMM/yyyy')}</p>
                                <ChevronRightIcon className="text-purple-900" width={28} onClick={handleIncreaseMonth} />
                            </div>
                        </div>
                        <div className="h-72">
                            <ResponsiveLine
                                data={chartData}
                                margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
                                xScale={{ type: 'point' }}
                                tooltip={(d) => <div>{Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, currency: 'BRL', style: 'currency' }).format(d.point.data.y)}</div>}
                                yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
                                axisTop={null}
                                axisRight={null}
                                enableArea
                                axisBottom={{
                                    orient: 'bottom',
                                    tickSize: 5,
                                    tickPadding: 10,
                                    tickRotation: 0,
                                    legend: 'Data',
                                    legendOffset: 36,
                                    legendPosition: 'middle',
                                    format: (value) => {
                                        const date = new Date(value);
                                        // Display ticks for every 2 days
                                        if (getDay(date) % 3 === 0) {
                                            return format(date, 'dd/MM');
                                        }
                                        return ''; // Hide other ticks
                                    },
                                    legendValues: 10, // Set the number of ticks you want to display
                                }}
                                axisLeft={{
                                    orient: 'left',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legendOffset: -40,
                                    legendPosition: 'middle',
                                }}
                                enableGridY
                                enableGridX={false}
                                colors={['#581c87']}
                                pointSize={10}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabelYOffset={-12}
                                pointLabel={(d) => format(parseISO(d.x), 'dd/MM/yy')}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-6 sm:col-span-6">
                    <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
                        <header className="flex items-center">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Extrato</h2>
                            </div>
                            <div className="ml-auto space-x-2">
                                <Link href={route('paymentRequest.create')}>
                                    <Button variant="secondary" size="smallest">
                                        <TrendingDownIcon width={20} />
                                        <span className="ml-2">Novo pagamento</span>
                                    </Button>
                                </Link>
                                <Link href={route('paymentRequest.create')}>
                                    <Button variant="secondary" size="smallest">
                                        <TrendingUpIcon width={20} />
                                        <span className="ml-2">Novo recebimento</span>
                                    </Button>
                                </Link>
                                <Link href={route('paymentRequest.create')}>
                                    <Button variant="secondary" size="smallest">
                                        <SyncAltIcon width={20} />
                                        <span className="ml-2">Nova transferência</span>
                                    </Button>
                                </Link>
                            </div>
                        </header>
                        <DataTable
                            columns={[
                                {name: 'Data', sortable: true, selector: row => format(parseISO(row.date), 'dd/MM/yy'), onlyFirstVisible: true},
                                {name: 'Descrição', sortable: true, selector: row => row.remarks},
                                {
                                    name: 'Entrada',
                                    head: (c) => [
                                        <div className="flex items-center">
                                            <TrendingUpIcon className="mr-1 inline-flex text-green-500" width={20} />
                                            <span>{c.name}</span>
                                        </div>
                                    ],
                                    cell: (d) => [
                                        <>
                                            {d.amount > 0 ? (
                                                <span>{Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, currency: 'BRL', style: 'currency' }).format(d.amount)}</span>
                                            ) : null}
                                        </>
                                    ]
                                },
                                {
                                    name: 'Saída',
                                    head: (c) => [
                                        <div className="flex items-center">
                                            <TrendingDownIcon className="mr-1 inline-flex text-red-500" width={20} />
                                            <span>{c.name}</span>
                                        </div>
                                    ],
                                    cell: (d) => [
                                        <>
                                            {d.amount < 0 ? (
                                                <span className="text-red-500">{Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, currency: 'BRL', style: 'currency' }).format(d.amount)}</span>
                                            ) : null}
                                        </>
                                    ]
                                },
                                {
                                    name: 'Saldo',
                                    onlyLastVisible: true,
                                    cell: (d) => [
                                        <>
                                            <span>{Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2, currency: 'BRL', style: 'currency' }).format(d.balance)}</span>
                                        </>
                                    ]
                                }
                            ]}
                            data={accountStatement}
                        />
                        <div>
                            {/*{Object.keys(accountStatement).map((key) => (*/}
                            {/*    <>*/}
                            {/*        {accountStatement[key].map(() => (*/}
                            {/*            <div>{key}</div>*/}
                            {/*        ))}*/}
                            {/*    </>*/}
                            {/*))}*/}
                        </div>
                    </div>
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

export default Edit;
