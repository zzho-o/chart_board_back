import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Category {
  NOTICE = 'NOTICE',
  QNA = 'QNA',
  FREE = 'FREE',
}

export class PostCreateRequestDto {
  @ApiProperty({ example: 'NestJS 게시판 만들기', description: '게시글 제목' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @ApiProperty({
    example: '오늘은 NestJS를 사용해 게시판을 만들었습니다.',
    description: '게시글 본문',
  })
  @IsString()
  @MinLength(1)
  body: string;

  @ApiProperty({ enum: Category, example: 'NOTICE', description: '카테고리' })
  @IsEnum(Category)
  category: Category;

  @ApiProperty({
    example: ['nestjs', 'api'],
    description: '태그 목록',
    required: false,
  })
  @IsOptional()
  tags?: string[];
}

export class PostUpdateRequestDto extends PartialType(PostCreateRequestDto) {}

export class PostDto {
  @ApiProperty({ example: 'p_abc123' })
  id: string;

  @ApiProperty({ example: 'u_1' })
  userId: string;

  @ApiProperty({ example: 'NestJS 게시판 만들기' })
  title: string;

  @ApiProperty({ example: '본문 내용입니다.' })
  body: string;

  @ApiProperty({ enum: Category })
  category: Category;

  @ApiProperty({ example: ['nestjs', 'api'] })
  tags: string[];

  @ApiProperty({ example: '2025-11-07T09:00:00.000Z' })
  createdAt: string;
}

export class DeleteResponseDto {
  @ApiProperty({ example: true })
  ok: boolean;

  @ApiProperty({ example: 1 })
  deleted: number;
}

export class PostsQueryReqDto {
  @ApiProperty({ example: 10, required: false })
  limit?: number;

  @ApiProperty({
    example:
      'eyJzIjoidGl0bGUiLCJvIjoiYXNjIiwidiI6Iu2VnO2VgCIsImlkIjoicF83ODkifQ',
    required: false,
  })
  nextCursor?: string;

  @ApiProperty({ enum: Category, required: false })
  category?: Category;

  @ApiProperty({ example: '검색어', required: false })
  search?: string;
}

export class PostsListResponseDto {
  @ApiProperty({ type: [PostDto] })
  items: PostDto[];

  @ApiProperty({
    example:
      'eyJzIjoidGl0bGUiLCJvIjoiYXNjIiwidiI6Iu2VnO2VgCIsImlkIjoicF83ODkifQ',
    required: false,
  })
  nextCursor: string | null;
}
