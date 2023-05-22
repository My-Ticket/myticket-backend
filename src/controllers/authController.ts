import { Router } from 'express';
const authController = Router();


import User from '../models/User.js';

import token from 'jsonwebtoken';

//Se encarga de verificar si el token es valido, el cual permite el acceso a los demas direccionamientos
authController.post('/register', async ( req, res, next ) => {
    const { username, email, password } = req.body;
    //password = await User.encryptPassword( password );
    const newUser = await User.userCreate(username, email, password); //Respuesta de la base de datos
    const accessToken = token.sign({email}, process.env.SECRET!, {expiresIn: '1440m'}); //Access Tokenw
    res.json({Username: username, Email: email, password: password, Auth: true, AccessToken: accessToken}); //Respuesta del servidor
})


authController.post('/login', async( req, res, next ) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.verifyUser( email, password );
    console.log(user);
    if ( user !== undefined ) {
            res.send('Welcome');
            console.log('Usuario encontrado!');
    }else {
       res.status(404).send( '<img src"https://dinahosting.com/blog/upload/2021/03/error-404.jpg"/>')
    }
    
})


authController.get('/profile', ( req, res, next ) => {
    const tokenheader = req.headers['x-access-token'] as string;
    if (!tokenheader) {
        return res.status(401).json({
            auth:false,
            message: 'No token provided'
        })
    }

    try {
        token.verify(tokenheader, process.env.SECRET!);
        res.json('Dashboard');
        console.log('decoded');
    } catch (error) {
        
    }
})

export default authController;