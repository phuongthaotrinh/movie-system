import React, {useState, useEffect, FC, KeyboardEvent} from 'react';
import {Badge} from "@/components/ui/badge"

interface ChipsProps {
    chips?: any[];
    setChips?: any,
    max?: number | string;
    maxlength?: number | string;
    placeholder?: string;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
}

const Chips: FC<ChipsProps> = ({
                                   onChange,
                                   onRemove,
                                   chips,
                                   setChips,
                                   max,
                                   maxlength = 20,
                                   placeholder = 'Add a chip...',
                               }) => {

    const KEY = {
        backspace: 8,
        tab: 9,
        enter: 13,
    };
    const INVALID_CHARS = /[^a-zA-Z0-9 ]/g;


    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (chips) {
            let keyPressed = event.which;

            if (
                keyPressed === KEY.enter ||
                (keyPressed === KEY.tab && event.currentTarget.value)
            ) {
                event.preventDefault();
                updateChips(event)
            } else if (keyPressed === KEY.backspace) {
                let updatedChips = [...chips];

                if (!event.currentTarget.value && updatedChips.length) {
                    onRemove(updatedChips[updatedChips.length - 1]);
                }
            }
        }
    };

    const clearInvalidChars = (event: React.ChangeEvent<HTMLInputElement>) => {

        // let value = event.currentTarget.value;
        //
        // if (INVALID_CHARS.test(value)) {
        //     event.currentTarget.value = value.replace(INVALID_CHARS, '');
        // } else if (value.length > Number(maxlength)) {
        //     event.currentTarget.value = value.substr(0, Number(maxlength));
        // }
    };

    const updateChips = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (chips) {
            if (!max || chips.length < Number(max)) {
                let value = event.currentTarget.value;

                if (!value) return;

                let chip = value.trim().toLowerCase();

                if (chip && chips.indexOf(chip) < 0) {
                    const res = [...chips, chip]
                    onChange(chip)
                }
            }
        }

        event.currentTarget.value = '';
    };

    const focusInput = (event: React.MouseEvent<HTMLDivElement>) => {
        let children = (event.currentTarget as HTMLDivElement).children;

        if (children.length) (children[children.length - 1] as HTMLInputElement).focus();
    };

    return (
        <div className="chips" onClick={focusInput}>
            {chips && chips.map((chip, index) => (
                <Badge key={index} variant="secondary" className="p-2 space-x-3 m-2">
                    <div className="flex justify-between gap-x-5 items-center">
                        <span className="chip-value">{chip}</span>
                        <button
                            type="button"
                            className="chip-delete-button"
                            onClick={() => onRemove(chip)}
                        >
                            x
                        </button>
                    </div>
                </Badge>
            ))}
            <input
                type="text"
                className="inline-block w-1/4 border-none outline-0"
                placeholder={!max || chips && chips.length < Number(max) ? placeholder : ''}
                onKeyDown={onKeyDown}
                onKeyUp={() => clearInvalidChars}
            />
        </div>
    );
};

export default Chips;
