import React, { useState, useEffect, useCallback } from 'react';

// const defaultItems = [
//     {
//         icon: "face",
//         copy: '01. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//     },
//     {
//         icon: "pets",
//         copy: '02. Sed do eiusmod tempor incididunt ut labore.'
//     },
//     {
//         icon: "stars",
//         copy: '03. Consectetur adipiscing elit.'
//     },
//     {
//         icon: "invert_colors",
//         copy: '04. Ut enim ad minim veniam, quis nostrud exercitation.'
//     },
//     {
//         icon: "psychology",
//         copy: '05. Llamco nisi ut aliquip ex ea commodo consequat.'
//     },
//     {
//         icon: "brightness_7",
//         copy: '06. Misi ut aliquip ex ea commodo consequat.'
//     }
// ];

const CarouselCard = ({ thumbnail, title, isActive }) => (
    <div className={`transform transition-all duration-300 ${isActive ? 'scale-105' : 'scale-95 opacity-70'}`}>
        <div className="bg-white rounded-lg shadow-lg p-6 h-48 flex flex-col items-center justify-center space-y-4">
            <img src={thumbnail} className="text-4xl text-blue-600" />
            <p className="text-center text-gray-700">{title}</p>
        </div>
    </div>
);

export const Carousel = ({ defaultItems }) =>
{
    const [activeIndex, setActiveIndex] = useState(0);
    const [items, setItems] = useState([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(null);

    useEffect(() =>
    {
        setItems(defaultItems.map((item, index) => ({ ...item, id: index })));
    }, []);

    useEffect(() =>
    {
        let interval;
        if (isAutoPlaying)
        {
            interval = setInterval(() =>
            {
                handleNext();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, activeIndex]);

    const handleNext = useCallback(() =>
    {
        setActiveIndex((current) => (current + 1) % items.length);
    }, [items.length]);

    const handlePrev = useCallback(() =>
    {
        setActiveIndex((current) => (current - 1 + items.length) % items.length);
    }, [items.length]);

    const handleKeyDown = useCallback((e) =>
    {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
    }, [handleNext, handlePrev]);

    const handleTouchStart = (e) =>
    {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) =>
    {
        if (!touchStart) return;

        const currentTouch = e.touches[0].clientX;
        const diff = touchStart - currentTouch;

        if (Math.abs(diff) > 50)
        {
            if (diff > 0)
            {
                handleNext();
            } else
            {
                handlePrev();
            }
            setTouchStart(null);
        }
    };

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    return (
        <div
            className="relative w-full max-w-4xl mx-auto px-4 py-8"
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            tabIndex="0"
            role="region"
            aria-label="Image carousel"
        >
            <div className="overflow-hidden relative">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="w-full flex-shrink-0 px-4"
                            aria-hidden={index !== activeIndex}
                        >
                            <CarouselCard
                                thumbnail={item.thumbnail}
                                title={item.title}
                                isActive={index === activeIndex}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Previous slide"
                >
                    ← {/* Simple arrow instead of Lucide icon */}
                </button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                    onClick={handleNext}
                    className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Next slide"
                >
                    → {/* Simple arrow instead of Lucide icon */}
                </button>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {items.slice(0,6).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === activeIndex}
                    />
                ))}
            </div>
        </div>
    );
};

