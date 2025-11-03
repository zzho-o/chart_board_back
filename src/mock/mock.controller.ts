import { Controller, Get, Query } from '@nestjs/common';
import { MockService } from './mock.service';

@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get('posts')
  getPosts(@Query('count') count?: string) {
    return this.mockService.getMockPosts(Number(count) || 300);
  }

  @Get('coffee-consumption')
  getCoffeeConsumption() {
    return this.mockService.getCoffeeConsumption();
  }

  @Get('weekly-mood-trend')
  getWeeklyMoodTrend() {
    return this.mockService.getWeeklyMoodTrend();
  }

  @Get('top-coffee-brands')
  getTopCoffeeBrands() {
    return this.mockService.getTopCoffeeBrands();
  }
}
