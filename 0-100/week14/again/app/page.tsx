import axios from 'axios';
import { PrismaClient } from "@/app/generated/prisma";

interface Userdata{
  email:string;
  name:string;
}

const client = new PrismaClient();

async function fetchdata(){
    const user = await client.user.findFirst()

    const response = await axios.get<Userdata>('http://localhost:3000/api/user/')
    return user
}


//client cant be async but server can be
export default async function User() {
    const data = await fetchdata();
  return (  
    <div>
      From User: 
      {JSON.stringify(data)}
    </div>    
  );
}
