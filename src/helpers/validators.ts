import { Rule } from 'antd/es/form';

interface IMinMax {
    min?: number;
    max: number;
}

export const required = (name: string): Rule => ({
    required: true,
    message: `${name} obligatoire`,
});

export const max = (name: string, max: number): Rule => {
    return {
        max,
        message: `${name} doit contenir au maximum ${max} caractères`,
    };
};

export const minmax = (name: string, len: IMinMax): Rule => {
    const rule = { min: len.min, max: len.max };
    return {
        ...rule,
        message: `${name} doit contenir entre ${len.min} et ${len.max} caractères`,
    };
};
