const getUploadedFileName = (fileName = '', folderName: string): string => {
    const splitted = fileName?.split(`${folderName}/`);
    const name = splitted[1]?.split('.')[0];
    return name;
};

export default getUploadedFileName;
