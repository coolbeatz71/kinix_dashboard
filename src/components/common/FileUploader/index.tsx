import React, { FC } from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';
import { Row, Col, Typography } from 'antd';
import UploadedFile from '@components/common/UploadedFile';
import { EnumFormContext } from '@interfaces/app';
import CustomIcon from '@components/common/CustomIcon';

import styles from './index.module.scss';

export interface IFileUploaderProps {
    acceptedFiles: File[];
    cloudFolderName: string;
    onRemoveFile: () => void;
    context: EnumFormContext;
    media: string | null | undefined;
    getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
    getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
}

const FileUploader: FC<IFileUploaderProps> = ({
    media,
    context,
    getRootProps,
    onRemoveFile,
    acceptedFiles,
    getInputProps,
    cloudFolderName,
}) => {
    return (
        <div
            {...getRootProps({
                className: 'dropzone',
            })}
        >
            <Row justify="center" align="middle" className={styles.fileUploader}>
                <input {...getInputProps()} />
                <Col span={24} className="d-flex justify-content-center">
                    <CustomIcon type="media-icon" data-image-icon />
                </Col>
                <Col span={24}>
                    <br />
                    <Typography className="text-muted">
                        Faites glisser et déposez un fichier photo/vidéo, ou parcourez
                    </Typography>
                </Col>
            </Row>
            <Row justify="center" align="middle" className={styles.fileUploader__result}>
                <Col span={24}>
                    <UploadedFile
                        context={context}
                        onRemove={onRemoveFile}
                        acceptedFiles={acceptedFiles}
                        cloudFolderName={cloudFolderName}
                        fileUrl={context === EnumFormContext.EDIT ? media : null}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default FileUploader;
