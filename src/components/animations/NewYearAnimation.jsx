import React, { useEffect, useState } from 'react';
import { newYearMessages, inspirationalSongs } from '../../messages';
import './animations.css';

const NewYearAnimation = ({ onAnimationComplete }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showFireworks, setShowFireworks] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);
    const [message, setMessage] = useState('');
    const [song, setSong] = useState('');
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const randomMessage = newYearMessages[Math.floor(Math.random() * newYearMessages.length)];
        const randomSong = inspirationalSongs[Math.floor(Math.random() * inspirationalSongs.length)];

        const startSequence = () => {
            setShowOverlay(true);
            setShowFireworks(true);

            setTimeout(() => {
                setShowSparkles(true);
                // 메시지와 노래를 상태에 저장하지만 아직 보여주지는 않음
                setMessage(randomMessage);
                setSong(randomSong);
            }, 500);

            // 10초 후에 폭죽과 반짝임 효과 제거
            setTimeout(() => {
                setShowFireworks(false);
                setShowSparkles(false);
            }, 10000);
        };

        startSequence();
    }, []);

    const handleReveal = () => {
        if (!isRevealed) {
            setShowSparkles(true);
            setIsRevealed(true);
            if (onAnimationComplete) {
                onAnimationComplete(message);
            }

            setTimeout(() => {
                setShowSparkles(false);
            }, 1000);
        }
    };

    return (
        <div className="relative">
            {/* 메시지 오버레이 */}
            <div
                className={`fixed inset-0 z-40 flex items-center justify-center transition-all duration-1000 overlay-fade
                ${showOverlay ? 'bg-black/70' : 'bg-transparent'}`}
            >
                <div
                    onClick={handleReveal}
                    className={`
                        max-w-4xl mx-auto text-center transform transition-all duration-1000 message-container
                        ${!isRevealed ? 'cursor-pointer hover:scale-105' : ''}
                    `}
                >
                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 animate-rainbow-text mb-8 drop-shadow-2xl">
                        HAPPY 2025!
                    </h1>

                    {!isRevealed ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4 animate-bounce">✨</div>
                            <p className="text-white text-xl font-medium">
                                클릭하여 새해 메시지와 추천곡 확인하기
                            </p>
                        </div>
                    ) : (
                        <>
                            <p className="text-2xl md:text-4xl text-white mb-8 leading-relaxed font-medium drop-shadow-lg">
                                {message}
                            </p>

                            {song && (
                                <div className="mt-12 text-center animate-bounce-in">
                                    <div className="inline-block p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                                        <p className="text-xl text-amber-200 mb-2">새해 추천곡 🎵</p>
                                        <p className="text-2xl text-white font-medium">
                                            {song}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* 애니메이션 효과 */}
            <div className="fixed inset-0 pointer-events-none z-[60]">
                {showFireworks && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={`firework-${i}`}
                                className="firework"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    '--hue': `${Math.random() * 360}`
                                }}
                            >
                                <div className="firework-particles" />
                            </div>
                        ))}
                    </div>
                )}

                {showSparkles && (
                    <div className="absolute inset-0">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <div
                                key={`sparkle-${i}`}
                                className="sparkle"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewYearAnimation;