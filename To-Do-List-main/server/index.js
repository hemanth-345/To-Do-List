const express = require("express");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csv = require("csv-parser");
const path = require('path');
const varia = require('dotenv');

const app = express();
varia.config();
const PORT =  2500 ;

// Middleware to parse JSON data
app.use(express.json());

const __dirname1 = path.resolve();

console.log(__dirname1);

if(process.env.NODE_ENV === "development"){
  app.use(express.static(path.join(__dirname1 + "/server/public")));
  app.get('*',(req,res) => {
        res.sendFile(path.resolve( __dirname1 + "server/public/index.html" ));
  });
}
else{
    app.get("/",(req,res) =>{
      res.send("Success"); 
    });
}


// Define the CSV writer

let emailstor = null;
// Endpoint for user registration
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  console.log(email)
  console.log(password)


  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Check if the user already exists in the CSV file (simplified check)
  const users = []; // Load existing users from the CSV file
  // Add code to read existing users from the CSV file here

  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "Email is already registered." });
  }

  // Write the new user to the CSV file
  
  const newUser = { email, password, items: ["All Done For Today"], tasksDone: [] };

  const csvWriter1 = createCsvWriter({
    path: "users.csv",
    header: [
      { id: "email", title: "Email" },
      { id: "password", title: "Password" },
      { id: "items", title: "Items" },
      { id: "tasksDone", title: "TasksDone" },
    ],
    append: true,
  });

  csvWriter1.writeRecords([newUser])
    .then(() => {
      res.status(201).json({ message: "Registration successful" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    });
});

// ...

// Endpoint for user login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  
  
  console.log(email);
  console.log(password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Read the CSV file and search for the user
  const users = [];

  let found = false;

  fs.createReadStream("users.csv")
    .pipe(csv({ headers: false })) // Disable headers auto-detection
    .on("data", (row) => {
      if (row[0] === email && row[1] === password) {
        found = true;
        const items = row[2].split(","); // Split the comma-separated string into an array

      const user = {
        email,
        password,
        items
        // tasksDone: JSON.parse(row[3]), // Parse the tasksDone list from CSV string
      };
        
        emailstor = email;

        console.log("emailstor " + emailstor)
       
        return res.status(200).json({ message: "Login successful", user });
      }
    })
    .on("end", () => {
      if (!found) {
        res.status(401).json({ message: "Invalid email or password." });
      }
    });
});


// Existing code ...

// Endpoint for saving the list of items to a CSV file
app.post("/api/save-items", (req, res) => {
 

  console.log(req.body);
  const { items } = req.body;

// Extract the list of items into a separate array
 const itemList = items.map(itemObj => itemObj.item);

// Now, itemList contains the list of items as an array
  console.log(itemList);
  
  const email = emailstor;

  console.log("save items " + email);
  console.log("save items " + itemList);

  if (!email || !itemList) {
    return res.status(400).json({ message: "Email and items are required." });
  }

  // Read the CSV file and update the user's items list

  console.log("Save Items Called ");

  

 
// Read the CSV file and identify rows to delete
let users = [];

  fs.createReadStream("users.csv")
    .pipe(csv({ headers: false }))
    .on("data", (row) => {
      
      if (row[0] === email) {

        let pass = row[1];
       // console.log(row[1]);
       

        // row[2] = JSON.stringify(itemList);  // Update the items list in CSV

        const newUser = { emails : email, password : pass, items : items, tasksDone: [] };
        
        console.log(row[2]);

        users.push(newUser);
      }
      else if(row[0] === "Emails"){
           console.log("users " + users)
            console.log("Neglect ");
      }
      else{
        console.log(row[0]);
        const newUser1 = { emails: row[0], password : row[1], items : row[2], tasksDone: row[3] };
        users.push(newUser1);
      }

      
    })
    .on("end", () => {
      // Write the updated user data to the CSV file
      const users2 = users;
      users = [];
      const csvWriter = createCsvWriter({
        path: "users.csv",
        header: [
          { id: "emails", title: "Emails"},
          { id: "password" , title: "Password"},
          { id: "items", title: "Items"},
          { id: "tasksDone" , title: "TasksDone"},
        ],
        append: false,
      });

      csvWriter.writeRecords(users2)
        .then(() => {
          res.status(200).json({ message: "Items saved successfully" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        });
    });


});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

