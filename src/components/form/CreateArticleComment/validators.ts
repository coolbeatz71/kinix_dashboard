import { required } from '@helpers/validators';
import { Rule } from 'antd/lib/form';

export const commentValidator = (name: string): Rule[] => [required(name)];
