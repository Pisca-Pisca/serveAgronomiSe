import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

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