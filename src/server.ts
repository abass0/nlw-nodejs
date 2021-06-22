import express, { request, response } from "express";
const app = express();


// request = input
// response = output

app.post("/post", (request, response) => {
    return response.send("This is a POST method");
});

app.get("/get", (request,response) => {
    return response.send("This is a GET method");
});

//localhost:3000
app.listen(3000, () => console.log("Server is running!"));