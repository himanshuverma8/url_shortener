import jwt from "jsonwebtoken";
import { validateUserToken } from "../utils/token.js";

export const authenticationMiddleware = async function (req,res,next) {
    try {
         // const sessionId = req.headers['session-id'];
       const tokenHeader = req.headers['authorization'];
    
       //Header: authorization: Bearer <TOKEN>
    
     // if(!sessionId) return res.status(401).json({error: "you are not logged in session id doesn't exist"})
      if(!tokenHeader) {
        return next();
      }
      if(!tokenHeader.startsWith('Bearer')){
        return res.status(400).json({error: "authorization header must start with Bearer"})
      }
    
      const token = tokenHeader.split(' ')[1];
    
      const payload = validateUserToken(token);
      //  const [data] = await db
      //     .select({
      //       sessionId: userSessions.id,
      //       userId: userSessions.userId,
      //       name: userTable.name,
      //       email: userTable.email,
      //     })
      //     .from(userSessions)
      //     .rightJoin(userTable, eq(userTable.id, userSessions.userId))
      //     .where(eq(userSessions.id, sessionId));
      
                 
      req.user = payload;
      next();   
      } catch (error) {
        next();
      }
    
}

export const ensureAuthenticated = async (req, res, next) => {
    if(!req.user){
        return res.status(401).json({error: 'You must be authenticated'})
    }

    next();
}
