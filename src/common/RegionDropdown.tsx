import { useState, useRef, useEffect } from 'react';
import { REGION_GROUPS } from '../utils/stationMapping';
import DownArrowIcon from '@assets/icons/bxs_down-arrow.svg';

interface RegionDropdownProps {
  selectedRegion?: string;
  onSelect?: (region: string) => void;
  className?: string;
}

const RegionDropdown = ({ selectedRegion, onSelect, className }: RegionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (region: string) => {
    if (onSelect) {
      onSelect(region);
    }
    setIsOpen(false);
  };

  const displayValue = selectedRegion || '지역을 선택하세요';

  return (
    <div ref={dropdownRef} className={`relative ${className || ''}`}>
      {/* 선택된 값 표시 영역 */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-iceblue-6 flex h-12 w-[362px] items-center justify-between rounded-t-lg border bg-white pt-3 pr-5 pb-3 pl-5 transition-colors"
      >
        <span className="text-d1 text-neutral-8">{displayValue}</span>
        <img
          src={DownArrowIcon}
          alt="드롭다운"
          className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="border-iceblue-6 absolute top-full z-10 mt-2 w-[362px] overflow-hidden rounded-lg border bg-white shadow-lg">
          <div className="max-h-[120px] overflow-y-auto">
            {REGION_GROUPS.map((region, index) => (
              <div key={region}>
                {index > 0 && <div className="bg-neutral-4 h-px" />}
                <button
                  type="button"
                  onClick={() => handleSelect(region)}
                  className={`text-d1 text-neutral-6 hover:bg-neutral-2 w-full px-4 py-3 text-left transition-colors ${
                    selectedRegion === region ? 'bg-neutral-2 text-neutral-8' : ''
                  }`}
                >
                  {region}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionDropdown;
