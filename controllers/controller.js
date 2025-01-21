var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://bhags2006:bhagi2006@birthdaycluster.oilpf.mongodb.net/');

//Create a Schema
var BirthdaySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true 
    },
    birthday: {
        type: Date,
        required: true }
});

var BirthdayModel = mongoose.model('BirthdayModel', BirthdaySchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

app.get('/birthday', function(req, res) {
    //get data from mongodb and pass it to the view
    BirthdayModel.find({}).then((data) => {
        res.render('index', { birthdays: data});
    });
    
});

app.post('/birthday', urlencodedParser, function (req, res) {
    //get data from the view and add it to mongodb
    var newBirthdayModel = BirthdayModel(req.body);
    newBirthdayModel.save().then((data) => {
        res.json(data);
    });
});

app.delete('/birthday/:name', function (req, res) {
    //delete the requested item from mongodb
    BirthdayModel.findOneAndDelete({ name : req.params.name} ).then((deleted) => {
            if (!deleted) {
                res.status(404).send('Birthday not found.');                
            } else {
                res.json(deleted);
            }
        });
});

//Update a birthday by name 
app.put('/birthday/:name', urlencodedParser, function (req, res){
    BirthdayModel.findOneAndUpdate(
        { name : req.params.name},
        { $set: { birthday: req.body.birthday } },
        { new: true },
    ).then((updated) => {
            if (!updated) {
                res.status(404).send('Birthday not found.');
            } else {
                res.json(updated);
            }
        });
});

//Search for a birthday by name
app.get('/birthday/:name', function (req, res) {
    BirthdayModel.findOne({ name: req.params.name }).then((birthday) => {
            if (!birthday) {
                res.status(404).send('Birthday not found.');
            } else {
                res.json(birthday);
            }
        });

});

};
