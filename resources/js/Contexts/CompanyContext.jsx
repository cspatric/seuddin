import React, {createContext, useContext, useEffect, useState} from 'react';
import {router} from "@inertiajs/react";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        if (!selectedCompany) return;
        router.reload({ data: {companyId: selectedCompany.id} })
    }, [selectedCompany?.id]);

    return (
        <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};
