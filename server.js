import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();

app.use(express.json());

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
 ssl: { rejectUnauthorized:false }
});

app.get("/", (req,res)=>{
 res.json({status:"backend running"});
});

app.get("/users", async (req,res)=>{

 try{

  const result = await pool.query(
   "SELECT * FROM users"
  );

  res.json(result.rows);

 }catch(err){

  res.status(500).json({error:err.message});

 }

});

app.post("/users", async (req,res)=>{

 const {email} = req.body;

 try{

  const result = await pool.query(
   "INSERT INTO users(email) VALUES($1) RETURNING *",
   [email]
  );

  res.json(result.rows[0]);

 }catch(err){

  res.status(500).json({error:err.message});

 }

});

app.post("/transactions", async (req,res)=>{

 const {user_id, amount} = req.body;

 try{

  const result = await pool.query(
   "INSERT INTO transactions(user_id,amount) VALUES($1,$2) RETURNING *",
   [user_id,amount]
  );

  res.json(result.rows[0]);

 }catch(err){

  res.status(500).json({error:err.message});

 }

});

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{
 console.log("server running on",PORT);
});
