let localuserId = localStorage.getItem("token");
if (localuserId) {
  window.location = "/index";
}



submitButton.onclick = async (event) => {
  try {
    event.preventDefault();
    if (!contactInput.value || !passwordInput.value) return;

    let login = {
      contact: contactInput.value,
      password: passwordInput.value,
    };

    const response = await request("/users/login", "POST", login);

    window.localStorage.setItem("token", response.token);

    messageText.style.color = "green";
    messageText.textContent = response.message;
    window.location = "/index";
  } catch (error) {
    messageText.style.color = "red";
    messageText.textContent = error.message;
  }
};

showButton.onclick = () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
};
