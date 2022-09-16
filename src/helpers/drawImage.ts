import { MutableRefObject } from 'react';
import { WHITE } from '@constants/colors';
import { IUnknownObject } from '@interfaces/app';
import { Crop } from 'react-image-crop';

const pixelRatio = 4;

export const clearImage = (previewCanvasRef: MutableRefObject<IUnknownObject | null>): void => {
    const canvas = previewCanvasRef.current;
    const ctx = canvas?.getContext('2d');

    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, canvas?.width, canvas?.height);
};

const drawImage = (
    imgRef: MutableRefObject<IUnknownObject | null>,
    previewCanvasRef: MutableRefObject<IUnknownObject>,
    completedCrop: Crop,
): void => {
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image?.naturalWidth / image?.width;
    const scaleY = image?.naturalHeight / image?.height;
    const ctx = canvas?.getContext('2d');

    canvas.width = Number(crop.width) * pixelRatio;
    canvas.height = Number(crop.height) * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
        image,
        Number(crop.x) * scaleX,
        Number(crop.y) * scaleY,
        Number(crop.width) * scaleX,
        Number(crop.height) * scaleY,
        0,
        0,
        crop.width,
        crop.height,
    );
};

export default drawImage;
