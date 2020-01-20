import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

class SearchController {
    async index(req, res) {
        console.log(req.query);

        const {techs, latitude, longitude } = req.query;

        const techsArray = parseStringAsArray(techs);
//-26.8288602,-49.2711386
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000, // em metros ou seja 10km = 10.000m
                },
            }
        });
        res.json(devs);
    }
}

export default new SearchController();