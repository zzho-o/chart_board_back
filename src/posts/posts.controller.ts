import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Patch,
  Body,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { JwtGuard } from '../common/jwt.guard';
import type { Request } from 'express';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
@UseGuards(JwtGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '내 포스트 목록 (커서 기반 페이지네이션)' })
  list(@Req() req: Request, @Query() query: any) {
    return this.postsService.list(req.user!.id, query);
  }

  @Post()
  @ApiOperation({ summary: '포스트 생성 (본인)' })
  create(@Req() req: Request, @Body() body: any) {
    return this.postsService.create(req.user!.id, body);
  }

  @Get(':id')
  @ApiOperation({ summary: '단건 조회 (본인)' })
  get(@Req() req: Request, @Param('id') id: string) {
    return this.postsService.findOne(req.user!.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '부분 수정 (본인)' })
  update(@Req() req: Request, @Param('id') id: string, @Body() body: any) {
    return this.postsService.update(req.user!.id, id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: '단건 삭제 (본인)' })
  deleteOne(@Req() req: Request, @Param('id') id: string) {
    return this.postsService.deleteOne(req.user!.id, id);
  }

  @Delete()
  @ApiOperation({ summary: '내 모든 포스트 삭제' })
  deleteAll(@Req() req: Request) {
    return this.postsService.deleteAll(req.user!.id);
  }
}
