const getFileType = (mimeType: string): 'image' | 'video' => {
    return /^image/.test(mimeType) ? 'image' : 'video';
};

export default getFileType;
