import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: "postgres",
    host: 'localhost',
    username: "user",
    password: "pass",
    logging: true,
    database: 'data',
    define: {
        timestamps: false
    },
    dialectOptions: {
        connectTimeout: 1000 * 1000,
        multipleStatements: true
    }
});

// sequelize-automate -o . -d flibusta -h localhost -u root -P 3306 -p PASSWORD -e mysql
