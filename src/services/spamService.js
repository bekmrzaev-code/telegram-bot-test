const messageMap = new Map();

const isSpam = (userId) => {
    const now = Date.now();

    if (!messageMap.has(userId)) {
        messageMap.set(userId, []);
    }

    const timestamps = messageMap.get(userId);
    timestamps.push(now);

    // Keep last 5 sec  
    const filtered = timestamps.filter(t => now - t < 5000);
    messageMap.set(userId, filtered);

    return filtered.length > 10;
};

module.exports = { isSpam };