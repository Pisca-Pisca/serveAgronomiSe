import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const config = {
  apiKey: "AIzaSyDCLijI1z2jQ3INpgliN8aRlmaqQx7xBCw",
  authDomain: "agronomise.firebaseapp.com",
  projectId: "agronomise",
  storageBucket: "agronomise.appspot.com",
  messagingSenderId: "908624917211",
  appId: "1:908624917211:web:eb869a578b8fd214eed2fe",
  measurementId: "G-PRWDSLRX36",
};

const app = initializeApp(config);
const storage = getStorage(app, config.storageBucket);
const db = getFirestore(app);
let arquivosLink: any[] = [];

export default {
  async createTerreno(req: any, res: any) {
    try {
      const body: any = req.body;
      let arquivos: any[] = [];      
      arquivosLink = [];

      arquivos.push(req.files["uploadImagem"][0], req.files["uploadEscritura"][0]);
    
        arquivos.forEach(async arq => {
          await uploadArquivosFirebase(arq).then(
            async resp => {
              if(resp === 2){                
              await addDoc(collection(db, "Terreno"), { 
                ...body,
                uploadImagem: arquivosLink[0],
                uploadEscritura: arquivosLink[1]
              }).then((dado) => {
                return res.status(201).json({
                  data: dado.id,
                  message: "Terreno cadastrado com sucesso.",
                  success: true,
                });
              });
              }
            }
          );
        });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        data: {},
        error: "Ocorreu um erro ao criar o Terreno.",
        success: false,
      });
    }
  },
  async findAllTerrenos(req: any, res: any) {
    try {
     const terrenosRef = await (await getDocs(collection(db, "Terreno")));

     let terrenos = terrenosRef.docs.map((doc: any) => {
      if(doc.data().comodatario === ""){
        return { id: doc.id, ...doc.data() }
      }else{
        return;
      }
     });

      terrenos = terrenos.filter(doc => doc != null);

      return res.status(200).json(terrenos);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        data: [],
        error: "Ocorreu um erro ao buscar os terrenos.",
        success: false,
      });
    }
  },
  async findAllTerrenosByFiltros(req: any, res: any) {
    try {
     const body: any = req.body;
     const terrenosRef = await getDocs(collection(db, "Terreno"));
     let terrenos: any = [];
   
     terrenos = terrenosRef.docs.map((terreno: any) => {
      if(body.cidade === "" && body.estado === ""){
          if(parseInt(terreno.data().metragem) >= body.metragem[0] && terreno.data().metragem <= body.metragem[1]){
            return {id: terreno.id, ...terreno.data() };
          }
        }else if(body.cidade != "" && body.estado != ""){
            if(terreno.data().cidade === body.cidade && terreno.data().estado === body.estado){
              if(parseInt(terreno.data().metragem) >= body.metragem[0] && terreno.data().metragem <= body.metragem[1]){
                return {id: terreno.id, ...terreno.data() };
              }
            }
          }else if(body.cidade != ""  && body.estado === ""){
            if(terreno.data().cidade === body.cidade){
              if(parseInt(terreno.data().metragem) >= body.metragem[0] && terreno.data().metragem <= body.metragem[1]){
                return {id: terreno.id, ...terreno.data() };
              }
            }
          }else if(body.estado != "" && body.cidade === ""){
            if(terreno.data().estado === body.estado){
              if(parseInt(terreno.data().metragem) >= body.metragem[0] && terreno.data().metragem <= body.metragem[1]){
                return {id: terreno.id, ...terreno.data() };
              }
            }
          }
      });

      terrenos = terrenos.filter((doc: any) => doc != null);

      return res.status(200).json(terrenos);
    } catch (error) {
      return res.status(400).json({
        data: [],
        error: "Ocorreu um erro ao filtrar os terrenos.",
        success: false,
      });
    }
  },
};

function uploadArquivosFirebase(arq: any){
    const fileName = arq.originalname.split(".")[0];

    //Referenciando pasta de upload
    const storageRef = ref(storage, "Comodantes/");
    const imageRef = ref(storageRef, "DocumentosTerreno/" + fileName);
  
    const uploadTask = uploadBytesResumable(imageRef, arq.buffer);
  
    return new Promise(function (resolve, reject) {
     // Escutando os estados de mudança, erros e finalização do upload.
     uploadTask.on("state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
          console.log("Erro ao fazer upload do arquivo.", error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(arquivosLink.push(downloadURL));
        })
      }
    );
  });
}