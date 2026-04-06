const User = require("../models/user")

const connectUsers = async (user1Id, user2Id) => {
    await User.updateOne({ telegramId: user1Id }, {
        isInChat: true,
        isSearching: false,
        partnerId: user2Id
    });

    await User.updateOne({ telegramId: user2Id }, {
        isInChat: true,
        isSearching: false,
        partnerId: user1Id
    });
};

const disconnectUser = async (userId) => {
    const user = await User.findOne({ telegramId: userId });
    if (!user || !user.partnerId) return null;

    const partnerId = user.partnerId;

    await User.updateOne({ telegramId: userId }, {
        isInChat: false,
        partnerId: null
    });

    await User.updateOne({ telegramId: partnerId }, {
        isInChat: false,
        partnerId: null
    });

    return partnerId;
};

module.exports = {
    connectUsers,
    disconnectUser
};