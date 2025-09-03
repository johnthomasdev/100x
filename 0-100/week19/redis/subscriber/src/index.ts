import { createClient } from "redis";

const client = createClient();

async function main(){
    await client.connect();
    console.log("Worker connected to redis");
    console.log("Subscribed to submissions_processed channel");
    await client.subscribe("submissions_processed", (message) => {
        console.log("Received processed submission:", message);
    });
}
main();