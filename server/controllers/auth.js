const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.login = (req, res) => {
    const { name, password } = req.body;

    if (password == process.env.PASSWORD_EDITOR) {
        // generate token and send to client/react
        const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        let role = 'editor';
        return res.json({ token, name, role })
    }
    else if (password == process.env.PASSWORD_VIEWER) {
        // generate token and send to client/react
        const token = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' });
        let role = 'viewer';
        return res.json({ token, name, role })
    }
    else {
        return res.status(400).json({
            error: 'Incorrect password!'
        });
    }
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], 
    userProperty: "auth",
  });