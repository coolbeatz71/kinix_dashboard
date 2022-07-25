import { required } from '@helpers/validators';
import { Rule } from 'antd/lib/form';

export const titleValidator = (name: string): Rule[] => [required(name)];
export const linkValidator = (name: string): Rule[] => [required(name)];
export const categoryValidator = (name: string): Rule[] => [required(name)];
export const userValidator = (name: string): Rule[] => [required(name)];
export const tagsValidator = (name: string): Rule[] => [required(name)];
