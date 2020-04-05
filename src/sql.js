const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('', '', '', {
    host: '',
    dialect: 'sql'
});

class Book extends Model { }

Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    publisher: DataTypes.STRING,
    publicationDate: DataTypes.DATE,
    language: DataTypes.STRING,
    subject: DataTypes.STRING,
    license: DataTypes.STRING
}, { sequelize, modelName: 'book' });

(async () => {
    await sequelize.sync();
})();

module.exports = async function addBook(data) {
    try {
        await Book.create(data);
    } catch (error) {
        console.log(error);
    }
}