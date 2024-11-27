import React, { useState, useEffect } from 'react';
import { luckyMessages, newYearMessages } from './messages';

const Farewell2024 = () => {
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isNewYear, setIsNewYear] = useState(false);
    const [showCountdown, setShowCountdown] = useState(false);
    const [hasCheckedToday, setHasCheckedToday] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // localStorage 체크
    useEffect(() => {
        const today = new Date().toLocaleDateString();
        const lastChecked = localStorage.getItem('lastCheckedDate');

        if (lastChecked === today) {
            setHasCheckedToday(true);
            const savedMessage = localStorage.getItem('todayMessage');
            if (savedMessage) {
                setIsMessageVisible(true);
            }
        }
    }, []);

    // 타이머 설정
    useEffect(() => {
        const timer = setInterval(() => {
            const endDate = new Date('2024-12-31T23:59:59');
            const now = new Date();
            const difference = endDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                if (days === 0 && hours === 0 && minutes === 0) {
                    setShowCountdown(true);
                }

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsNewYear(true);
                handleNewYear();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleNewYear = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsMessageVisible(true);
        }, 3000);
    };

    const getNewYearMessage = () => {
        return newYearMessages[Math.floor(Math.random() * newYearMessages.length)];
    };

    const handleReveal = () => {
        if (!isMessageVisible && !isNewYear && !isAnimating && !hasCheckedToday) {
            setIsAnimating(true);
            const randomMessage = luckyMessages[Math.floor(Math.random() * luckyMessages.length)];

            localStorage.setItem('lastCheckedDate', new Date().toLocaleDateString());
            localStorage.setItem('todayMessage', randomMessage);

            setHasCheckedToday(true);
            setTimeout(() => {
                setIsMessageVisible(true);
            }, 700);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
            {/* 눈 내리는 효과 */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-snow"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-10px`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.5
                        }}
                    >
                        ❄️
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-12 relative z-10">
                {/* 헤더 */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 mb-4 tracking-tight drop-shadow-lg">
                        FAREWELL 2024
                    </h1>
                    <p className="text-lg text-amber-200/80">마지막까지 특별한 순간을 함께해요</p>
                    <p className="text-sm text-amber-200/60 mt-2">
                        * 매일 00시에 새로운 메시지를 확인할 수 있습니다
                    </p>
                </div>

                {/* 타이머 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 w-full max-w-3xl">
                    {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours.toString().padStart(2, '0') },
                        { label: "Minutes", value: timeLeft.minutes.toString().padStart(2, '0') },
                        { label: "Seconds", value: timeLeft.seconds.toString().padStart(2, '0') }
                    ].map((item, index) => (
                        <div
                            key={item.label}
                            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 active:scale-95 border border-amber-200/10 shadow-lg"
                            style={{ animation: `fade-in 0.5s ease-out ${index * 0.1}s` }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-amber-200 mb-2">
                                {item.value}
                            </div>
                            <div className="text-sm text-amber-200/60 uppercase tracking-wider">{item.label}</div>
                        </div>
                    ))}
                </div>

                {/* 메시지 카드 */}
                <div
                    onClick={handleReveal}
                    className={`
                        w-full max-w-lg transition-all duration-700 ease-out relative
                        ${hasCheckedToday && !isMessageVisible ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                        ${isMessageVisible
                        ? 'bg-gradient-to-br from-amber-100 to-white rounded-2xl p-8 shadow-xl translate-y-0 opacity-100'
                        : 'bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:scale-102 active:scale-98 border border-amber-200/10'
                    }
                        ${isAnimating && !isMessageVisible ? 'translate-y-8 opacity-0' : ''}
                    `}
                >
                    {/* 카드 장식 효과 */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-amber-200/30 rounded-tl-lg" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-amber-200/30 rounded-tr-lg" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-amber-200/30 rounded-bl-lg" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-amber-200/30 rounded-br-lg" />

                    {!isMessageVisible ? (
                        <div className="text-center transition-all duration-500">
                            <div className="text-4xl mb-4 animate-bounce">✨</div>
                            <p className="text-amber-200 text-lg">
                                {hasCheckedToday
                                    ? "오늘의 메시지를 이미 확인하셨습니다"
                                    : "클릭하여 오늘의 메시지 확인하기"}
                            </p>
                        </div>
                    ) : (
                        <div className="transform transition-all duration-700 ease-out">
                            <p className="text-xl md:text-2xl text-center leading-relaxed text-gray-800">
                                {localStorage.getItem('todayMessage')}
                            </p>
                        </div>
                    )}
                </div>

                {/* 카운트다운 오버레이 */}
                {showCountdown && !isNewYear && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
                        <div className="text-8xl font-bold text-amber-200 animate-pulse">
                            {timeLeft.seconds}
                        </div>
                    </div>
                )}

                {/* 새해 오버레이 */}
                {isNewYear && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
                        <div className="text-center px-4">
                            <h2 className="text-4xl md:text-6xl font-bold text-amber-200 mb-8 animate-bounce">
                                Happy New Year 2025! 🎊
                            </h2>
                            <p className="text-xl md:text-2xl text-amber-200">
                                {getNewYearMessage()}
                            </p>
                        </div>
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
                    </div>
                )}

                {/* 스파클 효과 */}
                {isAnimating && !isNewYear && (
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
                )}

                {/* 푸터 */}
                <div className="mt-12 text-center">
                    <p className="text-amber-200/60 text-sm">
                        2024년의 마지막 순간까지 ✨
                    </p>
                </div>
            </div>

            <style jsx global>{`
                @keyframes snow {
                    0% {
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                    }
                }

                .animate-snow {
                    animation: snow 10s linear infinite;
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

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .hover\:scale-102:hover {
                    transform: scale(1.02);
                }

                .active\:scale-98:active {
                    transform: scale(0.98);
                }

                @media (hover: none) {
                    .hover\:scale-102:active {
                        transform: scale(1.02);
                    }
                }
            `}</style>
        </div>
    );
};

export default Farewell2024;