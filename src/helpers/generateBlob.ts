import { IUnknownObject } from '@interfaces/app';
import getResizedCanvas from './getResizedCanvas';

const generateImg = (previewCanvas: HTMLCanvasElement, crop: IUnknownObject): Promise<Blob> | undefined => {
    if (!crop || !previewCanvas) return;

    const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
    return new Promise((res) => {
        canvas.toBlob((blob: unknown) => res(blob as Blob), 'image/png', 1);
    });
};

export default generateImg;
