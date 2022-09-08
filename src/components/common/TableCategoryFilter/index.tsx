import React, { Dispatch, FC, SetStateAction } from 'react';
import { Select } from 'antd';
import { CATEGORY_FILTER_LIST } from '@constants/app';
import EnumCategory from '@interfaces/category';

export interface ITableCategoryFilterProps {
    category: EnumCategory;
    navigateToCategory: (cat: EnumCategory) => void;
    setCategory: Dispatch<SetStateAction<EnumCategory>>;
}

const TableCategoryFilter: FC<ITableCategoryFilterProps> = ({ category, setCategory, navigateToCategory }) => {
    const selectStyle = {
        width: 180,
    };

    return (
        <Select
            value={category}
            style={selectStyle}
            defaultValue={category}
            onChange={(val) => {
                setCategory(val);
                navigateToCategory(val);
            }}
            options={CATEGORY_FILTER_LIST}
        />
    );
};

export default TableCategoryFilter;
