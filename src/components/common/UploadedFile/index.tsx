import React, { FC, Fragment } from 'react';
import { Alert } from 'antd';
import { isEmpty, truncate } from 'lodash';
import { FileWithPath } from 'react-dropzone';
import { EnumFormContext } from '@interfaces/app';
import getUploadedFileName from '@helpers/getUploadedFileName';

export interface IUploadedFileProp {
    fileUrl?: string | null;
    cloudFolderName: string;
    context: EnumFormContext;
    onRemove?: () => void | null;
    acceptedFiles?: FileWithPath[] | undefined;
}

const UploadedFile: FC<IUploadedFileProp> = ({ context, fileUrl, acceptedFiles, onRemove, cloudFolderName }) => {
    let fileName;

    if (fileUrl) {
        const mediaUrl = new URL(fileUrl);
        fileName = mediaUrl?.pathname;
    }

    return (
        <Fragment>
            {context === EnumFormContext.EDIT && !isEmpty(fileUrl) && isEmpty(acceptedFiles) ? (
                <Fragment>
                    <br />
                    <Alert
                        banner
                        closable
                        type="info"
                        onClose={onRemove}
                        message={truncate(getUploadedFileName(fileName, cloudFolderName), { length: 40 })}
                    />
                </Fragment>
            ) : (
                acceptedFiles?.map((file: FileWithPath) => (
                    <div key={file.path}>
                        <br />
                        <Alert
                            banner
                            closable
                            type="info"
                            onClose={onRemove}
                            style={{ minWidth: '180px' }}
                            message={truncate(file.path, { length: 40 })}
                        />
                    </div>
                ))
            )}
        </Fragment>
    );
};

export default UploadedFile;
