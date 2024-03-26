import React, {useMemo} from 'react';
import {format, parseISO} from "date-fns";
import classNames from "classnames";
import InputLabel from "@/Components/InputLabel.jsx";
import Combobox from "@/Components/Combobox.jsx";
import TextInput from "@/Components/TextInput.jsx";
import Button from "@/Components/Button.jsx";
import {useForm} from "@inertiajs/react";
import DeleteIcon from '@/Assets/icons/delete.svg?react';

const ConciliationItem = ({transaction, categories, associations, onDelete}) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        transactionId: transaction.id,
        transactionType: transaction.type,
        associationId: '',
        associationType: '',
        description: transaction.description,
        categoryId: '',
        files: []
    });

    const transactionTypeOptions = useMemo(() => [
        {name: 'Pagamento', value: 'payment'},
        {name: 'Transferência', value: 'transfer'},
    ], [])

    const submit = (e) => {
        e.preventDefault();
        patch(route('conciliation.update', transaction.id));
    };
    return (
        <form onSubmit={submit} className="flex justify-between gap-10 overflow-visible my-5 py-5 border-b last:border-0 border-gray-300">
            <div className="flex justify-between flex-[2]">
                <div>
                    <p>{format(parseISO(transaction.date), 'dd/MM/yy')}</p>
                    <p>{transaction.description}</p>
                </div>
                <p className={classNames('break-keep text-green-500', {'text-red-500': transaction.amount < 0})}>{Intl.NumberFormat('pt-BR', {
                    maximumFractionDigits: 2,
                    currency: 'BRL',
                    style: 'currency'
                }).format(transaction.amount)}</p>
            </div>
            <div className="grid grid-cols-2 flex-[3] gap-2 overflow-visible">
                <input type="hidden" value={data.transactionId} />
                <div>
                    <InputLabel htmlFor="transactionType" value="Tipo de transação"/>
                    <Combobox
                        value={data.transactionType}
                        onChange={({value}) => setData('transactionType', value)}
                        options={transactionTypeOptions}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="associationIid" value="Associação"/>
                    <Combobox
                        value={data.associationId}
                        onChange={({id, type}) => {
                            setData(data => ({
                                ...data,
                                associationId: id,
                                associationType: type
                            }))
                        }}
                        options={associations}
                        renderItem={(option, {selected}) => (
                            <>
                                <span className="font-bold">
                                  {option.type}
                                </span>
                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                  {option.name}
                                </span>
                            </>
                        )}
                    />
                </div>
                <div>
                    <InputLabel htmlFor="description" value="Descrição"/>
                    <TextInput
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        id="description"
                        name="description"
                        className="mt-1 block w-full"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="categoryId" value="Categoria"/>
                    <Combobox
                        value={data.categoryId}
                        onChange={({id}) => setData("categoryId", id)}
                        options={categories}
                    />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4">
                <Button variant="ghost" size="small">Anexar Arquivos</Button>
                <Button type="submit" variant="secondary" size="small">Confirmar</Button>
            </div>
            <div>
                <Button onClick={onDelete} variant="ghost" size="small">
                    <DeleteIcon className="text-red-500" />
                </Button>
            </div>
        </form>
    );
};

export default ConciliationItem;
