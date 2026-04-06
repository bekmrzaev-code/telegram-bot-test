const queue = [];

const addToQueue = (userId) => {
    if (!queue.includes(userId)) {
        queue.push(userId);
    }
};

const removeFromQueue = (userId) => {
    const index = queue.indexOf(userId);
    if (index !== -1) queue.splice(index, 1);
};

const getMatch = () => {
    if (queue.length >= 2) {
        const user1 = queue.shift();
        const user2 = queue.shift();
        return [user1, user2];
    }
    return null;
};

module.exports = {
    addToQueue,
    removeFromQueue,
    getMatch,
    queue
};