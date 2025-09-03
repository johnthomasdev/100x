import express from "express";
import { createClient } from "redis";

const client = createClient();
const app = express();

app.use(express.json());

app.post("/submit",async (req,res) => {
    const {problemId,userId,code,language} = req.body;
    try{
        await client.lPush("submissions", JSON.stringify({problemId,userId,code,language})); //push to submissions array basically
        res.status(200).send("Submission received");
    }
    catch(err){
        res.status(500).send("Error pushing to redis");
    }
});

async function startServer(){
    try{
        await client.connect(); //connect to redis server then start the server
        console.log("Connected to redis");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }
    catch(err){
        console.error("Could not connect to redis", err);
    }
}

startServer();