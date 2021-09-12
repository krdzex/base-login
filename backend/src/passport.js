import User from "../models/user.model"
const ExtractJWT = require("passport-jwt").ExtractJWT;
import mongoose from "mongoose";
import config from "./config/config";


const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload), done) => {
        User.findById(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false)
        })
            .catch(err => console.log(err))
    })
  );
}