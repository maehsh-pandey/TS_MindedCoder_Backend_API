// const express = require('express');
import express, { Application} from 'express';
const app:Application = express();
const PORT = 3000;
// interface ErrorObj {
//     statusCode: number, 
//     message: string
//   }



app.listen(PORT, () => { 
    console.log('Server running at PORT: ', PORT); 
 
}).on('error', (error:Error) => {
    // gracefully handle error
    throw new Error(error.message);
  });