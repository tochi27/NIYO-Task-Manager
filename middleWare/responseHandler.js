// RespondsHandler.js

const respondsSender = (data, responseMessage, responseCode, res) => {
    
    const response = {
        data: data !== undefined ? data : null,
        responseMessage,
        responseCode
    };
    return res.status(responseCode).json(response);
};

module.exports = { respondsSender };
