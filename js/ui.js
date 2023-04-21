export function launchCard(data, rocketName){
    return (`
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Date:</strong> ${data.date_local}</p>
    <p><strong>Success:</strong> ${data.success != null ? data.success : 'Coming soon' }</p>
    <p><strong>Rocket:</strong> ${rocketName}</p>
    <p><strong>Links:</strong> <a href="${data.links.webcast}" target="_blank">${data.links.webcast}</a></p>
    <img src="${data.links.patch.small ? data.links.patch.small : 'img/patch.png'}" alt="${data.name}">
  `)
}

export function companyCard(data){
    return (`
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Founder:</strong> ${data.founder}</p>
        <p><strong>Founded:</strong> ${data.founded}</p>
        <p><strong>Employees:</strong> ${data.employees}</p>
        <p><strong>Summary:</strong> ${data.summary}</p>
        <p><strong>Link:</strong> <a href="${data.links.website}" target="_blank">${data.links.website}</a></p>
    `)
}

export function rocketCard(rocket){
    return (`
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
    `)
}