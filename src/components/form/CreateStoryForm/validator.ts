import dayjs from 'dayjs';
import validator from 'validator';
import { Rule } from 'antd/lib/form';
import { minmax, required } from '@helpers/validators';

export const planValidator = (name: string): Rule[] => [required(name)];
export const userValidator = (name: string): Rule[] => [required(name)];
export const titleValidator = (name: string): Rule[] => {
    return [
        required(name),
        minmax(name, {
            min: 10,
            max: 50,
        }),
    ];
};

export const subTitleValidator = (name: string): Rule[] => {
    return [
        required(name),
        minmax(name, {
            min: 10,
            max: 50,
        }),
    ];
};

export const legendValidator = (name: string): Rule[] => {
    return [
        required(name),
        minmax(name, {
            min: 1,
            max: 20,
        }),
    ];
};

export const bodyValidator = (name: string): Rule[] => {
    return [
        required(name),
        minmax(name, {
            min: 100,
            max: 250,
        }),
    ];
};

export const redirectUrl = (name: string): Rule[] => {
    return [
        () => ({
            validator(_rule: Rule, value: string) {
                if ([undefined, null, ''].includes(value)) return Promise.resolve();
                if (validator.isURL(value)) return Promise.resolve();
                return Promise.reject(`${name} doit être une URL valide`);
            },
        }),
    ];
};

export const startDateValidator = (name: string): Rule[] => {
    return [
        required(name),
        () => ({
            validator(_rule, value) {
                if ([null, undefined, ''].includes(value)) return Promise.resolve();
                if (!dayjs(value).isValid()) {
                    return Promise.reject(`${name} doit être une date valide`);
                }

                if (dayjs(value).isBefore(dayjs().startOf('day'))) {
                    return Promise.reject(`${name} ne doit pas être dans le passé`);
                }

                return Promise.resolve();
            },
        }),
    ];
};
