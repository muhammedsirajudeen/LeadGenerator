import { hashPassword, verifyPassword } from "~/lib/bcryptHelper";
import pool from "./Pool";

export interface User{
    id:number
    username:string
    password:string
}

async function CheckUser({username,password}:{username:string,password:string}){
    try{
        //in here we are going to like select the existing password and set the password that way
        const result=await pool.query("SELECT * FROM users WHERE username=$1",[username])
        console.log(result.rows)
        if(result.rows.length===0){
            return false
        }else{
            //password fetched from the db
            const user=result.rows[0] as User
            const verifiedStatus=await verifyPassword(password,user.password)
            if(verifiedStatus){
                return true
            }else{
                return false
            }

        }

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