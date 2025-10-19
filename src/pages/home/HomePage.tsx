const HomePage = () => {
  return (
    <div className="bg-neutral-1 min-h-screen p-8">
      {/* Hero Section */}
      <section className="bg-pink-7 mb-12 rounded-xl p-8">
        <h1 className="text-h1 text-neutral-1">디자인 시스템 테스트</h1>
        <p className="text-b1 text-neutral-2 mt-4">타이포그래피와 컬러 토큰 테스트입니다.</p>
      </section>

      {/* Typography Test */}
      <section className="bg-neutral-2 mb-12 rounded-xl p-8">
        <h2 className="text-h2 text-neutral-13 mb-6">타이포그래피 (SUITE)</h2>
        <div className="space-y-4">
          <h1 className="text-h1 text-neutral-12">H1 - SUITE Bold 36px</h1>
          <h2 className="text-h2 text-neutral-12">H2 - SUITE Medium 36px</h2>
          <h3 className="text-h3 text-neutral-11">H3 - SUITE Bold 32px</h3>
          <h4 className="text-h4 text-neutral-10">H4 - SUITE Bold 28px</h4>
          <h5 className="text-h5 text-neutral-10">H5 - SUITE Medium 24px</h5>
        </div>
      </section>

      {/* Subtitles & Body */}
      <div className="mb-12 grid grid-cols-2 gap-6">
        <section className="bg-iceblue-3 rounded-xl p-8">
          <h3 className="text-h4 text-neutral-13 mb-4">부제목 (Pretendard)</h3>
          <div className="space-y-3">
            <h6 className="text-s1 text-neutral-12">S1 - Bold 20px</h6>
            <h6 className="text-s2 text-neutral-11">S2 - Medium 20px</h6>
            <h6 className="text-s3 text-neutral-10">S3 - Bold 18px</h6>
            <h6 className="text-s4 text-neutral-10">S4 - Semibold 18px</h6>
            <h6 className="text-s5 text-neutral-9">S5 - Medium 18px</h6>
            <h6 className="text-s6 text-neutral-9">S6 - Semibold 16px</h6>
          </div>
        </section>

        <section className="bg-iceblue-3 rounded-xl p-8">
          <h3 className="text-h4 text-neutral-13 mb-4">본문 (Pretendard)</h3>
          <div className="space-y-3">
            <p className="text-b1 text-neutral-12">B1 - Medium 20px</p>
            <p className="text-b2 text-neutral-11">B2 - Regular 20px</p>
            <p className="text-b3 text-neutral-10">B3 - Medium 18px</p>
            <p className="text-b4 text-neutral-9">B4 - Regular 16px</p>
            <p className="text-b5 text-neutral-8">B5 - Regular 14px</p>
          </div>
        </section>
      </div>

      {/* Color Palette */}
      <section className="bg-neutral-2 mb-12 rounded-xl p-8">
        <h3 className="text-h3 text-neutral-13 mb-6">컬러 팔레트</h3>

        {/* Neutral Colors */}
        <div className="mb-6">
          <h4 className="text-s1 text-neutral-12 mb-3">Neutral (1-13)</h4>
          <div className="flex flex-wrap gap-2">
            <div className="bg-neutral-1 border-neutral-5 h-16 w-16 rounded-lg border"></div>
            <div className="bg-neutral-2 border-neutral-5 h-16 w-16 rounded-lg border"></div>
            <div className="bg-neutral-3 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-4 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-5 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-6 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-7 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-8 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-9 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-10 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-11 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-12 h-16 w-16 rounded-lg"></div>
            <div className="bg-neutral-13 h-16 w-16 rounded-lg"></div>
          </div>
        </div>

        {/* Pink Colors */}
        <div className="mb-6">
          <h4 className="text-s1 text-neutral-12 mb-3">Pink (1-10)</h4>
          <div className="flex flex-wrap gap-2">
            <div className="bg-pink-1 border-neutral-5 h-16 w-16 rounded-lg border"></div>
            <div className="bg-pink-2 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-3 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-4 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-5 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-6 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-7 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-8 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-9 h-16 w-16 rounded-lg"></div>
            <div className="bg-pink-10 h-16 w-16 rounded-lg"></div>
          </div>
        </div>

        {/* Iceblue Colors */}
        <div>
          <h4 className="text-s1 text-neutral-12 mb-3">Iceblue (1-10)</h4>
          <div className="flex flex-wrap gap-2">
            <div className="bg-iceblue-1 border-neutral-5 h-16 w-16 rounded-lg border"></div>
            <div className="bg-iceblue-2 border-neutral-5 h-16 w-16 rounded-lg border"></div>
            <div className="bg-iceblue-3 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-4 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-5 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-6 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-7 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-8 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-9 h-16 w-16 rounded-lg"></div>
            <div className="bg-iceblue-10 h-16 w-16 rounded-lg"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
