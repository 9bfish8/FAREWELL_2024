// src/components/animations/NaturalSnow.jsx
import React, { useState, useEffect } from 'react';

export const NaturalSnow = () => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const createSnowflake = () => ({
            id: Math.random(),
            left: Math.random() * 100,
            size: Math.random() * 12 + 8,
            duration: Math.random() * 5 + 10,
            delay: Math.random() * -20,
        });

        const addSnowflake = () => {
            setSnowflakes(prev => [...prev, createSnowflake()]);
            if (snowflakes.length > 50) {
                setSnowflakes(prev => prev.slice(1));
            }
        };

        const interval = setInterval(addSnowflake, 200);
        return () => clearInterval(interval);
    }, [snowflakes.length]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {snowflakes.map(flake => (
                <div
                    key={flake.id}
                    className="absolute text-white animate-snowfall"
                    style={{
                        left: `${flake.left}%`,
                        fontSize: `${flake.size}px`,
                        animationDuration: `${flake.duration}s`,
                        animationDelay: `${flake.delay}s`,
                    }}
                >
                    ❄️
                </div>
            ))}
        </div>
    );
};

// src/components/animations/SparkleEffect.jsx
export const SparkleEffect = () => {
    return (
        <div className="fixed inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-sparkle"
                    style={{
                        '--tx': `${(Math.random() - 0.5) * 100}px`,
                        '--ty': `${(Math.random() - 0.5) * 100}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                >
                    ✨
                </div>
            ))}
        </div>
    );
};

// src/components/animations/FireworkEffect.jsx
export const FireworkEffect = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-firework"
                    style={{
                        '--tx': `${(Math.random() - 0.5) * 200}px`,
                        '--ty': `${-Math.random() * 200}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                >
                    🎆
                </div>
            ))}
        </div>
    );
};

// src/styles/animations.css
export const animationStyles = `
    @keyframes snowfall {
        0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes sparkle {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--tx) * 2), calc(var(--ty) * 2)) scale(0);
            opacity: 0;
        }
    }

    @keyframes firework {
        0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 0.8;
        }
        100% {
            transform: translate(var(--tx), calc(var(--ty) * 2)) scale(0);
            opacity: 0;
        }
    }

    .animate-snowfall {
        animation: snowfall linear forwards;
        will-change: transform;
    }

    .animate-sparkle {
        animation: sparkle 1s ease-in-out forwards;
        will-change: transform, opacity;
    }

    .animate-firework {
        animation: firework 2s ease-out forwards;
        will-change: transform, opacity;
    }
`;

// 메인 컴포넌트에서 사용 예시:
export const Animations = ({ showSparkles, showFireworks }) => {
    return (
        <>
            <NaturalSnow />
            {showSparkles && <SparkleEffect />}
            {showFireworks && <FireworkEffect />}
            <style jsx global>
                {animationStyles}
            </style>
        </>
    );
};