import { Router } from "express";
import parceirosController from "./controllers/parceirosController";
import upload from "./config/uploadArquivos";
import comodatarioController from "./controllers/comodatarioController";
import comodanteController from "./controllers/comodanteController";
import conteudoController from "./controllers/conteudoController";
import terrenoController from "./controllers/terrenoController";
import authController from "./controllers/authController";

const router =  Router();

// PARCEIROS \\
router.post('/api/parceiro', upload.uploadArquivos().single("logoParceiro"), parceirosController.createParceiro);
router.get('/api/parceiros', parceirosController.findAllParceiro);

// CONTEÚDO \\
router.post('/api/conteudo', upload.uploadArquivos().single("image"), conteudoController.createConteudo);
router.get('/api/conteudos', conteudoController.findAllConteudos);

// COMODATÁRIO \\
router.post('/api/comodatario', upload.uploadArquivos().fields(
    [ {name: "uploadDocumentoFoto"}, {name: "uploadComprovanteEndereco"}]), comodatarioController.createComodatario);
router.post('/api/addTerrenoComodatario', comodatarioController.addTerrenoComodatario);

// COMODANTE \\
router.post('/api/comodante',  upload.uploadArquivos().fields(
    [ {name: "uploadDocumentoFoto"}, {name: "uploadComprovanteEndereco"}]), comodanteController.createComodante);
router.post('/api/addTerrenoComodante', comodanteController.addTerrenoComodante);

// TERRENO \\
router.post('/api/terreno',  upload.uploadArquivos().fields(
    [ {name: "uploadImagem"}, {name: "uploadEscritura"}]), terrenoController.createTerreno);
router.get('/api/terreno', terrenoController.findAllTerrenos);
router.post('/api/terrenosByfiltro', terrenoController.findAllTerrenosByFiltros);
router.post('/api/buscarTerrenoComodatario', terrenoController.findTerrenoComodatario);
router.post('/api/buscarTerrenoComodante', terrenoController.findTerrenoComodante);

//AUTH\\
router.post('/api/criarUsuarioLogin', authController.criarUsuarioLogin);
router.post('/api/login', authController.Login);
router.post('/api/resetSenha', authController.resetarSenha);
router.post('/api/verificaTipoUsuario', authController.verificaTipoUsuario);
router.get('/api/logout', authController.logoff);
    
export {router};