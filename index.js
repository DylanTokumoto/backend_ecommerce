// forma compatível com o node para fazer a importação do express (import express from "express")
const express = require("express");
const mongoose = require("mongoose");

const ItemSchema = require("./schemas/ItemSchema");

const PORT = process.env.PORT || 3333;

//iniciando o express dentro da const app
const app = express();

mongoose.connect("mongodb+srv://admin:admin@cluster0.n8rjbr8.mongodb.net/my_db?retryWrites=true&w=majority");

app.use(express.json);



app.get("/", (request, response)=>{
    return response.json({message: "Ola usuário"});
});

//get all
app.get("/items", async (request, response)=>{
    const res = await ItemSchema.find();
    return response.json(res);
})

//get by ID
app.get("/items/:id", async (request, response)=>{

    const id = request.params.id;
    const res = await ItemSchema.findById(id);

    if(!res){
        return response.status(404).json({message: "item not found!"});
    }

    return response.status(200).json(res);
    
    /* const tarefa = tarefas.find((tarefa)=> tarefa.id === Number(request.params.id));
    // if(!tarefa){
    //     return response.status(404).json({message: "item not found"});
    // }
    // return response.json(tarefa);*/
});

//add item
app.post("/items", async (request, response)=>{

    const res = await ItemSchema.create(request.body);

    return response.status(201).json(res);

    /* const body = request.body;
    // tarefas.push({...body, id:Date.now()});
    // return response.status(201).json({message: "item created"});*/
});

//delete item
app.delete("/items/:id", async (request, response)=>{
    
    const id = request.params.id;

    try {
        await ItemSchema.findByIdAndDelete(id);

        return response.status(204).json({message: "item removed"});
    } catch (error) {
        return response.status(500).json();
    }
    
   
    /* const indexItem = tarefas.findIndex(
    //     (tarefa) => tarefa.id === Number(request.params.id)
    // );
    // tarefas.splice(indexItem, 1);
    // return response.status().json({ok: "item removed"});*/
});

app.put("/items/:id", async (request, response)=>{
    const id = request.params.id;
    const body = request.params.body;

    const res = await ItemSchema.findByIdAndUpdate({_id: id}, body);

    return response.status(200).json(res);
    // const indexItem = tarefas.findIndex(
    //     (tarefa) => tarefa.id === Number(request.params.id)
    // );

    // tarefas[indexItem].description = request.body.description;

    // return response.json({ok: "ok"});
});



app.listen(PORT, ()=>console.log("servidor iniciado com sucesso em http://localhost:" + PORT));

