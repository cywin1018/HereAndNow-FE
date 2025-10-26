import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '@pages/home/HomePage';
import Layout from '@common/layout/Layout';
import KakaoCallback from '@pages/oauth/KakaoCallback';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/oauth/kakao" element={<KakaoCallback />} />
          <Route path="/auth/callback" element={<KakaoCallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
