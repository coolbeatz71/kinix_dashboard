const getCurrentPath = (location: Location): string => {
    return location?.href.replace(location?.origin, '');
};

export default getCurrentPath;
