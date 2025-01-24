import express from 'express'
import { PrismaClient } from '@prisma/client';

const app = express();
const client = new PrismaClient();
app.use(express.json())

app.post("/hooks/catch/:userId/:zapId",async(req,res) =>{
    const userId = req.params.userId;
    const zapid =  req.params.zapId;
    const body = req.body

    await  client.$transaction(async(tx)=>{

        const run = await tx.zapRun.create({
            data:{
                zapId:zapid,
                metadata:body
            }
        })

        await tx.zapRunOutbox.create({
            data:{
                zapRunId:run.id
            }
        })
    })
    
    res.json({
        message:'webhook received'
    })
})

app.listen(3000);