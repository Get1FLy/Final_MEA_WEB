const { connection } = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const generateSecretKey = require("../utils/generateSecretKey");

const secretKey = process.env.DB_SECRET_KEY;
console.log("SecretKey for verifying token:", secretKey);


function authenticateToken(req, res, next) {
  console.log("Verify Header:",req.headers)
  const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
const token=authHeader.replace("Bearer ",'').trim('');
  console.log("Received Token:",token);

  if (!token) {
    console.log("Unauthorized: Token not provided");
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      
      console.log("Secret Key,",secretKey)

      if (err) {
        console.log("Forbidden: Invalid token");
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      } 
      
      else{
        next();
      }
    });
  }
}

module.exports = authenticateToken;
