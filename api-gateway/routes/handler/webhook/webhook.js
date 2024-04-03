const apiAdapter = require('../../apiAdapter');

const {
    URL_SERVICE_ORDER_PAYMENT
} = process.env;

const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
    try {
        const webhook = await api.post('./api/webhook', req.body);
        return res.json(webhook.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service unavailable!'
            })
        }

        if (error.response) {
            // If error.response exists, destructure properties from it
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            // If error.response is undefined, handle the error accordingly
            return res.status(500).json({
                status: 'error',
                message: 'An unexpected error occurred.'
            });
        }
    }
}