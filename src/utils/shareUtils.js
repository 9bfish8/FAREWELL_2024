// TinyURL API를 사용한 링크 단축 함수
export const shortenUrl = async (longUrl) => {
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
        if (!response.ok) throw new Error('Failed to shorten URL');
        return await response.text();
    } catch (error) {
        console.error('Error shortening URL:', error);
        return longUrl; // 실패시 원본 URL 반환
    }
};

// 공유 메시지 생성 함수
export const createShareMessage = (to, from, template) => {
    const emoji = {
        classic: '🎄',
        snow: '❄️',
        golden: '✨'
    }[template];

    return `${emoji} ${to}님께\n${from}님이 크리스마스 카드를 보냈습니다!\n\n아래 링크를 눌러 카드를 확인해보세요:`;
};