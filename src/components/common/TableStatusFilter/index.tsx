import React, { Dispatch, FC, SetStateAction } from 'react';
import { Select } from 'antd';
import { EnumStatus } from '@interfaces/app';
import { STATUS_FILTER_LIST } from '@constants/app';

import styles from './index.module.scss';

export interface ITableStatusFilterProps {
    status: EnumStatus;
    navigateToStatus: (status: EnumStatus) => void;
    setStatus: Dispatch<SetStateAction<EnumStatus>>;
}

const TableStatusFilter: FC<ITableStatusFilterProps> = ({ status, setStatus, navigateToStatus }) => {
    return (
        <Select
            value={status}
            defaultValue={status}
            onChange={(val) => {
                setStatus(val);
                navigateToStatus(val);
            }}
            options={STATUS_FILTER_LIST}
            className={styles.statusFilter}
        />
    );
};

export default TableStatusFilter;
