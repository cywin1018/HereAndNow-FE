interface StarProps {
  fillPercentage: number;
  starId: number; // 각 그래디언트에 고유 ID를 부여하기 위함
}

const Star = ({ fillPercentage, starId }: StarProps) => {
  const gradientId = `yellow-star-gradient-${starId}`;

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          {/* 채울 비율(%)만큼 노란색으로 칠합니다. */}
          <stop offset="0%" stopColor="#FFD500" />
          <stop offset={`${fillPercentage}%`} stopColor="#FFD500" />
          {/* 나머지 부분은 회색으로 칠합니다. */}
          <stop offset={`${fillPercentage}%`} stopColor="#E5E5E5" />
          <stop offset="100%" stopColor="#E5E5E5" />
        </linearGradient>
      </defs>
      <path
        d="M8 0L10.1631 5.52786L16 6.11146L11.8541 9.94428L12.9443 16L8 13.0557L3.05573 16L4.14593 9.94428L0 6.11146L5.83686 5.52786L8 0Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
};

export default Star;
