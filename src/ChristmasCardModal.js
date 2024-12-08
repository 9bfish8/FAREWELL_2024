import React, { useState, useEffect } from 'react';
import { Share2, X, Check } from 'lucide-react';

const CARD_TEMPLATES = {
    classic: {
        id: 'classic',
        name: '🎄',
        bgClass: 'bg-gradient-to-br from-red-100 to-green-100',
        textClass: 'text-red-600',
        buttonClass: 'bg-red-600 hover:bg-red-700',
        icon: '🎄',
        openAnimation: 'animate-tree-reveal',
        receiveAnimation: 'animate-tree-receive'
    },
    snow: {
        id: 'snow',
        name: '❄️',
        bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100',
        textClass: 'text-blue-600',
        buttonClass: 'bg-blue-600 hover:bg-blue-700',
        icon: '❄️',
        openAnimation: 'animate-snow-reveal',
        receiveAnimation: 'animate-snow-receive'
    },
    golden: {
        id: 'golden',
        name: '✨',
        bgClass: 'bg-gradient-to-br from-amber-50 to-yellow-100',
        textClass: 'text-amber-600',
        buttonClass: 'bg-amber-600 hover:bg-amber-700',
        icon: '✨',
        openAnimation: 'animate-sparkle-reveal',
        receiveAnimation: 'animate-sparkle-receive'
    },
};

const ChristmasCardModal = ({
                                cardState,
                                handleCardInput,
                                handleKakaoShare,
                                shareCard,
                                handleCopyLink,
                                onClose
                            }) => {
    const [isReadMode, setIsReadMode] = useState(false);
    const [isShared, setIsShared] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('card')) {
            setIsReadMode(true);
        }
    }, []);

    const template = CARD_TEMPLATES[cardState.template];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (cardState.to && cardState.message && cardState.from) {
            await shareCard();
            setIsShared(true);
            setShowSuccessModal(true);
        }
    };

    const handleOpenCard = () => {
        setIsOpened(true);
    };

    if (showSuccessModal) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
                <div className="bg-white p-6 rounded-2xl w-full max-w-md relative z-10 shadow-xl text-center">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">카드가 전송되었습니다!</h3>
                    <p className="text-gray-600 mb-4">
                        받는 분에게 링크가 전달되었습니다.
                        카드를 확인하면 특별한 애니메이션과 함께
                        메시지가 공개됩니다.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                    >
                        확인
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={!isReadMode ? onClose : undefined}
            />
            <div
                className={`${template.bgClass} p-6 rounded-2xl w-full max-w-md relative z-10 shadow-xl`}
                onClick={(e) => e.stopPropagation()}
            >
                {!isReadMode && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                )}

                {isReadMode ? (
                    <div className={`space-y-4 ${isOpened ? 'animate-fade-in' : ''}`}>
                        <div className={`text-center ${!isOpened ? template.receiveAnimation : ''}`}>
                            <div className="text-4xl mb-2">{template.icon}</div>
                            <h3 className={`text-2xl font-bold ${template.textClass}`}>
                                {cardState.to}님께
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                From. {cardState.from}
                            </p>
                        </div>

                        {!isOpened ? (
                            <button
                                onClick={handleOpenCard}
                                className={`w-full ${template.buttonClass} text-white py-3 rounded-lg mt-4 transition-colors`}
                            >
                                카드 열어보기
                            </button>
                        ) : (
                            <div className={`bg-white/80 p-4 rounded-lg ${template.openAnimation}`}>
                                <p className="text-gray-800 whitespace-pre-line">
                                    {cardState.message}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className={`text-2xl font-bold ${template.textClass} text-center`}>
                            크리스마스 카드 보내기
                        </h3>

                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {Object.values(CARD_TEMPLATES).map((tmpl) => (
                                <button
                                    key={tmpl.id}
                                    type="button"
                                    onClick={() => handleCardInput('template', tmpl.id)}
                                    className={`p-3 rounded-lg border-2 transition-all ${
                                        cardState.template === tmpl.id
                                            ? 'border-black/20 scale-95 shadow-inner'
                                            : 'border-transparent hover:border-black/10'
                                    } ${tmpl.bgClass}`}
                                >
                                    <div className="text-2xl mb-1">{tmpl.icon}</div>
                                    <div className="text-xs font-medium">{tmpl.name}</div>
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">받는 사람</label>
                            <input
                                type="text"
                                value={cardState.to}
                                onChange={(e) => handleCardInput('to', e.target.value)}
                                className="w-full p-2 rounded border bg-white/50 focus:outline-none focus:ring-2 focus:ring-black/20"
                                placeholder="받는 분 이름을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">메시지</label>
                            <textarea
                                value={cardState.message}
                                onChange={(e) => handleCardInput('message', e.target.value)}
                                className="w-full h-32 p-2 rounded border bg-white/50 focus:outline-none focus:ring-2 focus:ring-black/20"
                                placeholder="전하고 싶은 메시지를 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">보내는 사람</label>
                            <input
                                type="text"
                                value={cardState.from}
                                onChange={(e) => handleCardInput('from', e.target.value)}
                                className="w-full p-2 rounded border bg-white/50 focus:outline-none focus:ring-2 focus:ring-black/20"
                                placeholder="보내는 분 이름을 입력하세요"
                            />
                        </div>
                        {/* 폼의 마지막 버튼 부분을 이렇게 수정 */}
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => {
                                    handleKakaoShare();
                                    setShowSuccessModal(true);
                                }}
                                disabled={!cardState.to || !cardState.message || !cardState.from}
                                className="w-full bg-[#FEE500] hover:bg-[#FDD835] disabled:bg-gray-400 disabled:hover:bg-gray-400 text-[#391B1B] py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                            >
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M12 3C6.48 3 2 6.48 2 12c0 3.96 2.88 7.24 6.67 7.85v-5.51H6.75V12h1.92V9.85c0-1.89 1.13-2.94 2.86-2.94.82 0 1.68.15 1.68.15v1.84h-.95c-.93 0-1.22.58-1.22 1.17V12h2.08l-.33 2.34h-1.75v5.51C19.12 19.24 22 15.96 22 12c0-5.52-4.48-10-10-10z"/>
                                </svg>
                                카카오톡으로 공유하기
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleCopyLink();
                                    setShowSuccessModal(true);
                                }}
                                disabled={!cardState.to || !cardState.message || !cardState.from}
                                className={`w-full ${template.buttonClass} disabled:bg-gray-400 text-white py-2 rounded-lg flex items-center justify-center gap-2`}
                            >
                                <Share2 className="w-5 h-5"/>
                                링크 복사하기
                            </button>
                        </div>
                    </form>
                )}
            </div>
            <style jsx>{`
                @keyframes tree-reveal {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                @keyframes snow-reveal {
                    0% { transform: translateY(-20px); opacity: 0; }
                    50% { transform: translateY(10px); }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes sparkle-reveal {
                    0% { transform: rotate(-180deg) scale(0); opacity: 0; }
                    50% { transform: rotate(20deg) scale(1.2); }
                    100% { transform: rotate(0) scale(1); opacity: 1; }
                }

                @keyframes tree-receive {
                    0% { transform: translateY(50px) rotate(-10deg); opacity: 0; }
                    60% { transform: translateY(-20px) rotate(5deg); opacity: 1; }
                    80% { transform: translateY(10px) rotate(-3deg); }
                    100% { transform: translateY(0) rotate(0); }
                }
                
                @keyframes snow-receive {
                    0% { transform: translateY(-50px) scale(0.8); opacity: 0; }
                    50% { transform: translateY(20px) scale(1.1); opacity: 0.5; }
                    75% { transform: translateY(-10px) scale(0.95); opacity: 0.8; }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                }
                
                @keyframes sparkle-receive {
                    0% { transform: scale(0) rotate(180deg); opacity: 0; filter: blur(10px); }
                    60% { transform: scale(1.2) rotate(-20deg); opacity: 0.8; filter: blur(0); }
                    100% { transform: scale(1) rotate(0); opacity: 1; }
                }
                
                .animate-tree-reveal {
                    animation: tree-reveal 1s ease-out forwards;
                }
                
                .animate-snow-reveal {
                    animation: snow-reveal 1s ease-out forwards;
                }
                
                .animate-sparkle-reveal {
                    animation: sparkle-reveal 1s ease-out forwards;
                }
                
                .animate-tree-receive {
                    animation: tree-receive 1.2s ease-out forwards;
                }
                
                .animate-snow-receive {
                    animation: snow-receive 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
                }
                
                .animate-sparkle-receive {
                    animation: sparkle-receive 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ChristmasCardModal;