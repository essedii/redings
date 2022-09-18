<h1>Redings</h1>

<ul>
    <li>create an account</li>
    <li>login your account</li>
    <li>create listings</li>
    <li>modify and delete listings</li>
</ul>

<h2>Server (NodeJS, JWT and Mongoose)</h2>
<ol>
    <li>cd server (to access backend folder)</li>
    <li>npm i  (to install all dependencies)</li>
    <li>Inside the root folder CREATE a '.env' file with a 'TOKEN_SECRET={your-JWT-secret}' and a 'DATABASE_URI={your-mongoose-db-url}'</li>
    <li>Inside 'config/allowedOrigins' set you addresst</li>
    <li>npm start</li>
</ol>

<h2>Client (React, RTK and Bootstrap)</h2>
<ol>
    <li>open another terminal</li>
    <li>cd client (to access frontend folder)</li>
    <li>npm i (to install all dependencies)</li>
    <li>inside app/src/api/apiSlice check baseUrl is the same as your backend</li>
    <li>npm start</li>
</ol>



