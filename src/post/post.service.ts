import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}
  async createPost(title: string, body: string, userId: string): Promise<Post> {
    const newPost = new this.postModel({ title, body, createdBy: userId });
    return await newPost.save();
  }
  async findAll(userId: string): Promise<Post[]> {
    return this.postModel.find({ createdBy: userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.createdBy !== userId) {
      throw new UnauthorizedException('You can only access your own posts');
    }
    return post;
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
    userId: string,
  ): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.createdBy !== userId) {
      throw new UnauthorizedException('You can only update your own posts');
    }
    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async remove(id: string, userId: string): Promise<void> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.createdBy !== userId) {
      throw new UnauthorizedException('You can only delete your own posts');
    }
    await this.postModel.findByIdAndDelete(id);
  }

  async findByGeoLocation(
    latitude: number,
    longitude: number,
  ): Promise<Post[]> {
    return this.postModel
      .find({
        'geoLocation.latitude': latitude,
        'geoLocation.longitude': longitude,
      })
      .exec();
  }

  async countPosts(
    userId: string,
  ): Promise<{ active: number; inactive: number  }> {
    const activeCount = await this.postModel.countDocuments({
      createdBy:  String(userId),
      isActive: true,
    });
    const inactiveCount = await this.postModel.countDocuments({
      createdBy:  String(userId),
      isActive: false,
    });
    return { active: activeCount, inactive: inactiveCount };
  }
}
