"use client"

import React, { useContext } from 'react';
import { CurrencyContext } from '../../context/CurrencyContext';
import { currencies } from '@/utils/currency';

const CurrencyDisplay = ({ price }) => {
    const { currency } = useContext(CurrencyContext);
    const { symbol } = currencies[currency];

    return <span>{symbol}{price}</span>;
};

export default CurrencyDisplay;
