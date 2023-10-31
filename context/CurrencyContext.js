"use client"

import React, { createContext, useState } from 'react';
import { currencies } from '../lib/currency';

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(currencies.USD.name);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, currencies }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export { CurrencyProvider, CurrencyContext };
