function fetchCharacter() {
  let url = window.location.search;
  let slug = new URLSearchParams(url).get("slug");
  return fetch("https://hp-api.lainocs.fr/characters/" + slug).then(
    (response) => response.json()
  );
}

async function displayCharacter() {
  const data = await fetchCharacter();
  document.querySelector("#character").innerHTML = `
    <section class="main">
      <div class="perso">
        <article class="carte">
          <div class="top">
            <h2>${data.name}</h2>
            <h2>${data.house}</h2>
          </div>
          <img src="${data.image}" alt="${data.name}"/>
          <div class="bottom">
            <h3>${data.role}</h3>
            <h3>Wand : ${data.wand}</h3>
            <h3>Patronus : ${data.patronus}</h3>
            <h3>Actor : ${data.actor}</h3>
          </div>
        </article>
        <article class="carte button">
          <a href="cartes.html">BACK</a>
        </article>
      </div>
    </section>
    `;
}

displayCharacter();

let updateData = (_name, _color, _status) => {
  const data = {
    name: _name.innerHTML,
    color: _color.value,
    status: _status.checked,
  };
  fetch(url + _name.innerHTML, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
