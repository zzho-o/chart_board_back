import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class MockService {
  private posts = Array.from({ length: 500 }).map((_, i) => ({
    id: `m_${(i + 1).toString().padStart(4, '0')}`,
    userId: `u_mock_${i + 1}`,
    title: `샘플 포스트 #${i + 1}`,
    body: `이것은 고정된 테스트용 포스트 본문입니다. (${i + 1})번째 게시글.`,
    category: faker.helpers.arrayElement(['NOTICE', 'QNA', 'FREE']),
    tags: [faker.helpers.arrayElement(['react', 'typescript', 'nextjs'])],
    createdAt: new Date(Date.now() - i * 3600000),
  }));

  getMockPosts(count = 300) {
    return { items: this.posts.slice(0, Math.min(count, 500)), count };
  }

  getCoffeeConsumption() {
    return {
      teams: ['Frontend', 'Backend', 'AI'].map((team) => ({
        team,
        series: Array.from({ length: 5 }).map((_, i) => ({
          cups: i + 1,
          bugs: faker.number.int({ min: 6, max: 14 }),
          productivity: faker.number.int({ min: 60, max: 90 }),
        })),
      })),
    };
  }

  getWeeklyMoodTrend() {
    return Array.from({ length: 5 }).map((_, i) => ({
      week: faker.date
        .recent({ days: 40 - i * 7 })
        .toISOString()
        .split('T')[0],
      happy: faker.number.int({ min: 50, max: 80 }),
      tired: faker.number.int({ min: 10, max: 30 }),
      stressed: faker.number.int({ min: 5, max: 15 }),
    }));
  }

  getTopCoffeeBrands() {
    return [
      { brand: '스타벅스', popularity: 40 },
      { brand: '컴포즈커피', popularity: 25 },
      { brand: '커피빈', popularity: 20 },
      { brand: '바나프레소', popularity: 10 },
      { brand: '기타', popularity: 5 },
    ];
  }
}
