import { JobType } from '@/types/enums';

export function getJobTypeLabel(type?: JobType | string) {
  switch (type) {
    case JobType.FULL_TIME:
      return 'Toàn thời gian';
    case JobType.PART_TIME:
      return 'Bán thời gian';
    case JobType.CONTRACT:
      return 'Hợp đồng';
    case JobType.INTERNSHIP:
      return 'Thực tập';
    case JobType.FREELANCE:
      return 'Freelance';
    default:
      return 'Không xác định';
  }
}