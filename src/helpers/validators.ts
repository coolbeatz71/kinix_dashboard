import { Rule } from 'antd/lib/form';

interface IMinMax {
    min: number;
    max: number;
}

export const required = (name: string): Rule => ({
    required: true,
    message: `${name} obligatoire`,
});

export const minmax = (name: string, len: IMinMax): Rule => {
    const rule = { min: len.min, max: len.max };
    return {
        ...rule,
        message: `${name} doit contenir entre ${len.min} et ${len.max} caractères`,
    };
};
