import express from "express";
import db from "../db/index.js"
import { userTable } from "../models/user.models.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";
import { signupPostRequestBodySchema } from "../validation/request.validation.js";
import { error } from "console";

const router = express.Router();

//signup route

router.post('/signup', async (req, res) => {

    console.log(req.body);
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
        req.body
    );

    if(validationResult.error){
        return res.status(400).json({error: validationResult.error.message})
    }
    const {firstname, lastname, email, password} = validationResult.data;

    const [existingUser] = await db.select({
        id: userTable.id
    })
    .from(userTable)
    .where(eq(userTable.email, email));

    if(existingUser){
        return res.status(400).json({error: `user with this email ${email} doesn't exist`})
    }

    const salt = randomBytes(256).toString('hex');

    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    const [user] = await db.insert(userTable).values({
        firstname,
        lastname,
        email,
        salt,
        password: hashedPassword
    }).returning({id: userTable.id})

    return res.status(201).json({data: {userId: user.id}});
})

export default router;