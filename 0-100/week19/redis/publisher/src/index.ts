import { createClient } from "redis";

const client = createClient();

async function process(submission:Object){
    console.log("Processing submission:", submission);
    client.publish("submissions_processed", JSON.stringify(submission)); // publish to a channel named submissions_processed
}

async function main(){
    await client.connect();
    console.log("Worker connected to redis");
    while (true){
        const submission = await client.brPop("submissions",0);
        //@ts-ignore
        await process(submission);
    }
}

main();