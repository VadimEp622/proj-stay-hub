import React, { ChangeEventHandler, useState } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function DatePicker({ stay }) {
    const [selectedRange, setSelectedRange] = useState();
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [openDatePicker, setOpenDatePicker] = useState(true);

    const handleFromChange = (e) => {
        setFromValue(e.target.value);
        const date = parse(e.target.value, 'y-MM-dd', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    }

    const handleToChange = (e) => {
        setToValue(e.target.value);
        const date = parse(e.target.value, 'y-MM-dd', new Date());

        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    };

    const handleRangeSelect = (range) => {
        setSelectedRange(range);
        if (range?.from) {
            setFromValue(format(range.from, 'y-MM-dd'));
        } else {
            setFromValue('');
        }
        if (range?.to) {
            setOpenDatePicker(false);
            setToValue(format(range.to, 'y-MM-dd'));
        } else {
            setToValue('');
        }
    };

    return (
        <>
            <form className="ma2">
                <input
                    onClick={() => setOpenDatePicker(true)}
                    size={10}
                    placeholder="From Date"
                    value={fromValue}
                    onChange={handleFromChange}
                    className="input-reset pa2 ma bg-white black ba"
                />
                {' – '}
                <input
                    onClick={() => setOpenDatePicker(true)}
                    size={10}
                    placeholder="To Date"
                    value={toValue}
                    onChange={handleToChange}
                    className="input-reset pa2 bg-white black ba"
                />
            </form>
            {openDatePicker ?
                <DayPicker
                    mode="range"
                    selected={selectedRange}
                    numberOfMonths={2}
                    onSelect={handleRangeSelect}
                /> : null}
        </>
    );
}

