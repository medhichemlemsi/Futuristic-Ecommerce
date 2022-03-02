
require('dotenv').config() 
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const User1 = require("../models/User")


let SecretOrKey = process.env.secretOrKey;


let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:SecretOrKey
}

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        const { id } = jwt_payload
        const user = await User1.findById(id);
        try {
            user ? done(null, user) : done(null, false)
        } catch (error) {
            console.log(error)
        }
    })
)

exports.isAuth = () => passport.authenticate("jwt", { session: false })