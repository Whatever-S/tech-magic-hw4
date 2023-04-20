const _apiBase = 'https://api.spacexdata.com/v4/'

export default class SpaceXService {
    async getCompanyInfo() {
        const response = await fetch(`${_apiBase}company`);
        const data = await response.json();
        return data;
    }

    async getSpaceXRocketsInfo() {
        const response = await fetch(`${_apiBase}rockets`);
        const data = await response.json();
    
        const rockets = data.map((rocket) => ({
            id: rocket.id,
            name: rocket.name,
            country: rocket.country,
            active: rocket.active,
            cost_per_launch: rocket.cost_per_launch,
            description: rocket.description,
            wikipedia: rocket.wikipedia,
            images: rocket.flickr_images,
            height: rocket.height.meters,
            diameter: rocket.diameter.meters,
            mass: rocket.mass.kg
        }));
    
        return rockets;
    }

    async getSpaceXRocketInfoById(id){
        const response = await fetch(`${_apiBase}rockets/${id}`);
        const data = await response.json();
        return data;
    }

    async getLatestLaunchInfo() {
        const response = await fetch(`${_apiBase}launches/latest`);
        const data = await response.json();
        return data;
    }

    async getNextLaunchInfo() {
        const response = await fetch(`${_apiBase}launches/next`);
        const data = await response.json();
        return data;
    }
}
