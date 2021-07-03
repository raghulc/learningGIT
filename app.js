const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running in Port 3000");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const dataJSON = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/756a9bd955";

    const options = {
        method: "POST",
        auth: "test1:7703a447f36c4ba0d5660d6ec5414c18-us1"
    };

    const requestMailChimp = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    requestMailChimp.write(dataJSON);
    requestMailChimp.end();
})



//API Key - 7703a447f36c4ba0d5660d6ec5414c18-us1
//listID - 756a9bd955
