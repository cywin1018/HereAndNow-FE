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

  const getCardColor = (index: number) => {
    const colorPalette = [
      { bg: 'bg-pink-50', border: 'border-pink-200' },
      { bg: 'bg-blue-50', border: 'border-blue-200' },
      { bg: 'bg-purple-50', border: 'border-purple-200' },
      { bg: 'bg-green-50', border: 'border-green-200' },
      { bg: 'bg-yellow-50', border: 'border-yellow-200' },
      { bg: 'bg-orange-50', border: 'border-orange-200' },
      { bg: 'bg-red-50', border: 'border-red-200' },
      { bg: 'bg-indigo-50', border: 'border-indigo-200' },
      { bg: 'bg-teal-50', border: 'border-teal-200' },
      { bg: 'bg-cyan-50', border: 'border-cyan-200' },
    ];
    return colorPalette[index % colorPalette.length];
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {visibleCards.map(({ index, position }) => {
        const scale = 1 - position * 0.05;
        const y = -position * 40;
        const baseX = 0;
        const zIndex = 3 - position;
        const opacity = position === 0 ? 1 : position === 1 ? 0.85 : 0.7;
        const isDraggable = position === 0;
        const cardColor = getCardColor(index);

        return (
          <motion.div
            key={`card-${index}-${position}`}
            layoutId={`card-${index}`}
            className={`${cardColor.bg} ${cardColor.border} absolute top-[60%] left-1/2 h-[350px] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] border-2`}
            style={{
              scale,
              y,
              x: isDraggable ? x : baseX,
              zIndex,
              opacity: isDraggable && isDragging ? opacityWhileDrag : opacity,
              rotate: isDraggable ? rotate : 0,
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
