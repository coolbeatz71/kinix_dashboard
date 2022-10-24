import { minmax, required } from '@helpers/validators';
import { Rule } from 'antd/es/form';
import validator from 'validator';
import { PhoneNumberUtil } from 'google-libphonenumber';
import countryList from '@constants/countryList';
import { ICountryObject } from '@interfaces/countryObject';

const emailValidator = (name: string): Rule[] => [
    required(name),
    {
        type: 'email',
        message: `${name} a un format invalide`,
    },
];

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

export const countryNameValidator = (name: string): Rule[] => [required(name)];

export const phonePartialValidator = (name: string, phoneDialCode: string | undefined): Rule[] => [
    required(name),
    {
        validator(_rule: unknown, value: string) {
            const regexDialCode = /^\+\d{1,4}$/;
            const regexPhone = new RegExp(/^[1-9][0-9]{1,12}$/);

            if ([null, undefined, ''].includes(value)) {
                return Promise.resolve();
            }

            if (!value.match(regexPhone)) {
                return Promise.reject(`${phoneDialCode}${value} a un format invalide`);
            }

            if (!phoneDialCode || !phoneDialCode.match(regexDialCode)) {
                return Promise.reject(new Error('indicatif téléphonique est invalide'));
            }

            const fullPhoneNumber = `${phoneDialCode}${value}`;
            const country = countryList.find((ct: ICountryObject) => ct.dialCode === phoneDialCode);

            const isoCode = country?.isoCode;

            return PhoneNumberUtil.getInstance().isValidNumberForRegion(
                PhoneNumberUtil.getInstance().parse(fullPhoneNumber, isoCode),
                isoCode,
            )
                ? Promise.resolve()
                : Promise.reject(`${name} est invalide pour la région choisie`);
        },
    },
];

export default emailValidator;
