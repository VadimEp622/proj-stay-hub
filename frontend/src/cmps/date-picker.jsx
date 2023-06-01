import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DatePicker() {
    const [selected, setSelected] = useState(null);

    let footer = <p>Please pick a day.</p>;
    if (selected) {
        footer = <p>You picked {format(selected, 'PP')}.</p>;
    }

    return (
        <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
        />
    );
}
