import GoogleButton from '@common/button/GoogleButton';
import KakaoButton from '@common/button/KakaoButton';

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col justify-between p-6">
      <div className="flex flex-grow flex-col items-center justify-center">
        <img src="/LogoSection.png" alt="Here&Now 로고" className="w-48" />
        <p className="text-neutral-5 mt-4">발견한 곳이 곧 우리의 이야기가 되다</p>
      </div>

      <div className="flex flex-col gap-y-3">
        <KakaoButton />
        <GoogleButton />
      </div>
    </div>
  );
};

export default LoginPage;
