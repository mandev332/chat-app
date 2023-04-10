const zmdi_account = document.querySelector(".zmdi-account");
const zmdi_lock = document.querySelector(".zmdi-lock");

let localuserId = localStorage.getItem("token");
if (localuserId) {
  window.location = "/index";
}

submitButton.onclick = async (event) => {
  try {
    event.preventDefault();
    if (!usernameInput.value || !passwordInput.value) return;
    if (uploadInput.value.length == 0) {
      alert("You must input avatar image!");
      return;
    }

    let formData = new FormData();
    formData.append("file", uploadInput.files[0]);
    formData.append("username", usernameInput.value);
    formData.append("password", passwordInput.value);
    formData.append("contact", contactInput.value);
    formData.append("gender", gender.value);
    let res = await request("/users/register", "POST", formData);
    localStorage.setItem("token", res.token);

    messageText.style.color = "green";
    messageText.textContent = res.message;
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
