import { Request, Response } from "express";
import prisma from "../services/db";

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { authors: true },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(req.params.id) },
      include: { authors: true },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authors: {
          connect: {
            id: (req as any).user.id,
          },
        },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: {
        id: Number(req.params.id),
      },
      data: { title, content },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await prisma.post.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
