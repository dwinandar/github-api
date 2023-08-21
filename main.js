const API_URL = "https://api.github.com/users/";

const searchByUsername = async (username) => {
  const response = await fetch(`${API_URL}${username}`);
  const data = await response.json();

  if (data.login) {
    document.querySelector(".result").innerHTML = `
  <div class="wrapper">
    <img src="${data.avatar_url}" alt="profile-image" class="profile-img"/>
    <div class="info">
      <h2>${data.name}(${data.login})</h2>
      <h3>${data.bio}</h3>
      <h4>followers : ${data.followers} | following : ${data.following}</h4>
      <div class="repos"></div>
    </div>
  </div>
  `;
  } else {
    document.querySelector(".result").innerHTML = `
  <div class="wrapper">
    <img src="" alt="profile-image" class="profile-img"/>
    <div>
      <h1>User Not Found</h1>
    </div>
  </div>
  `;
  }
};

const fetchRepos = async (username) => {
  const response = await fetch(`${API_URL}${username}/repos`);
  const dataRepos = await response.json();

  dataRepos.forEach((repos) => {
    const linkElem = document.createElement("a");
    linkElem.href = repos.html_url;
    linkElem.innerText = repos.name;
    document.querySelector(".repos").appendChild(linkElem);
  });
};

const button = document.querySelector(".button");
const inputElem = document.querySelector(".username");

button.addEventListener("click", () => {
  const inputUser = inputElem.value;
  if (!inputUser) {
    return (document.querySelector(".result").innerHTML =
      "Please Input Username");
  }
  searchByUsername(inputUser);
  fetchRepos(inputUser);
});

inputElem.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    button.click();
  }
});
