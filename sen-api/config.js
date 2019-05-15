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
        }
    }
};

module.exports = config;