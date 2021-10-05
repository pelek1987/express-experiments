const express = require("express");
const hbs = require("express-handlebars");
const handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require("body-parser");
const users = require("./users");
const {use} = require("express/lib/router");
const api = require("./api")
const app = express();

app.engine("handlebars", hbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));

// app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use( express.static("public") );
app.use( bodyParser.json() );
app.use("/api", api);

app.get("/", async (req, res) => {
    try {
        res.render("home", {
            title: "Lista użytkowników",
            users: await users.list()
        });
    } catch(err) {
        res.status(404);
        res.send(err.message);
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        res.render("user", await users.get(req.params.id));
    } catch(err) {
        res.status(404);
        res.send(err.message);
    }
});

app.listen(8080, (err) => {

    if(err) {
        console.error(err);
    }

    console.log("Serwer został uruchomiony pod adresem http://localhost:8080");

});
