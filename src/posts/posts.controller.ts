import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import {
  DeleteResponseDto,
  PostCreateRequestDto,
  PostDto,
  PostsListResponseDto,
  PostsQueryReqDto,
  PostUpdateRequestDto,
} from './dto/posts.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '포스트 목록 (커서 기반 페이지네이션)' })
  @ApiResponse({ status: 200, type: PostsListResponseDto })
  list(@Query() query: PostsQueryReqDto) {
    return this.postsService.list(query);
  }

  @Post()
  @ApiOperation({ summary: '포스트 생성' })
  @ApiBody({ type: PostCreateRequestDto })
  @ApiResponse({ status: 201, type: PostDto })
  create(@Body() dto: PostCreateRequestDto) {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '포스트 수정' })
  @ApiBody({ type: PostUpdateRequestDto })
  @ApiResponse({ status: 200, type: PostDto })
  update(@Param('id') id: string, @Body() dto: PostUpdateRequestDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '포스트 삭제' })
  @ApiResponse({ status: 200, type: DeleteResponseDto })
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
