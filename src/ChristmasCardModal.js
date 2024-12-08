import React, { useState } from 'react';
import { Share2, X } from 'lucide-react';

const CARD_TEMPLATES = {
    classic: {
        id: 'classic',
        name: '클래식',
        bgClass: 'bg-gradient-to-br from-red-100 to-green-100',
        textClass: 'text-red-600',
        buttonClass: 'bg-red-600 hover:bg-red-700',
        icon: '🎄'
    },
    snow: {
        id: 'snow',
        name: '스노우',
        bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100',
        textClass: 'text-blue-600',
        buttonClass: 'bg-blue-600 hover:bg-blue-700',
        icon: '❄️'
    },
    golden: {
        id: 'golden',
        name: '골드',
        bgClass: 'bg-gradient-to-br from-amber-50 to-yellow-100',
        textClass: 'text-amber-600',
        buttonClass: 'bg-amber-600 hover:bg-amber-700',
        icon: '✨'
    },
};

const ChristmasCardModal = ({ cardState, handleCardInput, shareCard, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('classic');

    const template = CARD_TEMPLATES[selectedTemplate];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardState.to && cardState.message && cardState.from) {
            shareCard(selectedTemplate);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />
            <div
                className={`${template.bgClass} p-6 rounded-2xl w-full max-w-md relative z-10 shadow-xl`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-600 hover:text-gray-800"
                >
                    <X className="w-6 h-6" />
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className={`text-2xl font-bold ${template.textClass} text-center`}>
                        크리스마스 카드 보내기
                    </h3>

                    {/* 템플릿 선택 */}
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
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">메시지</label>
                        <textarea
                            value={cardState.message}
                            onChange={(e) => handleCardInput('message', e.target.value)}
                            className="w-full h-32 p-2 rounded border bg-white/50 focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">보내는 사람</label>
                        <input
                            type="text"
                            value={cardState.from}
                            onChange={(e) => handleCardInput('from', e.target.value)}
                            className="w-full p-2 rounded border bg-white/50 focus:outline-none focus:ring-2 focus:ring-black/20"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!cardState.to || !cardState.message || !cardState.from}
                        className={`w-full ${template.buttonClass} disabled:bg-gray-400 text-white py-2 rounded-lg flex items-center justify-center gap-2`}
                    >
                        <Share2 className="w-5 h-5"/>
                        카드 공유하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChristmasCardModal;