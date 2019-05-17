export const config = {
    "title": "HomeCenter",
    "versionRelease": "TBD",
    "versionTitle": "alpha",
    "version": "1.0.0",
    "server": {
        "enviroment": process.env.NODE_ENVIROMENT,
        "port": process.env.PORT,
        "domain": process.env.DOMAIN,
        "transport": process.env.TRANSPORT
    },
    "email": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD
    },
    "hash": {
        "salt": process.env.HASH_SALT
    },
    "database": {
        "dbUrl": process.env.MONGODB_URI
    },
    "session": {
        "secret": process.env.SECRET
    }
};