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
var cpfExiste: boolean = false;

export default {
  async createComodante(req: any, res: any) {
    try {
      const body: any = req.body;
      let arquivos: any[] = [];      
      arquivosLink = [];

      await usuarioExiste(body.cpfComodante);

      arquivos.push(req.files["uploadDocumentoFotoComodante"][0], req.files["uploadComprovanteEnderecoComodante"][0]);
    
      if(!cpfExiste){
        arquivos.forEach(async arq => {
          await uploadArquivosFirebase(arq).then(
            async resp => {
              if(resp === 2){                
              await addDoc(collection(db, "Comodante"), { 
                ...body,
                uploadDocumentoFotoComandante: arquivosLink[0],
                uploadComprovanteEnderecoComandante: arquivosLink[1]
              }).then(() => {
                return res.status(201).json({
                  message: "Comodante cadastrado com sucesso.",
                  success: true,
                });
              });
              }
            }
          );
        });
    }else{
      return res.status(200).json({
        message: "Comodante já é um usuário do Agronomi-se.",
        success: false,
      });
    }

    } catch (error) {
      console.log(error);
      return res.status(400).json({
        data: {},
        error: "Ocorreu um erro ao criar o Comodante.",
        success: false,
      });
    }
  }
};

async function usuarioExiste(cpfBody: string){
    //Verifica se o usuário existe
    await getDocs(collection(db, "Comodante")).then(
      documentos => {
        documentos.forEach(doc => {
          let cpf = doc.data().cpfComodante;
          
          if(cpf === cpfBody){
            cpfExiste = true;
          }else{
            cpfExiste = false;
          }
        });
      }
    );
}

function uploadArquivosFirebase(arq: any){
    const fileName = arq.originalname.split(".")[0];

    //Referenciando pasta de upload
    const storageRef = ref(storage, "Comodantes/");
    const imageRef = ref(storageRef, "DocumentosPessoais/" + fileName);
  
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