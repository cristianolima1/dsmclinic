import Jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw { message: "Necessário passar o token" };

    const replace = token.replace("Bearer ", ""); //ATENCAO AO ESPAÇO DEPOIS DE BEARER
    const decoded = Jwt.verify(replace, String(process.env.TOKEN_KEY));
    req.usuario = decoded;
    next();
  } catch (e) {
    return res.status(401).send(e);
  }
};
