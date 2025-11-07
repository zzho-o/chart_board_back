import { Injectable } from '@nestjs/common';
import { Post } from 'src/types';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  private encodeCursor(post: Post) {
    return Buffer.from(post.id).toString('base64');
  }
  private decodeCursor(cursor: string | null) {
    if (!cursor) return null;
    try {
      return Buffer.from(cursor, 'base64').toString('utf8');
    } catch {
      return null;
    }
  }

  list(userId: string, query: any) {
    const { limit = 10, nextCursor } = query;
    const startIndex = nextCursor
      ? this.posts.findIndex((p) => p.id === this.decodeCursor(nextCursor)) + 1
      : 0;

    const userPosts = this.posts.filter((p) => p.userId === userId);
    const slice = userPosts.slice(startIndex, startIndex + Number(limit));
    const next =
      slice.length === Number(limit)
        ? this.encodeCursor(slice[slice.length - 1])
        : null;

    return { items: slice, nextCursor: next };
  }

  findOne(userId: string, id: string) {
    return this.posts.find((p) => p.userId === userId && p.id === id);
  }

  create(userId: string, dto: any) {
    const post: Post = {
      id: 'p_' + Math.random().toString(36).substring(2, 8),
      userId,
      createdAt: new Date().toISOString(),
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
