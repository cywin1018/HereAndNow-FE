import api from 'src/apis/common/api';

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

// API 함수들

/**
 * 아카이빙 폴더 검색(필터링) API
 * @param params 검색 필터 파라미터
 * @returns 검색 결과와 적용된 필터 정보
 */
export const searchArchive = async (params: ArchiveSearchParams = {}): Promise<ArchiveSearchResponse> => {
  try {
    const { data } = await api.get<ArchiveSearchResponse>('/archive/search', { params });
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * 가장 최신 아카이빙 폴더 API
 * @returns 최신 아카이빙 폴더 정보
 */
export const getRecentArchive = async (): Promise<RecentArchiveResponse> => {
  try {
    const { data } = await api.get<RecentArchiveResponse>('/archive/recent');
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * 내가 생성한 코스 폴더 리스트 API
 * @param params 페이지네이션 파라미터
 * @returns 생성한 코스 폴더 리스트
 */
export const getCreatedArchives = async (params: CreatedArchiveParams = {}): Promise<CreatedArchiveResponse> => {
  try {
    const { data } = await api.get<CreatedArchiveResponse>('/archive/created', { params });
    return data;
  } catch (error) {
    throw error;
  }
};
