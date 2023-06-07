import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

///https://github.com/cristianolima1/dsmclinic.git//
const port = process.env.PORT || 3001;
app.listen(port, () => {
console.log("servidor rodando na Porta 3000");
});

/*
echo "# dsmclinic" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/cristianolima1/dsmclinic.git
git push -u origin main
//////////
git remote add origin https://github.com/cristianolima1/dsmclinic.git
git branch -M main
git push -u origin main
*/
//aaaaaaa