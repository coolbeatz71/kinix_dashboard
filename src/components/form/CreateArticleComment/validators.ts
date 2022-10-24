import { required } from '@helpers/validators';
import { Rule } from 'antd/es/form';

export const commentValidator = (name: string): Rule[] => [required(name)];
