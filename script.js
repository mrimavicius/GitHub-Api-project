"use strict"

const API_URL = "https://api.github.com/users/"
const app = document.getElementById("app")
const form = document.querySelector("form")
const search = document.querySelector("input")

// Load github user
function loadGithubUser(name){
    return fetch(API_URL + name).then(res => res.json())
}

function loadCardData(data){
    app.innerHTML =
    `
    <div class="card">
        <div>
            <img src="${data.avatar_url}" alt="${data.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>
            <ul>
                <li>${data.followers} <strong>Followers</strong></li>
                <li>${data.following} <strong>Following</strong></li>
                <li>${data.public_repos} <strong>repos</strong></li>
            </ul>
            <ul id="repos">
            </ul>
        </div>
    </div>
    `
}

// Load github users repositories
function loadRepos(name){
    return fetch(API_URL + name + "/repos").then(res => res.json())
}

function addReposToCard(repos){
    var allRepos = document.getElementById("repos")
    var reposSlice = repos.slice(0, 10)
    reposSlice.forEach(x => {
        var repoEl = document.createElement("a")
        repoEl.classList.add("repo")
        repoEl.textContent = x.name
        repoEl.href = x.html_url
        repoEl.target = "_blank"
        allRepos.append(repoEl)
    })
}

form.addEventListener("submit", function(e){
    e.preventDefault()
    var user = search.value
    if(user){
        loadGithubUser(user).then(loadCardData)
        loadRepos(user).then(addReposToCard)
        search.value = ""
    }
})

// loadGithubUser("mrimavicius").then(loadCardData)
// loadRepos("mrimavicius").then(addReposToCard)