import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@pages/home/HomePage';
import ArchivePage from '@pages/archive/ArchivePage';
import Layout from '@common/layout/Layout';
import KakaoCallback from '@pages/oauth/KakaoCallback';
import LoginPage from '@pages/login/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import CourseSave from '@pages/place/CourseSave';
import ArchiveSearchPage from '@pages/archive/ArchiveSearchPage';

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
        </Route>

        {/* 아카이브 검색 페이지 */}
        <Route element={<Layout withHeader={false} withBottomNavigation={false} pageTitle="검색" />}>
          <Route path="/archive/search" element={<ArchiveSearchPage />} />
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
