

const getResourse = async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Ошибка запроса ${url}; Статус ошибки ${response}`);
    };
    return await response.json();
};

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    });

    if (!response.ok) {
        throw new Error(`Ошибка запроса ${url}; Статус ошибки ${response}`);
    };

    return await response.json();
};