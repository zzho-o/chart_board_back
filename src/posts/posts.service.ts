import { Injectable } from '@nestjs/common';
import {
  PostCreateRequestDto,
  PostDto,
  PostUpdateRequestDto,
} from './dto/posts.dto';

@Injectable()
export class PostsService {
  private posts: PostDto[] = [];

  private encodeCursor(post: PostDto) {
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

  list(query: { limit?: number; nextCursor?: string }) {
    const { limit = 10, nextCursor } = query;
    const startIndex = nextCursor
      ? this.posts.findIndex((p) => p.id === this.decodeCursor(nextCursor)) + 1
      : 0;

    const slice = this.posts.slice(startIndex, startIndex + Number(limit));
    const next =
      slice.length === Number(limit)
        ? this.encodeCursor(slice[slice.length - 1])
        : null;

    return { items: slice, nextCursor: next };
  }

  create(dto: PostCreateRequestDto) {
    const post: PostDto = {
      id: 'p_' + Math.random().toString(36).substring(2, 8),
      userId: 'u_1', // 임시 유저
      title: dto.title ?? '(제목 없음)',
      body: dto.body ?? '',
      category: dto.category ?? 'FREE',
      tags: dto.tags ?? [],
      createdAt: new Date().toISOString(),
    };
    this.posts.push(post);
    return post;
  }

  update(id: string, dto: PostUpdateRequestDto) {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.posts[idx] = { ...this.posts[idx], ...dto };
    return this.posts[idx];
  }

  remove(id: string) {
    const before = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    return { ok: true, deleted: before - this.posts.length };
  }
}
