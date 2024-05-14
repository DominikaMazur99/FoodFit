const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

// post /api/activities
router.get('/', async (req, res) => {
    const { userName, date } = req.query;

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ data: 'uztykownik nie istnieje' });
        }

        console.log('DATE', date);

        let matchingActivities;
        if (date) {
            matchingActivities = user.activities.filter((activity) => {
                return (
                    new Date(activity.date).toDateString() ===
                    new Date(date).toDateString()
                );
            });
        } else {
            matchingActivities = user.activities;
        }

        console.log('matchingActivities', matchingActivities);

        res.status(201).json({ activities: matchingActivities });
    } catch (error) {
        console.error('Error post activities:', error);
        res.status(500).json({
            error: 'An error occurred while fetching activities',
        });
    }
});

router.post('/', async (req, res) => {
    console.log('Body', req.body);
    const { userName, ...activity } = req.body;

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ data: 'uztykownik nie istnieje' });
        }

        user.activities.push(activity);

        const updatedUser = await user.save();

        console.log(updatedUser);
        return res.status(201).json({
            activity: {
                ...activity,
                _id: updatedUser.activities[updatedUser.activities.length - 1]
                    ._id,
            },
        });
    } catch (error) {
        console.error('Error post activities:', error);
        res.status(500).json({
            error: 'An error occurred while fetching activities',
        });
    }
});

router.delete('/', async (req, res) => {
    const { userName, activityId } = req.body;

    console.log('delete route', activityId);

    try {
        const user = await User.findOne({ userName });

        if (!user) {
            res.status(404).json({ data: 'uztykownik nie istnieje' });
        }

        const activityObjectIdToRemove =
            ObjectId.createFromHexString(activityId);

        const x = user.activities.filter((activity) =>
            activity._id.equals(activityObjectIdToRemove)
        );
        console.log('activity', x);

        user.activities = user.activities.filter(
            (activity) => !activity._id.equals(activityObjectIdToRemove)
        );

        await user.save();

        res.status(204);
    } catch (error) {
        console.error('Error post activities:', error);
        res.status(500).json({
            error: 'An error occurred while fetching activities',
        });
    }
});

module.exports = router;
