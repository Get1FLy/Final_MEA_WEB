require("dotenv").config();
const asyncHand = require("express-async-handler");
const bcrypt = require('bcrypt');
const { connection } = require("../config/dbConfig");
const { raw } = require("mysql");

const fs = require('fs');


const add_members = asyncHand((req, res) => {
  console.log("Members ka data : ", req.body);
  console.log("File Data : ", req.file.path);
  console.log(req.body.name, req.body.position, req.body.bloodGroup);

  try {
    if (req.file) {
      const img_path = req.file.path;
      const productDetails = [
        [img_path, req.body.name, req.body.position, req.body.bloodGroup]
      ];

      console.log(productDetails);

      const qry =
        'INSERT INTO members (img, name, post, blood_grp) VALUES ?';
      connection.query(qry, [productDetails], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error adding to database" });
        }
        if (result.affectedRows > 0) {
          res.status(200).send({ msg: "Successfully added to database ..." });
          console.log(result);
        }
        else
          res.status(200).send({ msg: "Not added image" });
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing file" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

const edit_hero_img = asyncHand((req, res) => {
  const id=req.params.id;
  console.log("Edit Daata : ", req.params.id);
  console.log("File Data : ", req.file.path);
  
  try {
    if (req.file) {
      const img_path = req.file.path;


      const qry =
        'UPDATE hero_section_img SET img=? WHERE id=?';
      connection.query(qry, [img_path,id], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error adding to database" });
        }
        if (result.affectedRows > 0) {
          res.status(200).send({ msg: "Successfully added to database ..." });
          console.log(result);
        }
        else
          res.status(200).send({ msg: "Not added image" });
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing file" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

const add_hero_img = asyncHand((req, res) => {
  console.log("IMG ka data : ", req.body);
  console.log("File Data : ", req.file.path);


  try {
    if (req.file) {
      const img_path = req.file.path;


      const qry =
        'INSERT INTO hero_section_img(img) VALUES(?)';
      connection.query(qry, [img_path], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error adding to database" });
        }
        if (result.affectedRows > 0) {
          res.status(200).send({ msg: "Successfully added to database ..." });
          console.log(result);
        }
        else
          res.status(200).send({ msg: "Not added image" });
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing file" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});



const update_messages = asyncHand((req, res) => {
  console.log(req.params);
  console.log("Message data : ", req.body);

  try {
    const user_id = req.params.user_id;
    const text = req.body.text;

    const qry =
      'INSERT INTO queries (user_id, text, ask_date) VALUES (?, ?, CURDATE())';
    connection.query(qry, [user_id, text], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error adding to database" });
      }
      if (result.affectedRows > 0) {
        res.status(200).send({ msg: "Thank you for asking Query.!!" });
        console.log(result);
      } else {
        res.status(200).send({ msg: "Not added image" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});



const add_circular = asyncHand((req, res) => {
  console.log("Members ka data : ", req.body);
  let title = req.params.value;
  let document = 0;

  if (title === "Circular") {
    document = 1;
  } else if (title === "Event") {
    document = 2;
  } else if (title === "News") {
    document = 3;
  }

  console.log("File Data : ", req.file.path);
  console.log(document, req.body.name, req.file.path);

  try {
    if (req.file) {
      const img_path = req.file.path;
      const productDetails = [
        document,
        img_path,
        req.body.name
      ];

      console.log("Details here: ", productDetails);

      let qry = '';
      switch (document) {
        case 1:
          qry =
            'INSERT INTO circular_data (id,file, name, upload_date) VALUES (?, ?,?, CURDATE())';
          break;
        case 2:
          qry =
            'INSERT INTO event_data (id,file, name, upload_date) VALUES (?, ?,?, CURDATE())';
          break;
        case 3:
          qry =
            'INSERT INTO news_data (id,file, name, upload_date) VALUES (?, ?,?, CURDATE())';
          break;
        default:
          return res.status(400).send({ msg: "Invalid document type" });
      }

      connection.query(qry, productDetails, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error adding to database" });
        }
        if (result.affectedRows > 0) {
          res.status(200).send({ msg: "Successfully Uploaded" });
          console.log(result);
        } else {
          res.status(200).send({ msg: "Not added image" });
        }
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing file" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});


const update_userdetails = asyncHand((req, res) => {

  console.log("Img file: ",req.file.path)
  const { name,mid_name,last_name, year_of_joining, address, blood_grp, email, dept_id, position, password } = req.body;

  const img_path = req.file.path;

  const user_id = req.params.user_id;

  console.log("User Data:", req.body);
  console.log("img_path:", img_path);
  console.log("user_id:", user_id);

  // Trim blood_grp
 

  // Check if any field is empty
  if (!img_path || !name || !mid_name|| !last_name ||!year_of_joining || !address || !blood_grp || !email || !dept_id || !position || !password) {
    return res.status(400).send({ error: "All fields are required." });
  }

  const trimmedBloodGrp = blood_grp.trim(' ');
  // Hash the new password
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const updateQuery = `
      UPDATE user_details SET img=?, first_name=?, mid_name=?,last_name=?, year_of_joining=?, address=?, blood_grp=?, email=?, dept=?, position=? WHERE user_id=?;
    `;

    const updatePasswordQuery = `
      UPDATE users SET password=? WHERE user_id=?;
    `;

    try {
      // Execute the query to update user details
      await connection.query(updateQuery, [img_path, name,mid_name,last_name, year_of_joining, address, trimmedBloodGrp, email, dept_id, position, user_id]);
      console.log("User details updated successfully");

      // Execute the query to update the password
      await connection.query(updatePasswordQuery, [hashedPassword, user_id]);
      console.log("Password updated successfully");
      res.status(200).send({ success: true, message: 'Registration successful.' });

    } catch (error) {
      console.error("Error updating user details or password", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

const change_pass = asyncHand(async (req, res) => {
  const password = req.body.password;
  const user_id = req.params.id;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatePasswordQuery = `
      UPDATE users SET password=? WHERE user_id=?;
    `;
    
    await connection.query(updatePasswordQuery, [hashedPassword, user_id]);
    console.log("Password updated successfully");
    res.status(200).send({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error("Error updating password", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const  update_replies = asyncHand(async (req, res) => {

  console.log("Message data : ", req.body);

  try {
    const admin_id = req.body.admin_id;
    const text = req.body.text;
    const msg_id=req.body.msg_id;

    const qry =
      'UPDATE replies SET reply=? WHERE msg_id=?;';

    connection.query(qry, [text,msg_id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error adding to database" });
      }
      if (result.affectedRows > 0) {
        res.status(200).send({ msg: "Replied Successfully" });
        console.log(result);
      } else {
        res.status(200).send({ msg: "Not added image" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});


const update_profile_img= asyncHand((req, res) => {
  
    const user_id = req.params.id;
  
    console.log("Img Data:", req.file.path);

    const img=req.file.path;
   
    console.log("user_id:", user_id);


    try {
    
    
        const qry =
          'UPDATE user_details SET img = ? WHERE user_id = ?';
        connection.query(qry, [img, user_id], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ msg: "Error adding to database" });
          }
          if (result.affectedRows > 0) {
            res.status(200).send({ msg: "Successfully added to database ..." });
            console.log(result);
          } else {
            res.status(200).send({ msg: "Not added image" });
          }
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal server error" });
      }
     
    
  
  });





const add_employee = asyncHand(async (req, res) => {
  console.log("EMP DATA:", req.body);
  try {
    const userData = req.body;
    const user_id = userData.name;
    const plainPassword = userData.password; // Plain text password from the request
    console.log("Data : ", req.body);

    const qry = 'SELECT * FROM users WHERE user_id=?';
    connection.query(qry, [user_id], async (err, result1) => {
      if (err) {
        console.log("Registration error:" + err);
        return;
      }
      if (result1.length) {
        // If user_id already exists, send response indicating already registered
        res.status(200).send({ success: false, message: 'Employee ID already used.' });
      } else {
        const saltRounds = 10; // You can adjust the number of salt rounds based on your requirements
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); // Hash the plain password
        const userDetails = [
          [userData.name.trim(), hashedPassword] // Insert hashed password into database
        ];
        const qry1 = 'INSERT INTO users(user_id, password) VALUES ?';
        connection.query(qry1, [userDetails], async (err2, result2) => {
          if (err2) {
            console.log("Insert error 2:" + err2);
            return;
          }
          if (result2) {
            // Execute additional query after the initial insertion
            const query3 = 'INSERT INTO user_details (user_id) VALUES (?)';
            connection.query(query3, [user_id], (err3, result3) => {
              if (err3) {
                console.log("Error inserting into another_table:", err3);
                return;
              }
              res.status(200).send({ success: true, message: 'Registration successful.' });
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

const reply_message = asyncHand(async (req, res) => {
  console.log("EMP DATA:", req.body);

  // Check if any required field is empty
  if (!req.body.user_id || !req.body.msg_id || !req.body.text) {
    return res.status(400).send({ msg: "All fields are required." });
  }

  try {
    const admin_id = req.body.user_id;
    const msg_id = req.body.msg_id;
    const text = req.body.text;

    console.log("Data : ", req.body);

    const qry = 'INSERT INTO replies (admin_id,msg_id,reply,replied_date) VALUES (?, ?,?, CURDATE())';
    connection.query(qry,[admin_id,msg_id,text], async (err, result1) => {
      if (err) {
        console.log("Registration error:" + err);
        return res.status(500).send({ msg: "Error processing the reply." });
      }

      if (result1.affectedRows > 0) {
        console.log(result1);
        const qry1 = 'UPDATE queries set status=1 where msg_id= ?';
        connection.query(qry1, [msg_id], async (err2, result2) => {
          if (err2) {
            console.log("Update error:" + err2);
            return res.status(500).send({ msg: "Error updating query status." });
          }
          return res.status(200).send({ msg: "Replied successfully." });
        });
      } else {
        return res.status(200).send({ msg: "Failed to reply." });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server error." });
  }
});

const add_admin = asyncHand(async (req, res) => {
  console.log("EMP DATA:", req.body);
  try {
    const userData = req.body;
    const user_id = userData.name;
    const plainPassword = userData.password; // Plain text password from the request
    console.log("Data : ", req.body);

    const qry = 'SELECT * FROM users WHERE user_id=?';
    connection.query(qry, [user_id], async (err, result1) => {
      if (err) {
        console.log("Registration error:" + err);
        return;
      }
      if (result1.length) {
        // If user_id already exists, send response indicating already registered
        res.status(200).send({ success: false, message: 'Employee ID already used.' });
      } else {
        const saltRounds = 10; // You can adjust the number of salt rounds based on your requirements
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds); // Hash the plain password
        const userDetails = [
          [userData.name.trim(), hashedPassword] // Insert hashed password into database
        ];
        const qry1 = 'INSERT INTO admin_users(user_id, password) VALUES ?';
        connection.query(qry1, [userDetails], async (err2, result2) => {
          if (err2) {
            console.log("Insert error 2:" + err2);
            return;
          }
          if (result2) {
            // Execute additional query after the initial insertion
            const query3 = 'INSERT INTO user_details (user_id) VALUES (?)';
            connection.query(query3, [user_id], (err3, result3) => {
              if (err3) {
                console.log("Error inserting into another_table:", err3);
                return;
              }
              res.status(200).send({ success: true, message: 'Registration successful.' });
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});



const remove_circular = asyncHand((req, res) => {
  console.log("Members ka data : ", req.params);
  console.log(req.params.id, req.params.type);

  try {
    if (req.params) {
      const id = req.params.id;
      const type = req.params.type;

      const productDetails = [id];

      console.log(productDetails);

      const qry =
        'SELECT file FROM circular_data WHERE circular_id = ?';
      connection.query(qry, [id], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error retrieving file from database" });
        }
        if (result.length > 0) {
          const filePath = result[0].file;
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.log(unlinkErr);
              return res.status(500).send({ msg: "Error deleting file" });
            }
            const deleteQry =
              'DELETE FROM circular_data WHERE id = ?';
            connection.query(deleteQry, [id], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.log(deleteErr);
                return res.status(500).send({ msg: "Error deleting data from database" });
              }
              if (deleteResult.affectedRows > 0) {
                res.status(200).send({ msg: "Successfully deleted data and file" });
                console.log(deleteResult);
              } else {
                res.status(200).send({ msg: "Data not found" });
              }
            });
          });
        } else {
          res.status(200).send({ msg: "Data not found" });
        }
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing parameters" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

const remove_event = asyncHand((req, res) => {
  console.log("Members ka data : ", req.params);
  console.log(req.params.id, req.params.type);

  try {
    if (req.params) {
      const id = req.params.id;
      const type = req.params.type;

      const productDetails = [id];

      console.log(productDetails);

      const qry =
        'SELECT file FROM event_data WHERE event_id = ?';
      connection.query(qry, [id], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error retrieving file from database" });
        }
        if (result.length > 0) {
          const filePath = result[0].file;
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.log(unlinkErr);
              return res.status(500).send({ msg: "Error deleting file" });
            }
            const deleteQry =
              'DELETE FROM event_data WHERE event_id = ?';
            connection.query(deleteQry, [id], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.log(deleteErr);
                return res.status(500).send({ msg: "Error deleting data from database" });
              }
              if (deleteResult.affectedRows > 0) {
                res.status(200).send({ msg: "Successfully deleted data and file" });
                console.log(deleteResult);
              } else {
                res.status(200).send({ msg: "Data not found" });
              }
            });
          });
        } else {
          res.status(200).send({ msg: "Data not found" });
        }
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing parameters" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

const remove_news = asyncHand((req, res) => {
  console.log("Members ka data : ", req.params);
  console.log(req.params.id, req.params.type);

  try {
    if (req.params) {
      const id = req.params.id;
      const type = req.params.type;

      const productDetails = [id];

      console.log(productDetails);

      const qry =
        'SELECT file FROM news_data WHERE news_id = ?';
      connection.query(qry, [id], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ msg: "Error retrieving file from database" });
        }
        if (result.length > 0) {
          const filePath = result[0].file;
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.log(unlinkErr);
              return res.status(500).send({ msg: "Error deleting file" });
            }
            const deleteQry =
              'DELETE FROM news_data WHERE news_id = ?';
            connection.query(deleteQry, [id], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.log(deleteErr);
                return res.status(500).send({ msg: "Error deleting data from database" });
              }
              if (deleteResult.affectedRows > 0) {
                res.status(200).send({ msg: "Successfully deleted data and file" });
                console.log(deleteResult);
              } else {
                res.status(200).send({ msg: "Data not found" });
              }
            });
          });
        } else {
          res.status(200).send({ msg: "Data not found" });
        }
      });
    } else {
      console.log("something error");
      res.status(400).send({ msg: "Missing parameters" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error" });
  }
});



const get_members = asyncHand((req, res) => {

  const query = "SELECT * FROM user_details;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Members Data:", results);
      res.status(200).json(results);
    }
  });
});

const get_herosection= asyncHand((req, res) => {

  const query = "SELECT * FROM hero_section_img;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // console.log("Members Data:", results);
      res.status(200).json(results);
    }
  });
});


const update_personal_details = asyncHand((req,res)=>{
    
    const id=req.params.id;
  

    try {
        const id = req.params.id;
        const {first_name,blood_grp,address,year_of_joining,email,phonenumber} = req.body;
        console.log("User ID: ",id)

        console.log("Data for Update: ",req.body)
        console.log("Personal Details Data : ", req.body)

        const qry = 'SELECT * FROM user_details WHERE user_id=?';
        connection.query(qry, [id], async (err, result) => {
            if (err) {
                console.log("Update Error:" + err);
                return res.status(500).send("Error fetching old address data");
            }

            if (result.length === 0) {
                return res.status(404).send("User not found");
            }

            const oldAddress = result[0];
            let updatedFields = {};

            // Compare and update each field only if it has changed
            if (first_name && first_name !== oldAddress.first_name) {
                updatedFields.first_name = first_name;
            }
            if (address && address !== oldAddress.address) {
                updatedFields.address = address;
            }
            if (email && email !== oldAddress.email) {
                updatedFields.email = email;
            }
            if (blood_grp && blood_grp !== oldAddress.blood_grp) {
                updatedFields.blood_grp = blood_grp;
            }
            if (year_of_joining && year_of_joining !== oldAddress.year_of_joining) {
                updatedFields.year_of_joining = year_of_joining;
            }
            if (phonenumber && phonenumber !== oldAddress.phonenumber) {
                updatedFields.phonenumber = phonenumber;
            }


            // Update the database with the changed fields
            if (Object.keys(updatedFields).length > 0) {
                const updateQry = 'UPDATE user_details SET ? WHERE user_id=?';
                connection.query(updateQry, [updatedFields, id], (updateErr, updateResult) => {
                    if (updateErr) {
                        console.log("Update Error:" + updateErr);
                        return res.status(500).send("Error updating address");
                    }

                    return res.status(200).send("Address updated successfully");
                });
            } else {
                return res.status(200).send("No changes detected");
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

const get_profile = asyncHand((req, res) => {

  const user_id=req.params.user_id;


  const query = "SELECT * FROM user_details where user_id=?;";

  connection.query(query, user_id,(error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Members Data:", results);
      res.status(200).json(results);
    }
  });
});

const get_messages = asyncHand((req, res) => {


  const user_id = req.params.user_id;

  const query = "select a.*,b.*,c.first_name from queries as a LEFT JOIN replies as b ON a.msg_id=b.msg_id JOIN user_details as c ON a.user_id=c.user_id where a.user_id=?;";

  connection.query(query, user_id, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Members Data:", results);
      res.status(200).json(results);
    }
  });
});

const get_user_details_id = asyncHand((req, res) => {


  const user_id = req.params.id;
  console.log("user id is here : ",user_id)
  const query = "Select * from user_details where user_id=?;";

  connection.query(query, user_id, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("User ka Data:", results);
      res.status(200).json(results);
    }
  });
});

const get_messages_admin = asyncHand((req, res) => {

  const query = "SELECT * FROM queries where status=0;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Members Data:", results);
      res.status(200).json(results);
    }
  });
});

const get_replied_msg = asyncHand((req, res) => {

const user_id=req.params.user_id;

  const query = "SELECT * FROM queries as a JOIN replies as b ON a.msg_id=b.msg_id where b.admin_id=?;";

  connection.query(query,user_id, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Members Data:", results);
      res.status(200).json(results);
    }
  });
});

const get_admin_replied_msg = asyncHand((req, res) => {

  
    const query = "SELECT * FROM queries as a JOIN replies as b ON a.msg_id=b.msg_id LEFT JOIN user_details as c ON b.admin_id=c.user_id ORDER BY a.msg_id DESC;";
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching semester data:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        console.log("Members Data:", results);
        res.status(200).json(results);
      }
    });
  });

const get_department = asyncHand((req, res) => {

  const query = "SELECT * FROM department;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Departments:", results);
      res.status(200).json(results);
    }
  });
});

const get_circular_data = asyncHand((req, res) => {

  const query = "SELECT * FROM circular_data order by circular_id desc;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Departments:", results);
      res.status(200).json(results);
    }
  });
});

const get_events_data = asyncHand((req, res) => {

  const query = "SELECT * FROM event_data order by event_id desc;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Departments:", results);
      res.status(200).json(results);
    }
  });
});

const get_news_data = asyncHand((req, res) => {

  const query = "SELECT * FROM news_data order by news_id desc;";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching semester data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Departments:", results);
      res.status(200).json(results);
    }
  });
});
















module.exports = {
  get_members,
  get_replied_msg,
  add_members,
  add_employee,
  update_userdetails,
  get_department,
  add_circular,
  get_circular_data,
  get_events_data,
  get_news_data,
  remove_circular,
  remove_event,
  remove_news,
  add_admin,
  update_messages,
  get_messages,
  get_messages_admin,
  reply_message,
  get_profile,
  get_user_details_id,
  update_personal_details,
  update_profile_img,
  change_pass,
  update_replies,
  get_admin_replied_msg,
  edit_hero_img,
  add_hero_img,
  get_herosection
};
