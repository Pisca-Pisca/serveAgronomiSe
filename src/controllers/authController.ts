import { getFirestore } from 'firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { visitFunctionBody } from 'typescript';

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
const auth = getAuth(app);
const storage = getStorage(app, config.storageBucket);
const db = getFirestore(app);

export default {
  async criarUsuarioLogin(req: any, res: any) {
    try {
      const body: any = req.body;
    
      await createUserWithEmailAndPassword(auth, body.email, body.senha)
        .then(async (userCredential) => {
            const user: any = userCredential.user;

            await sendEmailVerification(user);

            return res.status(201).json({
                data: user.stsTokenManager.refreshToken,
                message: "Login criado com sucesso.",
                success: true,
            });
        })
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: "Ocorreu um erro ao criar o login do Comodante.",
        success: false,
      });
    }
  },
  async Login(req: any, res: any) {
    try {
      const body: any = req.body;
    
      await signInWithEmailAndPassword(auth, body.email, body.senha)
        .then((userCredential) => {
            const user: any = userCredential.user;

            return res.status(200).json({
                data: user.stsTokenManager.refreshToken,
                message: "Usuário logado com sucesso!",
                success: true,
            });
        })

    } catch (error: any) {
      return res.status(400).json({
        error: messageError(error.code),
        success: false,
      });
    }
  },
  async logoff(req: any, res: any) {
    try {    
      await signOut(auth)
      .then(() => {
            return res.status(200).json({
                message: "Usuário deslogado com sucesso!",
                success: true,
            });
        })

    } catch (error: any) {
      return res.status(400).json({
        error: messageError(error.code),
        success: false,
      });
    }
  },
  async resetarSenha(req: any, res: any) {
    try {
      const body: any = req.body;
      
      await sendPasswordResetEmail(auth, body.email)
      .then(() => {
            return res.status(200).json({
              message: "E-mail de reset da senha enviado com sucesso!",
              success: true,
            });
          })

    } catch (error: any) {
      return res.status(400).json({
        error: "Ocorreu um erro ao enviar o e-mail.",
        success: false,
      });
    }
  },
  async verificaTipoUsuario(req: any, res: any) {
    try {
      const body: any = req.body;
      let usuario = {};

      const comodanteRef = await getDocs(collection(db, "Comodante"));
      const comodatarioRef = await getDocs(collection(db, "Comodatario"));
 
      comodanteRef.docs.map((doc: any) => {
        if(doc.data().email === body.email){
          return usuario = { id: doc.id, tipoUsuario: "Comodante", nomeCompleto: doc.data().primeiroNome + " " + doc.data().sobrenome };
        }
      }
     );

     comodatarioRef.docs.map((doc: any) =>{
        if(doc.data().email === body.email){
          return usuario = { id: doc.id, tipoUsuario: "Comodatario", nomeCompleto: doc.data().primeiroNome + " " + doc.data().sobrenome };
        }
      }
     );
 
       return res.status(200).json({
        data: usuario,
        message: "Tipo de usuário encontrado com sucesso.",
        success: true,
      });
     } catch (error) {
      console.log(error);
       return res.status(400).json({
         data: {},
         error: "Ocorreu um erro ao identificar tipo de usuário.",
         success: false,
       });
     }
  }
}

function messageError(error: any){
    switch (error) {
        case "auth/wrong-password":
            return "Senha digitada é incorreta.";

        case "auth/invalid-email":
            return "E-mail digitado é inválido.";
    
        case "auth/user-not-found":
            return "Usuário digitado não existe.";

        case "auth/email-already-in-use":
            return "E-mail digitado já existe.";
        default:
            break;
    }
}