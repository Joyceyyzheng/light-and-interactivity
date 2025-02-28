document.addEventListener("DOMContentLoaded", function () {
  const frame = document.querySelector(".frame");
  const frame1 = document.getElementById("light1");
  const frame2 = document.getElementById("light2");
  const frame3 = document.getElementById("light3");
  const frame4 = document.getElementById("light4");
  const frame5 = document.getElementById("light5");
  const frame6 = document.getElementById("light6");

  frame1.addEventListener("click", function () {
    toggleActive(frame1, 1);
    frame.classList.toggle("active");
  });
  frame2.addEventListener("click", function () {
    toggleActive(frame2, 8);
  });
  frame3.addEventListener("click", function () {
    toggleActive(frame3, 9);
  });
  frame4.addEventListener("click", function () {
    toggleActive(frame4, 10);
  });
  frame5.addEventListener("click", function () {
    toggleActive(frame5, 7);
  });
  frame6.addEventListener("click", function () {
    toggleActive(frame6, 4);
  });
});
let lightIsOn = false;

const address = "172.22.151.183";
const username = "JQghTeGomTB6bBYhcnZk1m7vYxdzXXaPEwTywBDz";

function toggleActive(frame, lightNum) {
  //css working
  frame.classList.toggle("active");
  console.log("Frame toggled:", frame);

  lightIsOn = !lightIsOn;
  console.log("Light state:", lightIsOn);
  const newLightState = { on: lightIsOn };

  const requestPath = `lights/${lightNum}/state/`;
  sendRequest(requestPath, "PUT", newLightState);
  console.log("lightNum is", lightNum);
}

function sendRequest(request, requestMethod, data) {
  if (!address) {
    console.error("No IP address set for Hue hub.");
    return;
  }
  if (!username && request !== "newuser") {
    console.error("No username set for Hue hub.");
    return;
  }

  let url = `http://${address}/api/`;
  if (request !== "newuser") {
    url += `${username}/`;
  }
  url += request;

  let params = {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (requestMethod !== "GET" && data) {
    params.body = JSON.stringify(data);
  }

  fetch(url, params)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("Hue response:", jsonData);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

// -----------

function toggleDropdown() {
  const menu = document.querySelector(".dropdown-menu");
  menu.classList.toggle("show");
}

const menuItems = document.querySelectorAll(".dropdown-menu li");
menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    const selectedValue = this.textContent;

    const labelSpan = document.querySelector(".dropdown-text");
    labelSpan.textContent = selectedValue;

    toggleDropdown();

    console.log("Selected value:", selectedValue);
  });
});
