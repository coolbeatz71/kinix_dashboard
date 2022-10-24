import { minmax, required } from '@helpers/validators';
import { Rule } from 'antd/es/form';
import validator from 'validator';

export const emailValidator = (name: string): Rule[] => [
    {
        type: 'email',
        required: true,
        message: `${name} a un format invalide.`,
    },
];

export const roleValidator = (name: string): Rule[] => [required(name)];

export const userNameValidator = (name: string): Rule[] => {
    const min = 3;
    const max = 20;
    return [
        required(name),
        minmax(name, {
            min,
            max,
        }),
        {
            validator(_rule: unknown, value: string) {
                const regex = new RegExp(`.{${min},${max}}$`);

                if ([undefined, null, ''].includes(value)) return Promise.resolve();

                if (!validator.isAlphanumeric(value) && regex.test(value)) {
                    return Promise.reject(`${name} ne doit contenir que des caractères alphabétique ou des chiffres.`);
                }
                return Promise.resolve();
            },
        },
    ];
};
