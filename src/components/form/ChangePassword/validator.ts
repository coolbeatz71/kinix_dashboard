import { required } from '@helpers/validators';
import { IUnknownObject } from '@interfaces/app';
import { Rule } from 'antd/es/form';

export const newPassword = (name: string): Rule[] => {
    return [
        required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
            message: `${name} doit avoir au moins 6 caractères et contenir 1 majuscule, 1 minuscule, 1 chiffre`,
        },
    ];
};

export const passwordMatchValidator = (name: string): Rule[] => [
    ({ getFieldValue }: IUnknownObject) => ({
        validator(_rule: unknown, value: string) {
            if ([undefined, '', null].includes(getFieldValue(['confNewPassword']))) {
                return Promise.reject(`${name} est obligatoire`);
            }

            if (value !== getFieldValue(['newPassword'])) {
                return Promise.reject('Le mot de passe et la confirmation doivent être identiques');
            }
            return Promise.resolve();
        },
    }),
];
