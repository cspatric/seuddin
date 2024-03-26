import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react';
import ExpandMoreIcon from "@/Assets/icons/expand-more.svg?react";
import {Menu, Transition} from "@headlessui/react";
import classNames from "classnames";
import {useMask} from "@react-input/mask";
import TextInput from "@/Components/TextInput.jsx";
import Button from "@/Components/Button.jsx";
import AddIcon from '@/Assets/icons/add-circle.svg?react';

const CompanySelector = ({value, onChange, companies, required}) => {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(value)
    const filteredOptions = query === '' ? companies : companies.filter((option) => option.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, '')))

    useEffect(() => {
        setSelected(value)
    }, [value]);

    useEffect(() => {
        if (!selected) return
        onChange(selected)
    }, [selected]);

    const maskedTaxId = useCallback((value) => {
        return value?.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
        )
    }, []);

    return (
        <Menu value={selected}>
            <div className="relative rounded-md overflow-visible w-full group">
                <Menu.Button
                    className="relative w-full cursor-pointer rounded-md bg-white group-hover:bg-gray-50 dark:bg-gray-900 text-left sm:text-sm z-40 px-4 py-2">
                    <p className="text-lg">{selected?.name}</p>
                    <p className="text-sm text-gray-400">{maskedTaxId(selected?.tax_id)}</p>
                    <div className="absolute inset-y-0 right-0 flex justify-end items-center pr-2 z-40 bg-gradient-to-l my-1 mr-1 from-white via-white group-hover:from-gray-50 group-hover:via-gray-50 dark:from-gray-900 dark:via-gray-900 to-transparent w-16 rounded-md">
                        <ExpandMoreIcon
                            className="h-5 w-5 text-gray-500 dark:text-white"
                            aria-hidden="true"
                        />
                    </div>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Menu.Items
                        className="z-50 absolute mt-1 w-full overflow-hidden rounded-md bg-white dark:bg-gray-900 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-0 sm:text-sm">
                        <div className="px-4 py-2 space-x-4 box-border flex flex-row items-center border-b border-gray-100">
                            <p className="flex-shrink-0 font-bold">Minhas empresas ({companies.length})</p>
                            <TextInput className="flex-shrink w-full text-sm" placeholder="Buscar" />
                        </div>
                        <div className="max-h-[236px] overflow-y-auto p-2">
                            {filteredOptions.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 dark:text-white">
                                    Nada encontrado.
                                </div>
                            ) : (filteredOptions.map((option) => (
                                <Menu.Item
                                    key={option.id}
                                    as="div"
                                    className={({active}) => classNames('rounded-md relative cursor-default select-none py-2 px-5 dark:text-white', {'bg-purple-50 dark:bg-gray-700': active})}
                                    onClick={() => {
                                        setSelected(option)
                                        onChange(option)
                                    }}>
                                    {({selected, active}) => (
                                        <>
                                            <p className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {option.name}
                                            </p>
                                            <p className="text-xs text-gray-400">{maskedTaxId(option.tax_id)}</p>
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}/>
                                            ) : null}
                                        </>)}
                                </Menu.Item>
                            )))}
                        </div>
                        <div className="px-2">
                            <Button variant="ghost" size="small">
                                <AddIcon width={20} className="mr-1" />
                                <span>Criar nova empresa</span>
                            </Button>
                        </div>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    );
};

export default CompanySelector;
