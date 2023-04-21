import SpaceXError from "./error.js";

const _apiBase = 'https://api.spacexdata.com/v4/'

export default class SpaceXService {
    async getCompanyInfo() {
        try{
            const response = await fetch(`${_apiBase}company`);

            if (!response.ok) {
                throw new SpaceXError('Failed to get company info. Response status is not ok.');
            }
            
            const data = await response.json();
            return data;
        }catch (error) {
            throw new SpaceXError('Failed to get company info. An error occurred while fetching the data.');
        }
    }

    async getSpaceXRocketsInfo() {
        try{
            const response = await fetch(`${_apiBase}rockets`);

            if (!response.ok) {
                throw new SpaceXError('Failed to get info about rockets. Response status is not ok.');
            }
    
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
        }catch (error) {
            throw new SpaceXError(`Failed to get info about rockets. An error occurred while fetching the data.`);
        }   
    }

    async getSpaceXRocketInfoById(id){
        try{
            const response = await fetch(`${_apiBase}rockets/${id}`);

            if (!response.ok) {
                throw new SpaceXError('Failed to get info about rocket. Response status is not ok.');
            }
            
            const data = await response.json();
            return data;
        }catch (error) {
            throw new SpaceXError('Failed to get info about rocket. An error occurred while fetching the data.');
        } 
    }

    async getLatestLaunchInfo() {
        try {
            const response = await fetch(`${_apiBase}launches/latest`);

            if (!response.ok) {
                throw new SpaceXError('Failed to get info about latest launch. Response status is not ok.');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new SpaceXError('Failed to get info about latest launch. An error occurred while fetching the data.');
        }
    }

    async getNextLaunchInfo() {
        try{
            const response = await fetch(`${_apiBase}launches/next`);

            if (!response.ok) {
                throw new SpaceXError('Failed to get info about next launch. Response status is not ok.');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new SpaceXError('Failed to get info about next launch. An error occurred while fetching the data.');
        } 
    }
}
