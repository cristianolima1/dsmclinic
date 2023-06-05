import { Request, Response } from "express";
import { userValidation } from "../validation/user.validation";
import bcrypt from "bcrypt";
import {
  createUser,
  deleteUser,
  getAll,
  getById,
  updateUser,
} from "../repositories/user.repository";
import { string } from "zod";

export const create = async (req: Request, res: Response) => {
  try {
    req.body.senha = await bcrypt.hash(req.body.senha, 10);
    const data = await userValidation.parse(req.body);
    const user = await createUser(data);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const master_id = null;
    const skip = Number(req.query?.skip) || 0; // se nao passar será 0
    const take = Number(req.query?.take) || 20; // se nao passar sera de 20 em 20
    const search = req.query?.search ? String(req.query?.search) : null;
    const user = await getAll(master_id, skip, take, search);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
};

export const getId = async (req: Request, res: Response) => {
  try {
    const user = await getById(String(req.params.id));
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(String(req.params.id), req.body);
    return res.status(200).send(user);
  } catch (e) {
    return res.status(400).send(e);
  }
};
export const remove = async (req: Request, res: Response) => {
  //delete palavra reservada, nao pode USAR
  try {
    const user = await deleteUser(req.params.id);
    return res.status(204).send();
  } catch (e) {
    return res.status(400).send(e);
  }
};
