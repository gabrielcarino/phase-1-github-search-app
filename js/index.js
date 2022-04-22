document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('github-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(e.target.search.value);
    e.target.reset();
  });
  function handleSubmit(entry) {
    fetch(`https://api.github.com/search/users?q=${entry}`)
      .then(resp => resp.json())
      .then(list => {
        const userList = document.getElementById('user-list');
        list.items.forEach(user => {
          const profile = document.createElement('li');
          profile.className = 'user-card';
          profile.innerHTML = `<h2 class='uName'>${user.login}</h2>
          <img src=${user.avatar_url} class='user-avatar'>
          <a href=${user.html_url} class='user-url'><img class="octocat" src=imgbin_github-computer-icons-repository-png.png></a>`;
          userList.append(profile);
          profile.addEventListener('click', (e) => {
            e.preventDefault();
            findRepos(user.login, profile);
          });
          function findRepos(slctdUser, profile) {
            fetch(`https://api.github.com/users/${slctdUser}/repos`)
              .then(resp => resp.json())
              .then(repos => {
                const userRepos = document.createElement('li');
                userList.insertBefore(userRepos, profile);
                userRepos.className = 'repos';
                const repoList = document.createElement('ul');
                userRepos.append(repoList);
                repos.forEach(item => {
                  const repo = document.createElement('li');
                  repoList.append(repo);
                  repo.innerHTML = `<a href=${item.html_url}>${item.name}</a>`;
                })
              })
          }
        })
      });
  }
})