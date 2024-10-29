import User from "../models/user.js";
import Conversation from "../models/conversation.js";

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        // not sending the logged in user in the list of users
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in getting users: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const conversations = await Conversation.find({
            participants: { $in: [loggedInUserId]}
        }).populate('participants') // populate with required fields from User schema

        const filteredConversations = conversations.map(conversation => {
            const receiver = conversation.participants.filter(participant => participant._id.toString() !== loggedInUserId.toString());
            return {
                _id: receiver.map(participant => participant._id)[0],
                fullName: receiver.map(participant => participant.fullName)[0],
                username: receiver.map(participant => participant.username)[0],
                gender: receiver.map(participant => participant.gender)[0],
                profilePic: receiver.map(participant => participant.profilePic)[0]
            };

        });
        res.status(200).json(filteredConversations);
        return filteredConversations;
    } catch (error) {
        console.error('Error retrieving conversations:', error);
        throw error;
    }
}