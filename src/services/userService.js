const User = require("../models/user");

/**
 * Create or update user in DB
 * @param {Object} userData - { telegramId, name, surname, username, language }
 * @returns {Promise<User>} - returns the saved or updated user document
 */
async function saveUser(userData) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { telegramId: userData.telegramId }, // filter by Telegram ID
            { $set: userData },                  // update fields
            { upsert: true, new: true }         // create if not exists, return updated doc
        );
        return updatedUser;
    } catch (err) {
        console.error("Error saving user:", err);
        throw err;
    }
}

/**
 * Get user by Telegram ID
 * @param {Number} telegramId
 * @returns {Promise<User|null>}
 */
async function getUserById(telegramId) {
    try {
        return await User.findOne({ telegramId });
    } catch (err) {
        console.error("Error getting user by ID:", err);
        throw err;
    }
}

/**
 * Set user state flags
 * @param {Number} telegramId
 * @param {Object} state - { isSearching, isInChat, partnerId, banned }
 * @returns {Promise<User>}
 */
async function updateUserState(telegramId, state) {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { telegramId },
            { $set: state },
            { new: true }
        );
        return updatedUser;
    } catch (err) {
        console.error("Error updating user state:", err);
        throw err;
    }
}

/**
 * Ban a user
 * @param {Number} telegramId
 * @returns {Promise<User>}
 */
async function banUser(telegramId) {
    return await updateUserState(telegramId, { banned: true });
}

/**
 * Unban a user
 * @param {Number} telegramId
 * @returns {Promise<User>}
 */
async function unbanUser(telegramId) {
    return await updateUserState(telegramId, { banned: false });
}

/**
 * Mark user as searching for partner
 * @param {Number} telegramId
 * @returns {Promise<User>}
 */
async function markSearching(telegramId) {
    return await updateUserState(telegramId, { isSearching: true });
}

/**
 * Mark user as in active chat
 * @param {Number} telegramId
 * @param {Number|null} partnerId
 * @returns {Promise<User>}
 */
async function markInChat(telegramId, partnerId) {
    return await updateUserState(telegramId, {
        isSearching: false,
        isInChat: true,
        partnerId
    });
}

/**
 * Mark user as not in chat
 * @param {Number} telegramId
 * @returns {Promise<User>}
 */
async function markNotInChat(telegramId) {
    return await updateUserState(telegramId, {
        isSearching: false,
        isInChat: false,
        partnerId: null
    });
}

module.exports = {
    saveUser,
    getUserById,
    updateUserState,
    banUser,
    unbanUser,
    markSearching,
    markInChat,
    markNotInChat
};