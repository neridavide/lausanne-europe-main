const developmentCredentials = {
  username: 'coordinator',
  password: '1234',
};

const form = document.querySelector('[data-coordinator-login]');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const isValid = data.get('username') === developmentCredentials.username
    && data.get('password') === developmentCredentials.password;
  const error = form.querySelector('[data-login-error]');

  if (!isValid) {
    error.hidden = false;
    return;
  }

  window.location.assign('coordinator-dashboard.html');
});
