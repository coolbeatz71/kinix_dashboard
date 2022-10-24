import { minmax, required } from '@helpers/validators';
import { Rule } from 'antd/es/form';

export const titleValidator = (name: string): Rule[] => [required(name)];
export const summaryValidator = (name: string): Rule[] => {
    return [
        required(name),
        minmax(name, {
            min: 100,
            max: 300,
        }),
    ];
};

export const tagsValidator = (name: string): Rule[] => [required(name)];
