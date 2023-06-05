import { authValidation, tokenValidation } from "../validation/auth.validation";
import { getUser } from "../repositories/auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const auth = async (req: any, res: any) => {
  try {
    const data = await authValidation.parse(req.body);

    const usuario = await getUser(data.email);
    if (!usuario) throw { message: "Usuario não existe" }; //estourar ERRO -throw

    if (usuario && !usuario.status) throw { message: "Usuario bloqueado" }; //estourar ERRO -throw
    if (usuario && bcrypt.compareSync(data.senha, usuario.senha)) {
      //COMPARACAO
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          master: usuario.master,
          master_id: usuario.master_id,
        },
        String(process.env.TOKEN_KEY),
        {expiresIn: '24h'}
      );
      return res.status(200).send({ token });
    } else {
      return res.status(401).send({ message: "Não autorizado" });
    }
  } catch (e) {
    return res.status(401).send(e);
  }
};
export const validate = async (req: any, res: any) => {
  try {
  const data = await tokenValidation.parse(req.body);
  const decode = await jwt.decode(data.token)
  return res.status(200).send(decode);
  }catch (e) {
    return res.status(400).send(e)
  }
}
