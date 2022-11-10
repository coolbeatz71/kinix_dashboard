import { minmax, required } from '@helpers/validators';
import { Rule } from 'antd/es/form';
import validator from 'validator';

export const nameValidator = (name: string): Rule[] => {
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

                if (!validator.isAlpha(value) && regex.test(value)) {
                    return Promise.reject(`${name} ne doit contenir que des caractères alphabétique.`);
                }
                return Promise.resolve();
            },
        },
    ];
};
