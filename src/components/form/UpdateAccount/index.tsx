import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Card, Typography, Form, Input, Select, Button, notification } from 'antd';
import { truncate } from 'lodash';
import { IUser } from '@interfaces/api';
import { IUserData } from '@interfaces/users';
import { useAppDispatch } from '@redux/store';
import { useSelector } from 'react-redux';
import { ICountryObject } from '@interfaces/countryObject';
import { IRootState } from '@redux/reducers';
import ErrorAlert from '@components/common/ErrorAlert';
import emailValidator, { countryNameValidator, phonePartialValidator, userNameValidator } from './validator';
import countryList from '@constants/countryList';
import updateAccountAction, { resetUpdateAccountAction } from '@redux/auth/updateAccount';
import setCurrentUserAction from '@redux/users/setCurrentUser';

import styles from './index.module.scss';

const { Option } = Select;
const { Title } = Typography;
const { Item, useForm, useWatch } = Form;
const btnStyles = `d-flex align-items-center justify-content-center`;

export interface IUpdateAccountProps {
    initialValues: IUser;
}

const UpdateAccountForm: FC<IUpdateAccountProps> = ({ initialValues }) => {
    const [form] = useForm();
    const dispatch = useAppDispatch();
    const selectedCountryName = useWatch('countryName', form);
    const [country, setCountry] = useState<ICountryObject>();
    const { loading, error } = useSelector(({ auth: { updateAccount } }: IRootState) => updateAccount);

    const onSubmit = (formData: IUserData): void => {
        const countryFlag = String(country?.flag);
        const phoneISOCode = String(country?.isoCode);
        const phoneDialCode = String(country?.dialCode);

        const { countryName, email, userName, phonePartial } = formData;

        dispatch(
            updateAccountAction({
                email,
                userName,
                countryFlag,
                countryName,
                phonePartial,
                phoneISOCode,
                phoneDialCode,
            }),
        ).then((res) => {
            if (res.type === 'auth/updateAccount/fulfilled') {
                setCurrentUserAction(res.payload)(dispatch);
                notification.success({
                    maxCount: 1,
                    key: 'success',
                    message: 'Youpi!',
                    placement: 'topRight',
                    description: 'Information du compte mise à jour avec succès',
                });
            }
        });
    };

    useEffect(() => {
        resetUpdateAccountAction()(dispatch);
    }, [dispatch]);

    useEffect(() => {
        if (selectedCountryName) {
            const selectedCountry = countryList.find((ct: ICountryObject) => ct.name === selectedCountryName);
            setCountry(selectedCountry);
        }
    }, [selectedCountryName]);

    const countryOption = (country: ICountryObject): ReactNode => (
        <Option value={country.name} key={country.name} label={country.name}>
            <div className="d-flex justify-content-between">
                <span>
                    <span>
                        <img width={15} height={15} src={country.flag} alt={country.isoCode} />
                    </span>
                    <span className="mx-2 fw-medium">
                        {truncate(country.name, {
                            length: 35,
                        })}
                    </span>
                </span>
                <span className="text-secondary">{country.dialCode}</span>
            </div>
        </Option>
    );
    return (
        <Card bordered className={styles.updateAccount}>
            <Title level={4} data-title>
                Information sur le compte
            </Title>

            <Form
                form={form}
                size="large"
                layout="vertical"
                onFinish={onSubmit}
                name="update_account"
                initialValues={initialValues}
            >
                <ErrorAlert error={error} closable banner showIcon />

                <Item
                    name="email"
                    label="Adresse e-mail"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={emailValidator('Adresse e-mail')}
                >
                    <Input size="large" placeholder="Adresse e-mail" />
                </Item>

                <Item
                    name="userName"
                    label="Pseudo"
                    rules={userNameValidator('Pseudo')}
                    validateTrigger={['onSubmit', 'onBlur']}
                >
                    <Input size="large" placeholder="Pseudo" />
                </Item>

                <Item
                    name="countryName"
                    label="Indicatif téléphonique"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={countryNameValidator('Indicatif téléphonique')}
                >
                    <Select showSearch size="large" placeholder="Selectionner indicatif téléphonique">
                        {countryList.map((country) => countryOption(country))}
                    </Select>
                </Item>

                <Item
                    label="Téléphone"
                    name="phonePartial"
                    validateTrigger={['onSubmit', 'onBlur']}
                    rules={phonePartialValidator('Téléphone', country?.dialCode)}
                >
                    <Input size="large" placeholder="Ex: 815252801" prefix={country?.dialCode} />
                </Item>

                <Button size="large" type="primary" htmlType="submit" loading={loading} className={`mt-2 ${btnStyles}`}>
                    Envoyer
                </Button>
            </Form>
        </Card>
    );
};

export default UpdateAccountForm;
