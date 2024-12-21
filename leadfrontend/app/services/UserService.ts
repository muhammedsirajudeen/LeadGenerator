import { hashPassword } from "~/lib/bcryptHelper";
import pool from "./Pool";

async function CheckUser({username,password}:{username:string,password:string}){
    try{
        //in here we are going to like select the existing password and set the password that way
        const hashedPassword=await hashPassword(password)
        const result=await pool.query("SELECT * FROM users WHERE username=$1 AND password=$2",[username,hashedPassword])
        console.log(result.rows)
        if(result.rows.length===0){
            return false
        }
        return true

    }catch(error){
        return null
    }
}

async function RegisterUser({username,password}:{username:string,password:string}){
    try {
        const hashedPassword=await hashPassword(password)
        await pool.query("INSERT INTO users (username,password) VALUES ($1,$2)",[username,hashedPassword])
        return true 
    } catch (error) {
        console.error(error)
        return null
    }
}



export default {
    CheckUser,
    RegisterUser
}