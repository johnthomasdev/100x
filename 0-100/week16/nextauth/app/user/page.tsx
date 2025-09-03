import { getServerSession } from "next-auth";
import { NEXT_AUTH } from '../lib/auth';

// This is the server component

export default async function (){
    const session = await getServerSession(NEXT_AUTH);
    return (
        <>
            <div>
                User Component This is server rendering Component: 
                {JSON.stringify(session)}
            </div>
        </>
    )    
}