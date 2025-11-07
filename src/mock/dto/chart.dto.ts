import { ApiProperty } from '@nestjs/swagger';

export class TopCoffeeBrandItemDto {
  @ApiProperty({ example: 'Starbucks' })
  brand: string;

  @ApiProperty({ example: 85 })
  popularity: number;
}

export class WeeklyMoodItemDto {
  @ApiProperty({ example: '2025-W45' })
  week: string;

  @ApiProperty({ example: 70 })
  happy: number;

  @ApiProperty({ example: 20 })
  tired: number;

  @ApiProperty({ example: 10 })
  stressed: number;
}

export class CoffeeDataPointDto {
  @ApiProperty({ example: 3 })
  cups: number;

  @ApiProperty({ example: 2 })
  bugs: number;

  @ApiProperty({ example: 90 })
  productivity: number;
}

export class CoffeeTeamDto {
  @ApiProperty({ example: 'Frontend Team' })
  team: string;

  @ApiProperty({ type: [CoffeeDataPointDto] })
  series: CoffeeDataPointDto[];
}

export class CoffeeConsumptionResponseDto {
  @ApiProperty({ type: [CoffeeTeamDto] })
  teams: CoffeeTeamDto[];
}
