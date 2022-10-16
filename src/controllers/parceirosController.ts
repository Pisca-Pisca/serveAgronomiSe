import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ['query']
});

export default {
    async createParceiro(req: any, res: any){
        try {
            const body: any = req.body;
            
            const parceiro = await prisma.parceiro.create({
                data: {
                    linkRedirecionamento   : body.linkRedirecionamento,
                    logoParceiro           : body.logoParceiro
                }
            });

            return res.status(201).json(parceiro);
        } catch (error) {
            return res.status(400).json({
                data: {},
                error: "Ocorreu um erro ao criar o conteúdo.",
                success: false
            });
        }
    },

    async findAllParceiro(req: any, res: any){
        try {            
            const parceiros = await prisma.parceiro.findMany();

            return res.status(200).json(parceiros);
        } catch (error) {
            return res.status(400).json({
                data: [],
                error: "Ocorreu um erro ao buscar os conteúdos.",
                success: false
            });
        }
    }
}
