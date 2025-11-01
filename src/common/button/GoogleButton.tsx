import googleIcon from '@assets/icons/googleIcon.svg';

const GoogleButton = () => {
  return (
    <button
      className="/* --- 수정된 부분 --- */ /* 배경색: neutral-1 (흰색) */ /* 텍스트색: neutral-8 (어두운 회색) */ /* 테두리색: neutral-4 (요청하신 색상) */ flex w-full items-center justify-between rounded-lg border border-[var(--color-neutral-4)] bg-[var(--color-neutral-1)] px-4 py-3 font-medium text-[var(--color-neutral-8)] transition-colors hover:bg-[var(--color-neutral-3)]" /* 호버색: neutral-3 (옅은 회색) */
    >
      <img src={googleIcon} alt="구글 아이콘" className="h-5 w-5" />

      <span>구글 로그인</span>

      <div className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default GoogleButton;
