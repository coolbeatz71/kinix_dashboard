import { lowerCase, truncate, upperFirst, upperCase } from 'lodash';

declare const FORMAT_ELE_LIST: ['upper-truncate', 'upper-lowercase', 'lowercase', 'uppercase'];
export declare type FormatProps = typeof FORMAT_ELE_LIST[number];

export const upperFirstTruncate = (value: string | undefined): string => {
    return upperFirst(
        truncate(value, {
            length: 15,
        }),
    );
};

const format = (value: string | undefined, format: FormatProps = 'lowercase'): string => {
    switch (format) {
        case 'upper-truncate':
            return upperFirstTruncate(value);
        case 'upper-lowercase':
            return upperFirst(lowerCase(value));
        case 'uppercase':
            return upperCase(value);
        default:
            return lowerCase(value);
    }
};

export default format;
