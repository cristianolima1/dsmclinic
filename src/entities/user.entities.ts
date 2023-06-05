export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  telefone?: string | null;
  master_id?: number | null;
  master?: boolean; // boleano nap pode ser nulo
};
