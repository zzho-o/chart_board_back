import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts: {
    id: string;
    userId: string;
    title: string;
    body: string;
    category: string;
    tags: string[];
    createdAt: Date;
  }[] = [];

  findAll(userId: string) {
    return this.posts.filter((p) => p.userId === userId);
  }

  findOne(userId: string, id: string) {
    return this.posts.find((p) => p.userId === userId && p.id === id);
  }

  create(userId: string, dto: any) {
    const post = {
      id: 'p_' + Math.random().toString(36).substring(2, 8),
      userId,
      createdAt: new Date(),
      ...dto,
    };
    this.posts.push(post);
    return post;
  }

  update(userId: string, id: string, dto: any) {
    const idx = this.posts.findIndex((p) => p.userId === userId && p.id === id);
    if (idx === -1) return null;
    this.posts[idx] = { ...this.posts[idx], ...dto };
    return this.posts[idx];
  }

  deleteOne(userId: string, id: string) {
    const before = this.posts.length;
    this.posts = this.posts.filter(
      (p) => !(p.userId === userId && p.id === id),
    );
    return { ok: true, deleted: before - this.posts.length };
  }

  deleteAll(userId: string) {
    const before = this.posts.length;
    this.posts = this.posts.filter((p) => p.userId !== userId);
    return { ok: true, deleted: before - this.posts.length };
  }
}
