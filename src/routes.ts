import { Router } from "express";
import parceirosController from "./controllers/parceirosController";
import upload from "./config/uploadArquivos";
import comodatarioController from "./controllers/comodatarioController";
import comodanteController from "./controllers/comodanteController";

const router =  Router();

// PARCEIROS \\
router.post('/api/parceiro', upload.uploadArquivos().single("logoParceiro"), parceirosController.createParceiro);
router.get('/api/parceiros', parceirosController.findAllParceiro);

// COMODATÁRIO \\
router.post('/api/comodatario', upload.uploadArquivos().fields(
    [ {name: "uploadDocumentoFotoComodatario"}, {name: "uploadComprovanteEnderecoComodatario"}]), comodatarioController.createComodatario);

// COMODANTE \\
router.post('/api/comodante', upload.uploadArquivos().fields(
    [ {name: "uploadDocumentoFotoComodante"}, {name: "uploadComprovanteEnderecoComodante"}]), comodanteController.createComodante);


export {router};