const config = {
    env: process.env.NODE_ENV || "development", port: process.env.PORT || 4400,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: "mongodb+srv://krsto:kikimiki@cluster0.jeudp.mongodb.net/project3?retryWrites=true&w=majority",
    secretOrKey: "secret"
}

export default config;