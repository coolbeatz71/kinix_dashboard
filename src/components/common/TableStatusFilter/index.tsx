import React, { Dispatch, FC, SetStateAction } from 'react';
import { Select } from 'antd';
import { EnumStatus } from '@interfaces/articles';
import { STATUS_FILTER_LIST } from '@constants/app';

export interface ITableStatusFilterProps {
    status: EnumStatus;
    navigateToStatus: (status: EnumStatus) => void;
    setStatus: Dispatch<SetStateAction<EnumStatus>>;
}

const TableStatusFilter: FC<ITableStatusFilterProps> = ({ status, setStatus, navigateToStatus }) => {
    const selectStyle = {
        width: 180,
    };

    return (
        <Select
            value={status}
            style={selectStyle}
            defaultValue={status}
            onChange={(val) => {
                setStatus(val);
                navigateToStatus(val);
            }}
            options={STATUS_FILTER_LIST}
        />
    );
};

export default TableStatusFilter;
