import Multer from "multer";

export default {
    uploadArquivos(){
       const arquivo =  Multer({
            storage: Multer.memoryStorage(),
            limits: {
              fileSize: 1024 * 1024 * 2, //máximo de 2Mb
            },
        }); 

        return arquivo;
    }
}

