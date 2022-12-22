const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const ime = req.body.firstName;
  const prezime = req.body.lastName;
  const mail = req.body.email;
  const listID = "b066729875";
  const usBroj = 21;
  var data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: ime,
          LNAME: prezime,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/b066729875";

  const options = {
    method: "POST",
    auth: "miroslav:fa52f0512cf2712db804f4a10c227bc6-us21",
  };

  const request = https.request(url, options, function (response) {
  
    if (response.statusCode === 200) {
        /* res.send(" Uspešno pretplaćen"); */
        res.sendFile(__dirname + "/success.html");

    } else {
        res.sendFile(__dirname + "/failure.html");
    }
    

    response.on("data", function (data) {
      /* console.log(JSON.parse(data)); */
    });
  });

  request.write(jsonData);
  request.end();

  console.log(ime);
  console.log(prezime);
  console.log(mail);
});

app.post("/failure", function (req, res) {
    res.redirect("/");


}
);



app.listen(3000, function () {
  console.log(`Server started on port 3000`);
});

/* fa52f0512cf2712db804f4a10c227bc6-us21 */

/*  */
