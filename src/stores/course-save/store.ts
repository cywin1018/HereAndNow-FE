import { create } from 'zustand';
import type { CourseSaveData } from './types';

interface CourseSaveStore {
  courseData: CourseSaveData | null;
  setCourseData: (data: CourseSaveData) => void;
  updateCourseData: (data: Partial<CourseSaveData>) => void;
  addPin: (pin: CourseSaveData['pinList'][0]) => void;
  updatePin: (index: number, pin: Partial<CourseSaveData['pinList'][0]>) => void;
  removePin: (index: number) => void;
  resetCourseData: () => void;
}

const initialCourseData: CourseSaveData = {
  courseTitle: '',
  courseDescription: '',
  coursePositive: '',
  courseNegative: '',
  isPublic: true,
  courseVisitDate: '',
  courseWith: '',
  courseRegion: '',
  courseRating: 0,
  pinList: [],
};

export const useCourseSaveStore = create<CourseSaveStore>(set => ({
  courseData: null,

  setCourseData: (data: CourseSaveData) => {
    set({ courseData: data });
  },

  updateCourseData: (data: Partial<CourseSaveData>) => {
    set(state => ({
      courseData: state.courseData ? { ...state.courseData, ...data } : { ...initialCourseData, ...data },
    }));
  },

  addPin: (pin: CourseSaveData['pinList'][0]) => {
    set(state => ({
      courseData: state.courseData
        ? { ...state.courseData, pinList: [...state.courseData.pinList, pin] }
        : { ...initialCourseData, pinList: [pin] },
    }));
  },

  updatePin: (index: number, pin: Partial<CourseSaveData['pinList'][0]>) => {
    set(state => {
      if (!state.courseData) return state;

      const updatedPinList = [...state.courseData.pinList];
      if (updatedPinList[index]) {
        updatedPinList[index] = { ...updatedPinList[index], ...pin };
      }

      return {
        courseData: {
          ...state.courseData,
          pinList: updatedPinList,
        },
      };
    });
  },

  removePin: (index: number) => {
    set(state => {
      if (!state.courseData) return state;

      const updatedPinList = state.courseData.pinList.filter((_, i) => i !== index);

      return {
        courseData: {
          ...state.courseData,
          pinList: updatedPinList,
        },
      };
    });
  },

  resetCourseData: () => {
    set({ courseData: null });
  },
}));
