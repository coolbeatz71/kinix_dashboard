import { truncate, upperFirst } from 'lodash';

const formatName = (name: string): string =>
    upperFirst(
        truncate(name, {
            length: 15,
        }),
    );

export default formatName;
