import React, { Dispatch, FC, SetStateAction } from 'react';
import { Select } from 'antd';
import { EnumRoleAdmin, EnumRoleClient } from '@interfaces/role';
import { ADMINS_FILTER_LIST, CLIENTS_FILTER_LIST } from '@constants/app';

export interface ITableRoleFilterProps {
    context: 'clients' | 'admins';
    role: EnumRoleClient | EnumRoleAdmin;
    navigateToRole: (role: EnumRoleClient | EnumRoleAdmin) => void;
    setRole: Dispatch<SetStateAction<EnumRoleClient | EnumRoleAdmin>>;
}

const TableRoleFilter: FC<ITableRoleFilterProps> = ({ role, setRole, navigateToRole, context }) => {
    const isAdminContext = context === 'admins';
    const selectStyle = {
        width: 180,
    };

    return (
        <Select
            value={role}
            style={selectStyle}
            defaultValue={role}
            onChange={(val) => {
                setRole(val);
                navigateToRole(val);
            }}
            options={isAdminContext ? ADMINS_FILTER_LIST : CLIENTS_FILTER_LIST}
        />
    );
};

export default TableRoleFilter;
