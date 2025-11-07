import { Injectable } from '@nestjs/common';

@Injectable()
export class MockService {
  getTopCoffeeBrands() {
    return [
      { brand: '스타벅스', popularity: 40 },
      { brand: '컴포즈커피', popularity: 25 },
      { brand: '커피빈', popularity: 20 },
      { brand: '바나프레소', popularity: 10 },
      { brand: '기타', popularity: 5 },
    ];
  }

  getWeeklyMoodTrend() {
    return [
      { week: '2024-11-25', happy: 68, tired: 21, stressed: 11 },
      { week: '2024-12-02', happy: 61, tired: 25, stressed: 14 },
      { week: '2024-12-09', happy: 72, tired: 18, stressed: 10 },
      { week: '2024-12-16', happy: 58, tired: 30, stressed: 12 },
      { week: '2024-12-23', happy: 80, tired: 15, stressed: 5 },
    ];
  }

  getCoffeeConsumption() {
    return {
      teams: [
        {
          team: 'Frontend',
          series: [
            { cups: 1, bugs: 12, productivity: 60 },
            { cups: 2, bugs: 8, productivity: 72 },
            { cups: 3, bugs: 6, productivity: 85 },
            { cups: 4, bugs: 7, productivity: 83 },
            { cups: 5, bugs: 9, productivity: 78 },
          ],
        },
        {
          team: 'Backend',
          series: [
            { cups: 1, bugs: 14, productivity: 58 },
            { cups: 2, bugs: 10, productivity: 70 },
            { cups: 3, bugs: 7, productivity: 82 },
            { cups: 4, bugs: 8, productivity: 80 },
            { cups: 5, bugs: 11, productivity: 75 },
          ],
        },
        {
          team: 'AI',
          series: [
            { cups: 1, bugs: 13, productivity: 62 },
            { cups: 2, bugs: 9, productivity: 74 },
            { cups: 3, bugs: 6, productivity: 88 },
            { cups: 4, bugs: 7, productivity: 86 },
            { cups: 5, bugs: 10, productivity: 80 },
          ],
        },
      ],
    };
  }
}
