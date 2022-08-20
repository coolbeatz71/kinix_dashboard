const copyToClipboard = async (text: string): Promise<void | boolean> => {
    if ('clipboard' in navigator) return await navigator.clipboard.writeText(text);
    else return document.execCommand('copy', true, text);
};

export default copyToClipboard;
