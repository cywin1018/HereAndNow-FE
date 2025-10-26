import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen">
      {/* 개발용 main의 border 로 너비 확인 */}
      <main className="mx-auto min-h-screen w-full max-w-md border bg-white">
        <header className="border-b p-4">
          <h1 className="text-s1 text-neutral-13 text-center">임시 헤더</h1>
        </header>

        {/* 자식 라우트(페이지 컴포넌트)가 이 자리에 렌더링됩니다. */}
        <section className="p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
