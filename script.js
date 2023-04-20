import SpaceXService from './api.js';

const spaceX = new SpaceXService();
const buttonRocket = document.querySelector('.rockets__button');
const companyInfo = document.querySelector('.company__info');
const rocketsInfo = document.querySelector('.rockets__info');
const launchInfo = document.querySelector('.launches__info');

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
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const data = await spaceX.getLatestLaunchInfo();
      if (data) {
        launchInfo.innerHTML = `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Date:</strong> ${data.date_local}</p>
          <p><strong>Success:</strong> ${data.success}</p>
          <p><strong>Rocket:</strong> ${data.rocket}</p>
          <p><strong>Payloads:</strong> ${data.payloads}</p>
          <p><strong>Launchpad:</strong> ${data.launchpad}</p>
          <p><strong>Links:</strong> <a href="${data.links.webcast}" target="_blank">${data.links.webcast}</a></p>
        `;
      } else {
        launchInfo.textContent = 'No data available.';
      }
    } catch (error) {
      console.error('Error getting latest launch info:', error.message);
      launchInfo.textContent = 'Error getting latest launch info.';
    }
  });
  

buttonRocket.addEventListener('click', async () => {
    try {
      const rockets = await spaceX.getSpaceXRocketsInfo();
  
      // Create a card element for each rocket
      const rocketCards = rockets.map((rocket) => `
        <div class="rocket__card">
          <img src="${rocket.images[1]}" alt="${rocket.name}" />
          <h2>${rocket.name}</h2>
          <p>${rocket.description}</p>
          <ul>
            <li><strong>Country:</strong> ${rocket.country}</li>
            <li><strong>Active:</strong> ${rocket.active ? 'Yes' : 'No'}</li>
            <li><strong>Cost per launch:</strong> $${rocket.cost_per_launch.toLocaleString()}</li>
            <li><a href="${rocket.wikipedia}" target="_blank">Wikipedia</a></li>
          </ul>
        </div>
      `);
  
      // Add the rocket cards to the wrapper
      rocketsInfo.innerHTML = rocketCards.join('');
    } catch (error) {
      console.error(error);
    }
  });