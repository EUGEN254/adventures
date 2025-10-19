import jwt from 'jsonwebtoken'

const userAuth = (req,res,next)=>{
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message:"Unathorised"})}

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decode;
        next()
    } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
        
    }
}
export default userAuth