// 타입 정의
export interface ArchiveSearchParams {
  page?: number;
  size?: number;
  rating?: string;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  with?: string;
  region?: string;
  placeCode?: string;
  tag?: string;
}

export interface SelectedFilters {
  rating?: number;
  keyword?: string[];
  startDate?: string;
  endDate?: string;
  with?: string;
  region?: string;
  placeCode?: string[];
  tag?: string[];
}

export interface CourseItem {
  id: number;
  courseTitle: string;
  commentCount: number;
  courseVisitDate: string;
}

export interface ArchiveSearchResponse {
  timestamp: string;
  data: {
    selectedFilters: SelectedFilters;
    filteredCourses: CourseItem[];
  };
  isSuccess: boolean;
}

export interface RecentArchiveData {
  courseId: number;
  courseVisitDate: string;
  courseTitle: string;
  courseImages: string[];
  courseDescription: string;
  courseTags: string[];
  commentCount: number;
}

export interface RecentArchiveResponse {
  timestamp: string;
  data: RecentArchiveData | null;
  isSuccess: boolean;
}

export interface CreatedArchiveParams {
  page?: number;
  size?: number;
}

export interface CreatedArchiveResponse {
  timestamp: string;
  data: CourseItem[];
  isSuccess: boolean;
}
