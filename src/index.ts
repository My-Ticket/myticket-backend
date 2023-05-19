import Express from "express";

// TODO: Add the .env file

const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World");
})


// TODO: Add the port number to the .env file
app.listen(3000, () => {
  console.log("Server is running on port 3000");
})