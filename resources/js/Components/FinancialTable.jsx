import React from 'react';
import DataTable from './DataTable';

const FinancialTable = ({ transactions, columns, pagination, onChangePage, paginationTotalRows, paginationOptions }) => {
    const groupedTransactions = transactions.data.reduce((acc, transaction) => {
        const accountCompany = transaction.account.company.name;
        const category = transaction.transaction_category?.name || 'Uncategorized';
        const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });

        if (!acc[accountCompany]) {
            acc[accountCompany] = {};
        }

        if (!acc[accountCompany][category]) {
            acc[accountCompany][category] = {};
        }

        if (!acc[accountCompany][category][month]) {
            acc[accountCompany][category][month] = [];
        }

        acc[accountCompany][category][month].push(transaction);

        return acc;
    }, {});

    const data = Object.entries(groupedTransactions).flatMap(([accountCompany, categoryData]) =>
        Object.entries(categoryData).map(([category, monthData]) => ({
            category,
            accountCompany,
            data: Object.entries(monthData).map(([month, transactions]) => ({
                month,
                transactions,
            })),
        }))
    );

    const financialColumns = [
        {
            name: 'Category',
            selector: row => row.category,
            visible: true,
        },
        {
            name: 'Company',
            selector: row => row.accountCompany,
            visible: true,
        },
        ...columns?.map(column => ({
            ...column,
            cell: (row) => {
                const transaction = row.data.find(item => item.month === column.name);
                return transaction ? column.cell(transaction.transactions) : '-';
            },
        })),
    ];

    return (
        <DataTable
            data={data}
            columns={financialColumns}
            pagination={pagination}
            onChangePage={onChangePage}
            paginationTotalRows={paginationTotalRows}
            paginationOptions={paginationOptions}
        />
    );
};

export default FinancialTable;
