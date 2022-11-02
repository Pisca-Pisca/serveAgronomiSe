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
  async createComodante(req: any, res: any) {
    try {
      const body: any = req.body;
      const arquivosMulter: any = req.files;
      let arquivos: any[] = [];

      arquivos.push(arquivosMulter["uploadDocumentoFotoComodante"][0], arquivosMulter["uploadComprovanteEnderecoComodante"][0]);

      await arquivos.forEach(async (arquivo: any) => {
        await uploadArquivosFirebase(arquivo);
      });

      setTimeout(() => {
        addDoc(collection(db, "Comodante"), { 
          ...body,
          uploadDocumentoFotoComandante: arquivosLink[0],
          uploadComprovanteEnderecoComandante: arquivosLink[1]
        }).then(() => {
          return res.status(201).json({
            message: "Comodante cadastrado com sucesso.",
            success: true,
          });
        });
      }, 3000);

    } catch (error) {
      console.log(error);
      return res.status(400).json({
        data: {},
        error: "Ocorreu um erro ao criar o Comodante.",
        success: false,
      });
    }
  },
};

function uploadArquivosFirebase(arq: any){
  const fileName = arq.originalname.split(".")[0];

  //Referenciando pasta de upload
  const storageRef = ref(storage, "Comodantes/");
  const imageRef = ref(storageRef, "DocumentosPessoais/" + fileName);

  const uploadTask = uploadBytesResumable(imageRef, arq.buffer);

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
        arquivosLink.push(downloadURL);
      });
    }
  );
}