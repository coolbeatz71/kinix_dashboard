const getPercentage = (total: number, value: number): number => {
    return Math.round((value / total) * 100) || 0;
};

export default getPercentage;
