import ReactPlayer from 'react-player';
import { Rule } from 'antd/lib/form';
import { max, required } from '@helpers/validators';

export const titleValidator = (name: string): Rule[] => [required(name)];
export const categoryValidator = (name: string): Rule[] => [required(name)];
export const userValidator = (name: string): Rule[] => [required(name)];
export const tagsValidator = (name: string): Rule[] => [required(name)];

export const linkValidator = (name: string): Rule[] => [
    required(name),
    max(name, 100),
    () => ({
        validator(_rule: Rule, value: string) {
            if ([undefined, null, ''].includes(value)) return Promise.resolve();
            if (ReactPlayer.canPlay(value)) return Promise.resolve();
            return Promise.reject('Le lien de la video a un format invalide');
        },
    }),
];
