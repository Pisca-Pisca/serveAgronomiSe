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

export default {
  async createConteudo(req: any, res: any) {
    try {
      const body: any = req.body;
      const fileName = req.file.originalname.split(".")[0];

      //Referenciando pasta de upload
      const storageRef = ref(storage);
      const imageRef = ref(storageRef, "Conteudos/" + fileName);

      const uploadTask = uploadBytesResumable(imageRef, req.file.buffer);

      // Listen for state changes, errors, and completion of the upload.
      await uploadTask.on("state_changed",
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
            addDoc(collection(db, "Conteudos"), { 
              ...body,
              image: downloadURL
            });
          });
        }
      );

      return res.status(201).json({
        message: "Conteúdo cadastrado com sucesso.",
        success: true,
      });
    } catch (error) {
      return res.status(400).json({
        data: {},
        error: "Ocorreu um erro ao criar o Conteúdo.",
        success: false,
      });
    }
  },

  async findAllConteudos(req: any, res: any) {
    try {
     const conteudosRef = await getDocs(collection(db, "Conteudos"));

     const conteudos = conteudosRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));

      return res.status(200).json(conteudos);
    } catch (error) {
      return res.status(400).json({
        data: [],
        error: "Ocorreu um erro ao buscar os Conteúdos.",
        success: false,
      });
    }
  },
};
