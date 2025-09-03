//This is a server component

// this does not contain "use client"

import axios from 'axios';


async function getDetails(){
  // await new Promise((r) => {setTimeout(r,5000)})
  const response = await axios.get("http://localhost:3000/api/user");
  return response.data;
}

//async component !!
export default async function Home() {
  const userDetails = await getDetails();
  return (
    <>
      <div className = 'flex flex-col justify-center h-screen'>
          <div className = 'flex justify-center '>
              <div className = 'border p-8 rounded'>
                <div>
                  Name: {userDetails.name}
                </div>
                <div>
                  Email: {userDetails.email}
                </div>
              </div>
          </div>
      </div>
    </>
  );
}
