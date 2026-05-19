function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

window.onload = function () {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
};

function filterProjects(category) {
  const projects = document.querySelectorAll(".project-card");

  projects.forEach((project) => {
    if (category === "all") {
      project.style.display = "block";
    } else if (project.classList.contains(category)) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}

async function validateForm() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const formMessage = document.getElementById("formMessage");

  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    message.value.trim() === ""
  ) {
    formMessage.style.color = "red";
    formMessage.innerText = "Please fill all fields before submitting.";
    return false;
  }

  if (!email.value.includes("@")) {
    formMessage.style.color = "red";
    formMessage.innerText = "Please enter a valid email address.";
    return false;
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: message.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      formMessage.style.color = "green";
      formMessage.innerText = data.message;

      name.value = "";
      email.value = "";
      message.value = "";
    } else {
      formMessage.style.color = "red";
      formMessage.innerText = data.message;
    }
  } catch (error) {
    formMessage.style.color = "red";
    formMessage.innerText = "Backend connection failed.";
  }

  return false;
}
