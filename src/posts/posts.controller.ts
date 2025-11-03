import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtGuard } from '../common/jwt.guard';

@Controller('posts')
@UseGuards(JwtGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAll(@Req() req) {
    return this.postsService.findAll(req.user.id);
  }

  @Post()
  create(@Req() req, @Body() body) {
    return this.postsService.create(req.user.id, body);
  }

  @Get(':id')
  getOne(@Req() req, @Param('id') id: string) {
    return this.postsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body) {
    return this.postsService.update(req.user.id, id, body);
  }

  @Delete(':id')
  deleteOne(@Req() req, @Param('id') id: string) {
    return this.postsService.deleteOne(req.user.id, id);
  }

  @Delete()
  deleteAll(@Req() req) {
    return this.postsService.deleteAll(req.user.id);
  }
}
