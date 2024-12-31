import React, { useState, useEffect } from 'react';
import { luckyMessages } from './messages';
import { Animations } from "./components/animations/NaturalSnow";
import NewYearAnimation from './components/animations/NewYearAnimation';

const Farewell2024 = () => {
    const [showSparkles, setShowSparkles] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isNewYear, setIsNewYear] = useState(false);
    const [newYearMessage, setNewYearMessage] = useState('');
    const [currentMessage, setCurrentMessage] = useState('');

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
                    setIsNewYear(true);
                }

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsNewYear(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleReveal = () => {
        if (!isMessageVisible && !isNewYear) {
            setShowSparkles(true);
            const randomMessage = luckyMessages[Math.floor(Math.random() * luckyMessages.length)];
            setCurrentMessage(randomMessage);

            setTimeout(() => {
                setIsMessageVisible(true);
                setShowSparkles(false);
            }, 700);
        }
    };

    const handleNewYearAnimationComplete = (message) => {
        setNewYearMessage(message);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            {/* 기본 애니메이션 */}
            <Animations showSparkles={showSparkles} />

            {/* 새해 애니메이션 */}
            {isNewYear && (
                <NewYearAnimation
                    onAnimationComplete={handleNewYearAnimationComplete}
                />
            )}

            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-12 relative z-10">
                {/* 헤더 */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-4 tracking-tight drop-shadow-lg animate-gradient">
                        {isNewYear ? 'HAPPY 2025!' : 'FAREWELL 2024'}
                    </h1>
                    <p className="text-lg md:text-xl text-amber-200/80 font-medium">
                        {isNewYear ? '새로운 시작을 축하합니다!' : '마지막까지 특별한 순간을 함께해요'}
                    </p>
                </div>

                {/* 타이머 */}
                {!isNewYear && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 w-full max-w-4xl px-4">
                        {[
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours.toString().padStart(2, '0') },
                            { label: "Minutes", value: timeLeft.minutes.toString().padStart(2, '0') },
                            { label: "Seconds", value: timeLeft.seconds.toString().padStart(2, '0') }
                        ].map(item => (
                            <div key={item.label} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 blur-xl rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                                <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 md:p-8 text-center transform transition-all duration-300 border border-amber-200/10 shadow-lg hover:shadow-amber-200/5">
                                    <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent mb-2 transition-all group-hover:scale-110">
                                        {item.value}
                                    </div>
                                    <div className="text-xs md:text-sm text-amber-200/60 uppercase tracking-wider font-medium">
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 메시지 카드 */}
                <div
                    onClick={handleReveal}
                    className={`
                        w-full max-w-lg transition-all duration-700 ease-out relative group cursor-pointer
                        ${isMessageVisible
                        ? 'bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-2xl p-8 shadow-xl'
                        : 'bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 border border-amber-200/10'
                    }
                    `}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {!isMessageVisible ? (
                        <div className="text-center transition-all duration-500 relative z-10">
                            <div className="text-4xl mb-4 animate-bounce">✨</div>
                            <p className="text-amber-200 text-lg font-medium">
                                클릭하여 오늘의 메시지 확인하기
                            </p>
                        </div>
                    ) : (
                        <div className="transform transition-all duration-700 ease-out relative z-10">
                            <p className="text-xl md:text-2xl text-center leading-relaxed text-gray-800">
                                {isNewYear ? newYearMessage : currentMessage}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Farewell2024;