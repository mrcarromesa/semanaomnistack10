import Dev from '../models/Dev';
import axios from 'axios';
import parseStringAsArray from '../utils/parseStringAsArray';

import { findConnections, sendMessage } from '../websocket';

class DevController {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    }

    async store(req,res) {
        const {github_username, techs, latitude, longitude} = req.body;


        const devFind = await Dev.findOne({github_username});

        if (devFind) {
            return res.status(400).json({error: "User alredy exists."});
        }
    
        const response = await axios.get(`https://api.github.com/users/${github_username}`);

        const {name = login, avatar_url, bio } = response.data;
        console.log(name, avatar_url, bio);

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        };

        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        const sendSocketMessageTo = findConnections({latitude, longitude}, techsArray);

        sendMessage(sendSocketMessageTo, 'new-dev', dev);

        console.log(sendSocketMessageTo);

        return res.status(200).json(dev);
    }
}

export default new DevController();