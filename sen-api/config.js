var config = {
    dev:{
        database:{
            server:"DESKTOP-KNUI0NO\\SQLEXPRESS",
            database:"SEN_DB",
            user:"sa",
            password:"sa",
            port: 1433
        },
        server:{
            port:8080
        },
        jwt:{
            secretKey:"SuPeRsEcReTcOdE123",
            saltLength:15,
            expireIn: 86400 //24h
        }
    },
    prod:{
        database:{
            user:"",
            password:"",
            server:"",
            database:""
        },
        server:{
            port:8080
        },
        jwt:{
            secretKey:"",
            saltLength:15,
            expireIn: 86400 //24h
        }
    }
};

module.exports = config;