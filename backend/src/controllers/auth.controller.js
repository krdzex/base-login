import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../config/config";


const signin = (req, res) => {
    console.log(req.body)
    User.findOne({ "email": req.body.email }, (err, user) => {
        if (err || !user) {
            return res.status("401").json({
                err: "User not found"
            })
        }

        if (!user.authenticate(req.body.password)) {
            return res.status("401").send({
                err: "Email and password dont match"
            })
        }
        const payload = {
            id: user._id,
            name: user.name
        }
        jwt.sign(payload,
            config.secretOrKey,
            { expiresIn: 1200 },
            (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token
                })
            }
        );
    })
}

export default { signin }