import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.decorator';

@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: any,
  ): Promise<any> {
    const { title, body } = createPostDto;
    const userId = req.user.userId;

    return this.postService.createPost(title, body, userId);
  }

  @Get()
  findAll(@User('userId') userId: string) {
    return this.postService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User('userId') userId: string) {
    return this.postService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @User('userId') userId: string,
  ) {
    return this.postService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User('userId') userId: string) {
    return this.postService.remove(id, userId);
  }

  @Get('location')
  findByGeoLocation(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ) {
    return this.postService.findByGeoLocation(latitude, longitude);
  }

  @Get('count')
  countPosts(@User('userId') userId: string) {
    return this.postService.countPosts(userId);
  }
}
