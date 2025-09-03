import { createClient } from "redis";

const client = createClient();

async function main(){
    await client.connect();
    console.log("Worker connected to redis");
    while(true){// if we did rpop there would be a messy polling thing that could happen 
        const submission = await client.brPop("submissions",0); //0 means block indefinitely until something is there
        console.log("Processing submission:", submission);
    }
}

main();