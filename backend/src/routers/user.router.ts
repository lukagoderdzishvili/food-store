import { Router } from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asynceHandler from 'express-async-handler';
import { UserModel } from '../models/user.model';

const router = Router();

router.get("/seed", asynceHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0){
            res.send("Seed is already done!");
            return
        }
        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
));

router.post("/login", asynceHandler(
    async (req, res) => {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email, password});
        if(user){
            res.send(generateTokenResponse(user));
        }else{
            const BAD_REQUEST = 400;
            res.status(BAD_REQUEST).send("User name or Password is not valid");
        }
    }
));

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}

export default router;