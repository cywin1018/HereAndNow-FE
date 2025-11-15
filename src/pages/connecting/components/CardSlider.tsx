import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

interface CardSliderProps {
  cards: React.ReactNode[];
}

const CardSlider = ({ cards }: CardSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % cards.length;
      visible.push({ index, position: i });
    }
    return visible;
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 80;

    if (info.offset.x > threshold) {
      setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
    } else if (info.offset.x < -threshold) {
      setCurrentIndex(prev => (prev + 1) % cards.length);
    }
    x.set(0);
  };

  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacityWhileDrag = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  const visibleCards = getVisibleCards();

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {visibleCards.map(({ index, position }) => {
        const scale = 1 - position * 0.05;
        const y = -position * 40;
        const baseX = 0;
        const zIndex = 3 - position;
        const opacity = position === 0 ? 1 : position === 1 ? 0.85 : 0.7;
        const blur = position * 2; // 뒤로 갈수록 블러 증가 (0px, 2px, 4px)
        const isDraggable = position === 0;

        return (
          <motion.div
            key={`card-${index}-${position}`}
            layoutId={`card-${index}`}
            className={`absolute top-[60%] left-1/2 h-[350px] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px]`}
            style={{
              scale,
              y,
              x: isDraggable ? x : baseX,
              zIndex,
              opacity: isDraggable && isDragging ? opacityWhileDrag : opacity,
              rotate: isDraggable ? rotate : 0,
              filter: `blur(${blur}px)`,
            }}
            drag={isDraggable ? 'x' : false}
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.3}
            onDragStart={isDraggable ? handleDragStart : undefined}
            onDragEnd={isDraggable ? handleDragEnd : undefined}
            animate={
              !isDragging
                ? {
                    scale,
                    y,
                    x: baseX,
                    opacity,
                    rotate: 0,
                  }
                : {}
            }
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 20,
              mass: 2,
            }}
          >
            {cards[index]}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardSlider;
