import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@pages/home/HomePage';
import ArchivePage from '@pages/archive/ArchivePage';
import Layout from '@common/layout/Layout';
import KakaoCallback from '@pages/oauth/KakaoCallback';
import LoginPage from '@pages/login/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import CourseSave from '@pages/place/CourseSave';
import AddPlacePage from '@pages/place/AddPlacePage';
import ArchiveSearchPage from '@pages/archive/ArchiveSearchPage';
import PlaceDetail from '@pages/place/PlaceDetail';
import CourseRegister from '@pages/place/CourseRegister';
import CourseSubmit from '@pages/place/CourseSubmit';
import CourseResult from '@pages/place/CoureResult';
import ArchiveDetailPage from '@pages/archive/ArchiveDetailPage';
import ArchivePlacePage from '@pages/archive/ArchivePlacePage';
import ArchiveSavePage from '@pages/archive/ArchiveSavePage';
import ExplorePage from '@pages/explore/ExplorePage';
import ExploreCoursePage from '@pages/explore/ExploreCoursePage';
import ExploreSearchPage from '@pages/explore/ExploreSearchPage';

interface RouterProps {
  enableAuthCheck?: boolean; // 디버깅용: 인증 체크 활성화/비활성화 (기본값: true)
}

const Router = ({ enableAuthCheck = true }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout withHeader={false} withBottomNavigation={false} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/kakao" element={<KakaoCallback />} />
          <Route path="/auth/callback" element={<KakaoCallback />} />
          <Route path="/place/save-place" element={<CourseSave />} />
          <Route path="/place/register" element={<CourseRegister />} />
          <Route path="/place/add-place" element={<AddPlacePage />} />
          <Route path="/place/course/submit" element={<CourseSubmit />} />
          <Route path="/place/course/result" element={<CourseResult />} />
          <Route path="/place/detail/:id" element={<PlaceDetail />} />
        </Route>

        {/* 아카이브 검색 페이지 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} pageTitle="검색" />}>
          <Route path="/archive/search" element={<ArchiveSearchPage />} />
        </Route>

        {/* 아카이브 저장 페이지 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} pageTitle="저장" />}>
          <Route path="/archive/save" element={<ArchiveSavePage />} />
        </Route>

        {/* 아카이브 상세 페이지 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} pageTitle="아카이빙" />}>
          <Route path="/archive/:id" element={<ArchiveDetailPage />} />
        </Route>

        {/* 아카이브 상세 페이지 - 장소 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} pageTitle="아카이빙" />}>
          <Route path="/archive/place/:id" element={<ArchivePlacePage />} />
        </Route>

        {/* 둘러보기 페이지 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={true} />}>
          <Route path="/explore" element={<ExplorePage />} />
        </Route>

        {/* 둘러보기 - 코스 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} />}>
          <Route path="/explore/course" element={<ExploreCoursePage />} />
        </Route>

        {/* 둘러보기 - 검색 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} pageTitle="검색" />}>
          <Route path="/explore/search" element={<ExploreSearchPage />} />
        </Route>

        <Route element={<ProtectedRoute enabled={enableAuthCheck} />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/archive" element={<ArchivePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
