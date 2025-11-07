import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MockService } from './mock.service';

@ApiTags('Mock')
@Controller('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get('top-coffee-brands')
  @ApiOperation({ summary: '도넛/바 차트용 인기 커피 브랜드' })
  getTopCoffeeBrands() {
    return this.mockService.getTopCoffeeBrands();
  }

  @Get('weekly-mood-trend')
  @ApiOperation({ summary: '스택형 바/면적 차트용 주간 무드 트렌드' })
  getWeeklyMoodTrend() {
    return this.mockService.getWeeklyMoodTrend();
  }

  @Get('coffee-consumption')
  @ApiOperation({ summary: '멀티라인 차트용 팀별 커피 소비/버그/생산성' })
  getCoffeeConsumption() {
    return this.mockService.getCoffeeConsumption();
  }
}
