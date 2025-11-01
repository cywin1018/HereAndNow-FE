import { useState, useRef, useEffect } from 'react';
import DownArrowIcon from '@assets/icons/bxs_down-arrow.svg';

type TabType = 'course' | 'place';
type SortType = 'latest' | 'liked' | 'reviewed';

interface TabNavigationProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  onSortChange?: (sort: SortType) => void;
}

const TabNavigation = ({ activeTab = 'course', onTabChange, onSortChange }: TabNavigationProps) => {
  const [selectedTab, setSelectedTab] = useState<TabType>(activeTab);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortType>('liked');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: TabType) => {
    setSelectedTab(tab);
    onTabChange?.(tab);
  };

  const handleSortClick = (sort: SortType) => {
    setSelectedSort(sort);
    setIsDropdownOpen(false);
    onSortChange?.(sort);
  };

  const sortOptions: { value: SortType; label: string }[] = [
    { value: 'latest', label: '최신 순' },
    { value: 'liked', label: '찜 많은 순' },
    { value: 'reviewed', label: '리뷰 많은 순' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const isCourse = selectedTab === 'course';
  const isPlace = selectedTab === 'place';

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          onClick={() => handleTabClick('course')}
          className={`relative p-[10px] transition-colors ${isCourse ? 'text-s1 text-neutral-8' : 'text-s2 text-neutral-6'}`}
        >
          코스
          {isCourse && <span className="bg-pink-6 absolute right-0 bottom-[-8px] left-0 h-[3px]" />}
        </button>

        <button
          onClick={() => handleTabClick('place')}
          className={`relative p-[10px] transition-colors ${isPlace ? 'text-s1 text-neutral-8' : 'text-s2 text-neutral-6'}`}
        >
          장소
          {isPlace && <span className="bg-pink-6 absolute right-0 bottom-[-8px] left-0 h-[3px]" />}
        </button>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-d1 text-neutral-6 flex items-center gap-1 pr-[20px] transition-colors"
        >
          <span>{sortOptions.find(opt => opt.value === selectedSort)?.label}</span>
          <img
            src={DownArrowIcon}
            alt="정렬"
            className={`h-[12px] w-[12px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="border-neutral-4 absolute top-full right-0 z-10 mt-2 w-[140px] overflow-hidden rounded-lg border bg-white shadow-lg">
            {sortOptions.map((option, index) => (
              <div key={option.value}>
                {index > 0 && <div className="bg-neutral-4 h-px" />}
                <button
                  onClick={() => handleSortClick(option.value)}
                  className="text-d1 text-neutral-6 hover:bg-neutral-2 w-full px-4 py-3 text-left transition-colors"
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabNavigation;
