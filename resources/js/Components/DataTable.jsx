import React, {useMemo} from 'react';
import classNames from "classnames";
import {Link} from "@inertiajs/react";

const DataTable = ({ data, columns, pagination, onChangePage, paginationTotalRows, paginationOptions }) => {
    const {links, from, to} = paginationOptions || {}
    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            {data?.length ? (
                <>
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr className="border-b dark:border-gray-700">
                            {columns.map(column => (
                                <th scope="col" className="px-6 py-3" key={column.name}>
                                    {column.name}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data?.map((row, idx) => (
                            <tr key={row.id} className={classNames('bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200', {
                                'border-b': idx !== data.length-1
                            })}>
                                {columns.map(column => (
                                    <td className="px-6 py-4" key={column.selector}>
                                        {column.cell ? column.cell(row) : column.selector(row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {pagination && (
                        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Mostrando <span className="font-semibold text-gray-900 dark:text-white">{from}-{to}</span> de <span className="font-semibold text-gray-900 dark:text-white">{paginationTotalRows}</span></span>
                            <ul className="inline-flex -space-x-px text-sm h-8">
                                {links?.map(({label, url, active}, idx) => {
                                    const labelText = useMemo(() => {
                                        if (idx === 0) return 'Anterior'
                                        if (idx === links.length-1) return 'Próximo'
                                        return label
                                    }, [label])
                                    return (
                                        <li>
                                            <Link href={url} className={classNames(
                                                'flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                                                {
                                                    'opacity-45':  url === null,
                                                    'text-orange-500':  active,
                                                    'rounded-l-lg': idx === 0,
                                                    'rounded-r-lg': idx === links.length-1
                                                }
                                            )}>{labelText}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    )}
                </>
            ) : (
                <div className="py-4 flex justify-center items-center dark:text-white">
                    <p>Não existem registros para mostrar</p>
                </div>
            )}
        </div>
    )
};

export default DataTable;
