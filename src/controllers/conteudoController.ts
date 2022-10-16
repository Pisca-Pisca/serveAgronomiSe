import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query']
});

export default {
    async createConteudo(req: any, res: any){
        try {
            const body: any = req.body;
            
            const conteudo = await prisma.conteudo.create({
                data:{
                    titulo      : body.titulo,
                    descricao   : body.descricao,
                    link        : body.link,
                    imagem      : body.imagem
                }
            });

            return res.status(201).json(conteudo);
        } catch (error) {
            return res.status(400).json({
                data: {},
                error: "Ocorreu um erro ao criar o conteúdo.",
                success: false
            });
        }
    },

    async findAllConteudo(req: any, res: any){
        try {            
            const conteudos = await prisma.conteudo.findMany();

            return res.status(200).json(conteudos);
        } catch (error) {
            return res.status(400).json({
                data: [],
                error: "Ocorreu um erro ao buscar os conteúdos.",
                success: false
            });
        }
    }
}
