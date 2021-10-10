
module.exports = {
    authUserController: (req, res) => {
        try {
            res.json(`Hello ${req.body.email}`);
        } catch (e) {
            throw new Error(e.message);
        }
    }
};
