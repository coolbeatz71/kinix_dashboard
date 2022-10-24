import { required } from '@helpers/validators';
import { Rule } from 'antd/es/form';

const emailValidator = (name: string): Rule[] => [
    required(name),
    {
        type: 'email',
        message: `${name} a un format invalide`,
    },
];

export const passwordValidator = (name: string): Rule[] => {
    return [
        required(name),
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
            message: `${name} doit avoir au moins 6 caractères et contenir 1 majuscule, 1 minuscule, 1 chiffre`,
        },
    ];
};

export default emailValidator;
