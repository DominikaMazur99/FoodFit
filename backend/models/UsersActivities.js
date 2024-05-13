const { Schema, model } = require("mongoose");

const UsersActivitiesSchema = new Schema(
    {
        calories: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        activityId: {
            type: String,
        },
    },
    { collection: false }
);

const UserActivity = model("user-activities", UsersActivitiesSchema);
module.exports = { UsersActivitiesSchema, UserActivityModel: UserActivity };
