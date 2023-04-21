import SpaceXService from "./api.js";
import SpaceXError from "./error.js";
import {launchCard, companyCard, rocketCard} from "./ui.js";

const spaceX = new SpaceXService();
const buttonLatestLaunch = document.querySelector('.launch__button--latest')
const buttonNextLaunch = document.querySelector('.launch__button--next')
const buttonRocket = document.querySelector('.rocket__button');
const companyInfo = document.querySelector('.company__info');
const rocketsInfo = document.querySelector('.rockets__info');
const rocketWrapper = document.querySelector('.rockets__wrapper')
const launchInfo = document.querySelector('.launch__info');
const launchTitle = document.getElementById('launchCardTitle')

rocketWrapper.style.display = 'none';


document.addEventListener('DOMContentLoaded', async () => {
    try {
      const data = await spaceX.getCompanyInfo();
      if (data) {
        companyInfo.innerHTML = companyCard(data) ;
      } else {
        companyInfo.textContent = 'No summary available.';
      }
    }catch (error) {
      if (error instanceof SpaceXError) {
        console.error('SpaceX error:', error.message);
        companyInfo.textContent = 'Error getting company info.';
      } else {
        console.error('Unknown error:', error.message);
        companyInfo.textContent = 'Ups, error...';
      }
    }

    try {
      const rockets = await spaceX.getSpaceXRocketsInfo();
      const rocketCards = rockets.map((rocket) => rocketCard(rocket));
      rocketsInfo.innerHTML = rocketCards.join('');
    } catch (error) {
      if (error instanceof SpaceXError) {
        console.error('SpaceX error:', error.message);
        rocketsInfo.textContent = 'SpaceXError getting rockets.';
      } else {
        console.error('Error getting rockets:', error.message);
        rocketsInfo.textContent = 'Error getting rockest.';
      }
    }
});

  async function findRocKetById(id){
    try{
      const rocketData  = await spaceX.getSpaceXRocketInfoById(id)
      if(rocketData ){
        return rocketData.name
      }else {
        return 'No available.';
      }
    }
    catch (error) {
      if (error instanceof SpaceXError) {
        console.error('SpaceX error:', error.message);
      } else {
        console.error('Error getting rocket:', error.message);
      }
    }
  }
  

  buttonLatestLaunch.addEventListener("click", async () => {
    try {
      const data = await spaceX.getLatestLaunchInfo();
      if (data) {
        buildLaunchCard(data)
        launchInfo.style.display = 'block';
      } else {
        launchInfo.textContent = 'No data available.';
      }
      buttonNextLaunch.disabled = false;
      buttonLatestLaunch.disabled = true;
      launchTitle.textContent = 'Latest launch info'
    } catch (error) {
      if (error instanceof SpaceXError) {
        console.error('SpaceX error:', error.message);
        launchInfo.textContent = 'SpaceXError getting latest launch info.';
      } else {
        console.error('Error getting latest next  info:', error.message);
        launchInfo.textContent = 'Error getting latest launch info.';
      }
    }
  })

  buttonNextLaunch.addEventListener("click", async () => {
    try {
      const data = await spaceX.getNextLaunchInfo();
      if (data) {
        buildLaunchCard(data)
        launchInfo.style.display = 'block';
      } else {
        launchInfo.textContent = 'No data available.';
      }
      buttonLatestLaunch.disabled = false;
      buttonNextLaunch.disabled = true;
      launchTitle.textContent = 'Next launch info'
    } catch (error) {
      if (error instanceof SpaceXError) {
        console.error('SpaceX error:', error.message);
        launchInfo.textContent = 'SpaceXError getting next  launch info.';
      } else {
        console.error('Error getting next info:', error.message);
        launchInfo.textContent = 'Error getting next launch info.';
      }
    }
  })

  buttonRocket.addEventListener('click', () => {
    rocketWrapper.style.display = (rocketWrapper.style.display === 'none') ? 'flex' : 'none';
    buttonRocket.textContent = (buttonRocket.textContent === 'Show rockets') ? 'Hide rockets' : 'Show rockets';
  });

  async function buildLaunchCard(data){
    const rocketName = await findRocKetById(data.rocket);
    launchInfo.innerHTML = launchCard(data, rocketName);
}