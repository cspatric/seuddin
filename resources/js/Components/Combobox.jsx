import React, {Fragment, useEffect, useMemo, useState} from 'react';
import ExpandMoreIcon from "@/Assets/icons/expand-more.svg?react";
import {Combobox as ReactCombobox, Transition} from "@headlessui/react";
import classNames from "classnames";

const Combobox = ({value, onChange, options, required}) => {
    const [query, setQuery] = useState('')
    const selectedValue = useMemo(() => {
        const optionFromValue = options.find(option => option.value === value)
        const optionFromId = options.find(option => option.id === value)
        return optionFromValue || optionFromId
    }, [])
    const [selected, setSelected] = useState(selectedValue)
    const filteredOptions = query === '' ? options : options.filter((option) => option.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, '')))

    useEffect(() => {
        if (!selected) return
        onChange(selected)
    }, [selected]);

    return (
        <ReactCombobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 rounded-md overflow-visible">
                <div
                    className="relative border border-gray-300 dark:border-gray-700 w-full cursor-default rounded-md bg-white dark:bg-gray-900 text-left sm:text-sm z-40">
                    <ReactCombobox.Input
                        placeholder="Comece a digitar..."
                        className="w-full dark:bg-gray-900 dark:text-gray-300 rounded-md border-transparent focus:border-purple-800 dark:focus:border-purple-800 focus:ring-purple-800 dark:focus:ring-purple-800"
                        displayValue={(value) => value.name}
                        onChange={(e) => setQuery(e.target.value)}
                        required={required}
                    />
                    <ReactCombobox.Button className="absolute inset-y-0 right-0 flex justify-end items-center pr-2 z-40 bg-gradient-to-l my-1 mr-1 from-white via-white dark:from-gray-900 dark:via-gray-900 to-transparent w-16 rounded-md">
                        <ExpandMoreIcon
                            className="h-5 w-5 text-gray-500 dark:text-white"
                            aria-hidden="true"
                        />
                    </ReactCombobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ReactCombobox.Options
                        className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-900 py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none px-1.5 sm:text-sm">
                        {filteredOptions.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 dark:text-white">
                                Nada encontrado.
                            </div>
                        ) : (filteredOptions.map((option) => (
                            <ReactCombobox.Option
                                key={option.id}
                                className={({active}) => classNames('rounded-md relative cursor-default select-none py-2 px-4 dark:text-white', {'bg-gray-200 dark:bg-gray-700': active})}
                                value={option}>
                                    {({selected, active}) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                              {option.name}
                                            </span>
                                            {selected ? (
                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}/>
                                            ) : null}
                                        </>)}
                                </ReactCombobox.Option>
                        )))}
                    </ReactCombobox.Options>
                </Transition>
            </div>
        </ReactCombobox>
    );
};

export default Combobox;
