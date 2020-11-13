# [ALGO-ASSIGMENT](https://algo-assignment.herokuapp.com/)

---

### Technologies Used:

##### 1. Express-JS

##### 2. Heroku

##### 3. Passport JWT

##### 4. MongoDB

##

##

### Task 1:

    Provide some example of config file separation for dev and prod environments

##

    In config folder, The mongodb url is changing according the dev and prod environments.

```
import dotenv from "dotenv";
dotenv.config();

let mongoURL = "";

if (process.env.NODE_ENV === "development")
  mongoURL = process.env.MONGO_URI_DEV;
else mongoURL = process.env.MONGO_URI_PROD;

export default mongoURL;

```

##

### Task 2:

    Convert any callback into a promise with example code of callback and promise.

```
1. Callback Approach
const printName = (firstName, cb) => {
    setTimeOut(() => {
        if(!firstName) return cb(new Error("name is not given"));
        const fullName = `${firstName} Joe`;
        return cb(fullName);
    }, 1000);
};

printName(null, console.log);
printName("abhishek", console.log);

2. Promise Approach
const printName = firstName => {
    return new Promise((resolve, reject) => {
        setTimeOut(() => {
            if(!firstName) reject(new Error("First Name not given"));
            const fullName = `${firstName} Joe`;
            resolve(fullName);
        }, 1000);
    })
}

printName("Anik").then(console.log).catch(console.log);
```

##

### Task 3A:

    Show Standard techniques of authentication OAuth, JWT with refresh token implementation

##

#### APIs:

1. POST /api/auth/signup
   Exaple: https://algo-assignment.herokuapp.com/api/auth/signup

#

    Request Body:
    {
        email: "some@email.com",
        name: "someName",
        password: somePassword
    }

#

    Response Body:
    {
        data: {
            user: userdata,
        },
        isError: true/false
        msg: "register successfully"
    }

#

    if error (500 error / 400 data validation error)
    {
        data: [],
        isError: true
        msg: "error message"
    }

#

2. POST /api/auth/login
   Exaple: https://algo-assignment.herokuapp.com/api/auth/login

#

    Request Body:
    {
        email: "some@email.com",
        password: somePassword
    }

#

    Response Body:
    {
        data: {
            user: userdata,
            refreshToken: tokendata,
            token: tokenData
        },
        isError: true/false
        msg: "loggin successfully"
    }

#

    if error (500 error/ 404 user not found / 401 unautherized)
    {
        data: [],
        isError: true
        msg: "error message"
    }

#

3. POST /api/auth/regenerate
   Exaple: https://algo-assignment.herokuapp.com/api/auth/regenerate

#

    Request Body:
    {
        refreshToken: tokendata
    }

#

    Response Body:
    {
        data: {
            token: tokenData
        },
        isError: true/false
        msg: "token regenerated successfully"
    }

#

    if error (500 error / 404 token not found)
    {
        data: [],
        isError: true
        msg: "error message"
    }

#

4. GET /api/protected/data
   Exaple: https://algo-assignment.herokuapp.com/api/protected/data
   must have a bearer token in header

#

    Response Body:
    {
        data: [],
        isError: true/false
        msg: "this is protected route"
    }

#

    if error (500 error/ 404 user not found / 401 unautherized)
    {
        data: [],
        isError: true
        msg: "error message"
    }

#

### Task 3D

     Create Excel from Mongo Database Collection

#### APIs:

1. GET /api/public/file
   Exaple: https://algo-assignment.herokuapp.com/api/public/file?pageNumber=1
   pageNumber should be a number. If pageNumber is not given, by default 1 will be consider.

#

    Response Body:
    {
        data: {url: "url of excel file"},
        isError: true/false
        msg: "successfully able to get url of xls"
    }

#

    if error (500 error/ 404 no data found / 500 server facing issue)
    {
        data: [],
        isError: true
        msg: "error message"
    }

#
