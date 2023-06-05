import { prisma } from "../services/prisma";
import { Usuario } from "../entities/user.entities";

export const createUser = async (data: Usuario) => {
  //ESSE USER MAIUSCULO VEM DE entities\user.entities.ts
  const usuario = await prisma.usuario.create({
    data,
    select: {
      id: true,
    },
  });

  return usuario;
};
export const getAll = async (
  master_id: number | null,
  skip: number,
  take: number,
  search: string | null
) => {
  if (!search) {
    const [usuarios, total] = await prisma.$transaction([
      prisma.usuario.findMany({
        where: {
          deletado: false,
          master_id,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          senha: false,
          telefone: true,
          perfil: false,
          master_id: true,
        },
        skip, //pular 20 - 40
        take, // quantidade
      }),
      prisma.usuario.count({
        where: {
          master_id,
          deletado: false,
        },
      }),
    ]);
    const totalPage = Math.ceil(total / take);

    return { total, totalPage, usuarios };
  } else {
    const [usuarios, total] = await prisma.$transaction([
      prisma.usuario.findMany({
        where: {
          deletado: false,
          master_id,
          nome: {
            search,
          },
        },
        select: {
          id: true,
          nome: true,
          email: true,
          senha: false,
          telefone: true,
          perfil: false,
          master_id: true,
        },
        skip, //pular 20 - 40
        take, // quantidade
      }),
      prisma.usuario.count({
        where: {
          master_id,
          deletado: false,
        },
      }),
    ]);
    const totalPage = Math.ceil(total / take);
    return { total, totalPage, usuarios };
  }
};
export const getById = async (id: string) => {
  const usuario = await prisma.usuario.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      nome: true,
      email: true,
      senha: false,
      telefone: true,
      perfil: true,
      deletado: true,
      master_id: true,
    },
  });
  return usuario;
};
export const updateUser = async (id: string, data: any) => {
  const usuario = await prisma.usuario.update({
    where: {
      id,
    },
    data,
  });
  return usuario;
};
export const deleteUser = async (id: string) => {
  await prisma.usuario.update({
    where: {
      id,
    },
    data: {
      deletado: true,
    },
  });
  return;
};
