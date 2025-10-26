import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function pegarTodosOsLivros(req, res){

    try{
        const todosOsLivros = await prisma.books.findMany();

        res.status(200).json(todosOsLivros);
    } catch (error) {
        res.status(500).json({ error: "Erro ao pegar todos os livros" });
    }
}

export async function pegarLivroPorId(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({ message: "id inválido" });
    }

    try {
        const livro = await prisma.books.findUnique({
        where: { id: idNumero },
    });

    res.status(200).json(livro);
    } catch (error) {
        res.status(500).json({ error: "Erro ao pegar o livro" });
    }
}

export async function criarLivro(req, res) {
    const { title, author } = req.body;

    if(!title || !author){
        return res.status(400).json({ message: "title e author são obrigatórios" });
    }

    try {
        const novoLivro = await prisma.books.create({
            data: {
                title: title,
                author: author,
            },
        });

        res.status(201).json({ message: "Livro criado com sucesso" , novoLivro });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao criar livro" });
    }
}

export async function deletarLivro(req, res) {
    const {id} = req.params;
    const idNumero = parseInt(id);

    if(isNaN(idNumero)) {
        return res.status(400).json({ message: "id inválido" });
    }

    try {
        await prisma.books.delete({
            where: { id: idNumero },
        });

        res.status(200).json({ message: "Livro deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao deletar livro" });        
    }
}

export async function emprestarLivro(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "id inválido" });
  }

  try {
    await prisma.books.update({ where: { id }, data: { available: false } });

    res.status(200).json({ message: "Livro emprestado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao emprestar livro" });
  }
}

export async function devolverLivro(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { 
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    await prisma.books.update({ where: { id }, data: { available: true } });
    
    res.status(200).json({ message: "Livro devolvido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao devolver livro" });
  }
}

export async function atualizarLivro(req, res) {
  const id = parseInt(req.params.id);
  const { title, author, available } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const livroAtualizado = await prisma.books.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(author && { author }),
        ...(available !== undefined && { available })
      }
    });

    res.status(200).json({ message: "Livro atualizado com sucesso", livro: livroAtualizado });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar livro" });
  }
}
