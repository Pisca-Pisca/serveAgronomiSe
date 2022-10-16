import { Router } from "express";

import conteudoController from "./controllers/conteudoController";
import parceirosController from "./controllers/parceirosController";

const router =  Router();

// CONTEÚDO \\
router.post('/api/conteudo', conteudoController.createConteudo);
router.get('/api/conteudos', conteudoController.findAllConteudo);

// PARCEIROS \\
router.post('/api/parceiro', parceirosController.createParceiro);
router.get('/api/parceiros', parceirosController.findAllParceiro);

// COMODATÁRIO \\

export {router};