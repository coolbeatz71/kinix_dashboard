import { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import ReactCrop, { Crop } from 'react-image-crop';
import { Modal, Upload, message, UploadFile } from 'antd';
import drawImage, { clearImage } from '@helpers/drawImage';
import generateBlob from '@helpers/generateBlob';
import { IUnknownObject } from '@interfaces/app';
import validator from 'validator';

import styles from './index.module.scss';
import { CameraOutlined } from '@ant-design/icons';

interface IImageCropperProps {
    uploadFile?: File;
    image: Crop | null;
    uploadHint: string;
    onCancel: () => void;
    file: UploadFile<File>[];
    onOk: (image: Crop | null, file: File[], uploadFile: File) => void;
}

const ImageCropper: FC<IImageCropperProps> = ({ file: fl, image, uploadFile, onCancel, onOk, uploadHint }) => {
    const [crop, setCrop] = useState<Crop | IUnknownObject>({
        unit: '%',
        width: 100,
        aspect: 4 / 3,
    });
    const [cropped, setCropped] = useState<string | null | ArrayBuffer>();
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(image);
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

    const [show, setShow] = useState<boolean>(false);
    const [file, setFile] = useState<UploadFile<File>[]>(fl);

    const previewCanvasRef = useRef(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const cancel = useCallback(
        (r: MutableRefObject<null>) => {
            setFile([]);
            setShow(false);
            setCropped(null);
            setCompletedCrop(null);

            clearImage(r);
            onCancel();
        },
        [onCancel],
    );

    const props = {
        name: 'image',
        multiple: false,
        accept: 'image/*',
        fileList: file,
        showUploadList: true,
        beforeUpload: () => false,
        onChange: ({ file, fileList }: IUnknownObject) => {
            if (fileList.length > 0) {
                setFile([file]);
                setShow(true);
                setCropped(null);
            } else {
                setPreview(null);
                cancel(previewCanvasRef);
            }
        },
    };

    useEffect(() => {
        if (file.length > 0 && show) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setCropped(reader.result));
            reader.readAsDataURL(file[0] as unknown as File);
        }
    }, [file, show]);

    useEffect(() => {
        if (uploadFile instanceof File) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setPreview(reader.result));
            reader.readAsDataURL(uploadFile);
        }
    }, [uploadFile]);

    useEffect(() => {
        setFile(fl);
    }, [fl]);

    useEffect(() => {
        setCompletedCrop(image);
    }, [image]);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;
        drawImage(imgRef, previewCanvasRef as unknown as MutableRefObject<IUnknownObject>, completedCrop);
    }, [completedCrop]);

    const onLoad = useCallback((img: HTMLImageElement) => {
        imgRef.current = img;
    }, []);

    return (
        <div className={styles.cropping}>
            <Upload.Dragger className={styles.cropping__upload} {...props}>
                <div className={styles.cropping__upload__inner}>
                    <div className={styles.cropping__upload__inner__canvas}>
                        {validator.isURL(typeof completedCrop === 'string' ? completedCrop : '') ? (
                            <img src={completedCrop as string} alt="cropped image" />
                        ) : typeof preview === 'string' ? (
                            <img src={preview} alt="image preview" />
                        ) : (
                            <canvas ref={previewCanvasRef} />
                        )}
                    </div>
                </div>
                <p className={styles.cropping__upload__hint}>
                    <CameraOutlined />
                    {completedCrop ? 'Remplancez image' : uploadHint}
                </p>
            </Upload.Dragger>
            <Modal
                visible={show}
                destroyOnClose
                title="Crop image"
                onCancel={() => cancel(previewCanvasRef)}
                onOk={() => {
                    setShow(false);
                    generateBlob(previewCanvasRef.current as unknown as HTMLCanvasElement, crop)
                        ?.then((blob: Blob) => {
                            onOk(
                                completedCrop,
                                file as unknown as File[],
                                new File([blob], `${dayjs().unix()}`, {
                                    type: 'image/png',
                                    lastModified: dayjs().unix(),
                                }),
                            );
                        })
                        .catch((exc) => {
                            message.error(exc.message);
                            cancel(previewCanvasRef);
                        });
                }}
                okText="Ok"
                cancelText="Annuler"
                okButtonProps={{
                    disabled: !completedCrop || completedCrop?.width === 0 || completedCrop?.height === 0,
                }}
            >
                <ReactCrop
                    crop={crop as Crop}
                    onImageLoaded={onLoad}
                    src={cropped as string}
                    onChange={(c: Crop) => setCrop(c)}
                    onComplete={(c: Crop) => setCompletedCrop(c)}
                />
            </Modal>
        </div>
    );
};

export default ImageCropper;
