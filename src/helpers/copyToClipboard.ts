const copyToClipboard = async (text: string): Promise<void | boolean> => {
    if ('clipboard' in navigator) return await navigator.clipboard.writeText(text);
    else return document.execCommand('copy', true, text);
};

export default copyToClipboard;

// const handleCopyClick = () => {
//     // Asynchronously call copyTextToClipboard
//     copyTextToClipboard(copyText)
//       .then(() => {
//         // If successful, update the isCopied state value
//         setIsCopied(true);
//         setTimeout(() => {
//           setIsCopied(false);
//         }, 1500);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
