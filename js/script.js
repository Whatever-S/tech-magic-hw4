import SpaceXService from "./api.js";

const spaceX = new SpaceXService();
const buttonLatestLaunch = document.querySelector('.launch__button--latest')
const buttonNextLaunch = document.querySelector('.launch__button--next')
const buttonRocket = document.querySelector('.rockets__button');
const companyInfo = document.querySelector('.company__info');
const rocketsInfo = document.querySelector('.rockets__info');
const launchInfo = document.querySelector('.launch__info');


document.addEventListener('DOMContentLoaded', async () => {
    try {
      const data = await spaceX.getCompanyInfo();
      if (data) {
        companyInfo.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Founder:</strong> ${data.founder}</p>
        <p><strong>Founded:</strong> ${data.founded}</p>
        <p><strong>Employees:</strong> ${data.employees}</p>
        <p><strong>Summary:</strong> ${data.summary}</p>
        <p><strong>Link:</strong> <a href="${data.links.website}" target="_blank">${data.links.website}</a></p>
      `;
      } else {
        companyInfo.textContent = 'No summary available.';
      }
    } catch (error) {
      console.error('Error getting company info:', error.message);
      companyInfo.textContent = 'Error getting company info.';
    }

    try {
      const rockets = await spaceX.getSpaceXRocketsInfo();
      const rocketCards = rockets.map((rocket) => `
        <div class="rocket__card card">
        <img class="rocket__img" src="${rocket.images[1]}" alt="${rocket.name}" onerror="this.onerror=null; this.src='img/patch.png';">
          <h2 class="title title--card">${rocket.name}</h2>
          <p>${rocket.description}</p>
          <ul>
            <li><strong>Country:</strong> ${rocket.country}</li>
            <li><strong>Active:</strong> ${rocket.active ? 'Yes' : 'No'}</li>
            <li><strong>Size parameters:</strong> Height: ${rocket.height }m, diameter: ${rocket.diameter} m, mass: ${rocket.mass} kg </li>
            <li><strong>Cost per launch:</strong> $${rocket.cost_per_launch.toLocaleString()}</li>
            <li><a href="${rocket.wikipedia}" target="_blank">Wikipedia</a></li>
          </ul>
        </div>
      `);
      rocketsInfo.innerHTML = rocketCards.join('');
    } catch (error) {
      console.error(error);
    }
});


buttonRocket.addEventListener('click', () => {
  if (rocketsInfo.style.display === 'none') {
    rocketsInfo.style.display = 'flex';
  } else {
    rocketsInfo.style.display = 'none';
  }
});

  async function findRocKetById(id){
    try{
      const rocketData  = await spaceX.getSpaceXRocketInfoById(id)
      if(rocketData ){
        return rocketData.name
      }else {
        return 'No available rocket name.';
      }
    }
    catch (error) {
      console.error('Error getting latest launch info:', error.message);
      launchInfo.textContent = 'Error getting latest launch info.';
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
    } catch (error) {
      console.error('Error getting latest launch info:', error.message);
      launchInfo.textContent = 'Error getting latest launch info.';
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
    } catch (error) {
      console.error('Error getting latest launch info:', error.message);
      launchInfo.textContent = 'Error getting latest launch info.';
    }
  })

  async function buildLaunchCard(data){
    const rocketName = await findRocKetById(data.rocket);
    launchInfo.innerHTML = `
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Date:</strong> ${data.date_local}</p>
      <p><strong>Success:</strong> ${data.success}</p>
      <p><strong>Rocket:</strong> ${rocketName}</p>
      <p><strong>Links:</strong> <a href="${data.links.webcast}" target="_blank">${data.links.webcast}</a></p>
      <img src="${data.links.patch.small ? data.links.patch.small : 'img/patch.png'}" alt="${data.name}">
    `;
  }