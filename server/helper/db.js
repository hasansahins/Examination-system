
var mongoose = require("mongoose");


// admin
// ExaminationSystemadmin
module.exports = () => {
    mongoose.connect("mongodb+srv://admin:ExaminationSystemadmin@examinationsystem.vk07v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useMongoClient: true });

    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
      });
      mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
      });

    mongoose.Promise = global.Promise;
}
