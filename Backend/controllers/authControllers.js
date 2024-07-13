require("dotenv").config();
const asyncHand = require("express-async-handler");
const { connection } = require("../config/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateSecretKey = require("../utils/generateSecretKey");

const secretKey = process.env.DB_SECRET_KEY;
console.log("SecretKey for signing token:", secretKey);

// Login Form




const login = asyncHand((req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const searchQuery = "SELECT * FROM users WHERE user_id = ?";
  const additionalQuery = "SELECT * FROM user_details WHERE user_id = ? AND (first_name IS NULL  OR year_of_joining IS NULL OR email IS NULL OR address IS NULL OR dept IS NULL OR position IS NULL OR blood_grp IS NULL OR img IS NULL);";
  
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials", reason: "username or password incorrect" });
      } else {
        const user = results[0];
        console.log("user data : ", user);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid credentials", reason: "username or password incorrect" });
        }

        // Execute additional query
        connection.query(additionalQuery, [user.user_id], async (err, additionalResult) => {
          if (err) {
            console.error("Error running the additional query : ", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          console.log("Status : ", additionalResult)
          let additionalVariable = additionalResult.length > 0 ? 0 : 1;

          const tokenPayload = {
            uid: user.user_id,
            status: additionalVariable,
            user_type: user.user_type // Add user_type to token payload
          };

          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

          res.status(200).json({
            message: "Logged in successfully",
            token: token,
            uid: user.user_id,
            status: additionalVariable,
            user_type: user.user_type
          });
        });
      }
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const super_login = asyncHand((req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const searchQuery = "SELECT * FROM super_admin_users WHERE user_id = ?";
  const additionalQuery = "SELECT * FROM user_details WHERE user_id = ? AND (first_name IS NULL OR year_of_joining IS NULL OR email IS NULL OR address IS NULL OR dept IS NULL OR position IS NULL OR blood_grp IS NULL OR img IS NULL);";
  
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        console.log("user data : ", user);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Execute additional query
        connection.query(additionalQuery, [user.user_id], async (err, additionalResult) => {
          if (err) {
            console.error("Error running the additional query : ", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          console.log("Status : ", additionalResult)
          let additionalVariable = additionalResult.length > 0 ? 0 : 1;

          const tokenPayload = {
            uid: user.user_id,
            status: additionalVariable,
            user_type: user.user_type // Add user_type to token payload
          };

          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

          res.status(200).json({
            message: "Logged in successfully",
            token: token,
            uid: user.user_id,
            status: additionalVariable,
            user_type: user.user_type // Include user_type in the response
          });
        });
      }
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const admin_login = asyncHand((req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const searchQuery = "SELECT * FROM admin_users WHERE user_id = ?";
  const additionalQuery = "SELECT * FROM user_details WHERE user_id = ? AND (first_name IS NULL OR year_of_joining IS NULL OR email IS NULL OR address IS NULL OR dept IS NULL OR position IS NULL OR blood_grp IS NULL OR img IS NULL);";
  
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        console.log("user data : ", user);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }

        // Execute additional query
        connection.query(additionalQuery, [user.user_id], async (err, additionalResult) => {
          if (err) {
            console.error("Error running the additional query : ", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          console.log("Status : ", additionalResult)
          let additionalVariable = additionalResult.length > 0 ? 0 : 1;

          const tokenPayload = {
            uid: user.user_id,
            status: additionalVariable,
            user_type: user.user_type // Add user_type to token payload
          };

          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

          res.status(200).json({
            message: "Logged in successfully",
            token: token,
            uid: user.user_id,
            status: additionalVariable,
            user_type: user.user_type // Include user_type in the response
          });
        });
      }
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const hod_login = asyncHand((req, res) => {
  const { email, password,role} = req.body;
  console.log("HOD : ",req.body);
  const searchQuery = "SELECT * from hod_data where email = ?";
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }

        const uid = user.uid;
        const email = user.email;
        const role=req.body.role;

        const token = jwt.sign(
          {
            email: email,
            role:role
          },
          secretKey,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Logged in successfully",
          token: token,
          email: email,
          uid: uid,
          role:role
        });
      }
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const faculty_login = asyncHand((req, res) => {
  const { email, password,role} = req.body;
  console.log("Faculty : ",req.body);
  const searchQuery = " select a.uid,a.email,a.password from users as a JOIN faculty as b ON a.uid=b.uid WHERE a.email=?;";
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }

        const uid = user.uid;
        const email = user.email;
        const role=req.body.role;
        

        const token = jwt.sign(
          {
            email: email,
            role:role,
            uid:uid,
          },
          secretKey,
          { expiresIn: "1d" }
        );
        res.status(200).json({
          message: "Logged in successfully",
          token: token,
          email: email,
          uid: uid,
          role:role,
        });
      }
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const examiner_login = asyncHand((req, res) => {
  const { email, password,role} = req.body;
  console.log("Exam Section : ",req.body);
  const searchQuery = "SELECT * from exam_section_user where email = ?";
  try {
    connection.query(searchQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error running the query : ", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      } else {
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid Credentials" });
        }

        const uid = user.uid;
        const email = user.email;
        const role=req.body.role;

        const token = jwt.sign(
          {
            email: email,
            role:role
          },
          secretKey,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Logged in successfully",
          token: token,
          email: email,
          uid: uid,
          role:role
        });
      }
    });
  } catch (error) {
    console.error("Error running the query : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const handleUserExists = (res) => {
  return res.status(400).json({ error: "User already exists" });
};

const handleServerError = (res, errMessage) => {
  console.error(errMessage);
  return res.status(500).json({ error: "Internal Server Error" });
};

const handleSuccess = (res, message) => {
  console.log(message);
  return res.status(200).json({ message });
};

const signUp = asyncHand(async (req, res) => {
  const formData = req.body;

  console.log("Form Data:", formData);

  try {
    const searchQuery = "SELECT * FROM faculty_users WHERE email = ?";

    connection.query(searchQuery, [formData.email], async (err, result) => {
      if (err) {
        return handleServerError(res, "Error running the query: " + err);
      }

      if (result.length > 0) {
        return handleUserExists(res);
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      const insertQuery = "INSERT INTO faculty_users (email, password) VALUES (?,?)";
      connection.query(
        insertQuery,
        [formData.email, hashedPassword],
        (err, result) => {
          if (err) {
            return handleServerError(res, "Error inserting data: " + err);
          } else {
            return handleSuccess(res, "User Registered Successfully");
          }
        }
      );
    });
  } catch (error) {
    return handleServerError(res, "Error inserting data: " + error);
  }
});

module.exports = {
  login,
  signUp,
  hod_login,
  faculty_login,
  examiner_login,
  admin_login,
  super_login
};
