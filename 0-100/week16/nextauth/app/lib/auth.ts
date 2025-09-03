
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";


export const NEXT_AUTH = { 
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: {label: 'Enter your Email:', type: 'text', placeholder: 'Email'},
                password: {label: 'Enter your Password:', type: 'password', placeholder: 'Password'}
            },
            async authorize(credentials:any){
                return {
                    id: "user1",
                    name: "bing",
                    email: "yes"
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET, //basically the jwt.sign which encrypts the token
    callbacks: {
        signIn: ({user}:any) => { //what should we do when .signin occurs
            if (user.email == "random@gmail.com"){
                return false;
            }
            return true;
        },

        jwt: ({token,user}:any) => {
            token.test = "bingbingbing" //add new fields to the jwt token
            console.log(token);
            return token;
        },
        session: ({session,token,user}:any) => { //this is a jwt exposed to client side we take some components of 
            console.log("before editing",session);
            if (session && session.user){       // jwt and then show it to client
                session.user.id = token.sub;
                session.user.test = token.test;
            }
            console.log("after editing",session);
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        signOut: "/"
    }
}