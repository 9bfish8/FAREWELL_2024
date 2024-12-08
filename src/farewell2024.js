import React, { useState, useEffect } from 'react';
import { Gift } from 'lucide-react';
import { luckyMessages, newYearMessages } from './messages';
import ChristmasCardModal from './ChristmasCardModal';
import {Animations} from "./components/animations/NaturalSnow";

const Farewell2024 = () => {
    const [showSparkles, setShowSparkles] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [hasCheckedToday, setHasCheckedToday] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [cardState, setCardState] = useState({
        showModal: false,
        to: '',
        message: '',
        from: '',
        template: 'classic'
    });

    // URL 파라미터 초기화
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('card')) {
            const cardData = {
                to: params.get('to') || '',
                message: params.get('message') ? decodeURIComponent(params.get('message')) : '',
                from: params.get('from') || '',
                template: params.get('template') || 'classic'
            };
            if (cardData.message) {
                setCardState(prev => ({ ...prev, ...cardData, showModal: true }));
            }
        }
    }, []);

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
                    setShowFireworks(true);
                }

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setShowFireworks(true);
                handleNewYear();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleNewYear = () => {
        setShowSparkles(true);
        setTimeout(() => {
            setIsMessageVisible(true);
        }, 3000);
    };

    const handleReveal = () => {
        if (!isMessageVisible && !showFireworks && !showSparkles && !hasCheckedToday) {
            setShowSparkles(true);
            const randomMessage = luckyMessages[Math.floor(Math.random() * luckyMessages.length)];

            localStorage.setItem('lastCheckedDate', new Date().toLocaleDateString());
            localStorage.setItem('todayMessage', randomMessage);

            setHasCheckedToday(true);
            setTimeout(() => {
                setIsMessageVisible(true);
                setShowSparkles(false);
            }, 700);
        }
    };

    const shareCard = async () => {
        const params = new URLSearchParams({
            card: 'true',
            to: cardState.to,
            message: encodeURIComponent(cardState.message),
            from: cardState.from,
            template: cardState.template
        });

        const shareData = {
            title: '2024 크리스마스 카드',
            text: `${cardState.to}님께 크리스마스 카드가 도착했습니다!`,
            url: `${window.location.origin}${window.location.pathname}?${params.toString()}`
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                alert('링크가 복사되었습니다!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    const handleCardInput = (field, value) => {
        setCardState(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            <Animations
                showSparkles={showSparkles}
                showFireworks={showFireworks}
            />

            <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center py-12 relative z-10">
                {/* 헤더 */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-4 tracking-tight drop-shadow-lg animate-gradient">
                        FAREWELL 2024
                    </h1>
                    <p className="text-lg md:text-xl text-amber-200/80 font-medium">
                        마지막까지 특별한 순간을 함께해요
                    </p>
                    <p className="text-sm text-amber-200/60 mt-2 tracking-wide">
                        * 매일 00시에 새로운 메시지를 확인할 수 있습니다
                    </p>
                </div>

                {/* 타이머 */}
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

                {/* 크리스마스 카드 버튼 */}
                <button
                    onClick={() => handleCardInput('showModal', true)}
                    className="mb-12 relative group overflow-hidden rounded-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-green-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative px-8 py-4 flex items-center gap-3 text-white font-medium">
                        <Gift className="w-5 h-5 animate-bounce" />
                        <span className="tracking-wide">크리스마스 카드 보내기</span>
                    </div>
                    <div className="absolute inset-0 border-2 border-white/20 rounded-full transform scale-110 group-hover:scale-105 transition-transform duration-300" />
                </button>

                {/* 메시지 카드 */}
                <div
                    onClick={handleReveal}
                    className={`
                        w-full max-w-lg transition-all duration-700 ease-out relative group
                        ${hasCheckedToday && !isMessageVisible ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                        ${isMessageVisible
                        ? 'bg-gradient-to-br from-amber-50 to-amber-100/90 rounded-2xl p-8 shadow-xl'
                        : 'bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 border border-amber-200/10'
                    }
                    `}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* 카드 테두리 장식 */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-amber-200/30 rounded-tl-lg" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-amber-200/30 rounded-tr-lg" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-amber-200/30 rounded-bl-lg" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-amber-200/30 rounded-br-lg" />

                    {!isMessageVisible ? (
                        <div className="text-center transition-all duration-500 relative z-10">
                            <div className="text-4xl mb-4 animate-bounce">✨</div>
                            <p className="text-amber-200 text-lg font-medium">
                                {hasCheckedToday
                                    ? "오늘의 메시지를 이미 확인하셨습니다"
                                    : "클릭하여 오늘의 메시지 확인하기"}
                            </p>
                        </div>
                    ) : (
                        <div className="transform transition-all duration-700 ease-out relative z-10">
                            <p className="text-xl md:text-2xl text-center leading-relaxed text-gray-800">
                                {localStorage.getItem('todayMessage')}
                            </p>
                        </div>
                    )}
                </div>

                {/* 푸터 */}
                <div className="mt-12 text-center">
                    <p className="text-amber-200/60 text-sm">
                        2024년의 마지막 순간까지 ✨
                    </p>
                </div>
            </div>

            {/* 크리스마스 카드 모달 */}
            {cardState.showModal && (
                <ChristmasCardModal
                    cardState={cardState}
                    handleCardInput={handleCardInput}
                    shareCard={shareCard}
                    onClose={() => handleCardInput('showModal', false)}
                />
            )}
        </div>
    );
};

export default Farewell2024;