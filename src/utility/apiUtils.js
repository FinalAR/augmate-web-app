const getApiUrl = (path) => {
    console.log(process.env.REACT_APP_API_BASE_URL);
    const baseUrl = process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API_BASE_URL_PROD
        : process.env.REACT_APP_API_BASE_URL;
    return `${baseUrl}${path}`;
};

export default getApiUrl;