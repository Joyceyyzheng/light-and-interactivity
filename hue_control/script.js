document.addEventListener("DOMContentLoaded", function () {
  const frame = document.querySelector(".frame");
  const frame1 = document.getElementById("light1");
  const frame2 = document.getElementById("light2");
  const frame3 = document.getElementById("light3");
  const frame4 = document.getElementById("light4");
  const frame5 = document.getElementById("light5");
  const frame6 = document.getElementById("light6");
  const main = document.getElementById("light-main");

  frame1.addEventListener("click", function () {
    toggleActive(frame1, 1);
    //frame.classList.toggle("active");
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

  main.addEventListener("click", function () {
    toggleActive(main, 1);
  });
});

let lightIsOn = false;

const address = "172.22.151.183";
const username = "JQghTeGomTB6bBYhcnZk1m7vYxdzXXaPEwTywBDz";

let modeActive = false;
const lightStates = {
  1: false,
  8: false,
  9: false,
  10: false,
  7: false,
  4: false,
};

function toggleActive(frame, lightNum) {
  //css working
  frame.classList.toggle("active");
  console.log("Frame toggled:", frame);

  lightStates[lightNum] = !lightStates[lightNum];
  console.log("Light", lightNum, "state:", lightStates[lightNum]);
  const newLightState = { on: lightStates[lightNum] };

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
    selectedLightNumber = parseInt(this.dataset.light);

    console.log(
      "Selected value:",
      selectedText,
      "Light number:",
      selectedLightNumber
    );
  });
});

//changing brightness
const briSlider = document.getElementById("bri");
briSlider.addEventListener("input", function () {
  if (!modeActive && selectedLightNumber !== null) {
    const brightness = parseInt(briSlider.value);

    const newLightState = {
      on: true,
      bri: brightness,
    };

    // Example: "lights/7/state/"
    const requestPath = `lights/${selectedLightNumber}/state/`;
    sendRequest(requestPath, "PUT", newLightState);
    console.log(
      `Setting brightness of light ${selectedLightNumber} to ${brightness}`
    );
  } else {
    console.log("No light selected yet!");
  }
});

//changing ct(hue)
const hueSlider = document.getElementById("hue");
hueSlider.addEventListener("input", function () {
  if (!modeActive && selectedLightNumber !== null) {
    const hue = parseInt(hueSlider.value);
    console.log("Hue value:", hue);

    const newLightState = {
      on: true,
      ct: hue,
    };

    const requestPath = `lights/${selectedLightNumber}/state/`;
    sendRequest(requestPath, "PUT", newLightState);
    console.log(
      `Setting temperature of light ${selectedLightNumber} to ${hue}`
    );
  } else {
    console.log("No light selected yet!");
  }
});

//reset
let resetLightsOn = false;
const resetButton = document.getElementById("light-main");
resetButton.addEventListener("click", function () {
  const lightsToReset = [1, 8, 9, 10, 7, 4];

  if (resetLightsOn) {
    lightsToReset.forEach(function (lightNum) {
      const requestPath = `lights/${lightNum}/state/`;
      const newLightState = { on: false };
      sendRequest(requestPath, "PUT", newLightState);
      console.log(`Turning off light ${lightNum}`);
    });
    resetLightsOn = false;
  } else {
    lightsToReset.forEach(function (lightNum) {
      const requestPath = `lights/${lightNum}/state/`;
      const newLightState = { on: true, hue: 300, bri: 150 };
      sendRequest(requestPath, "PUT", newLightState);
      console.log(`Turning on light ${lightNum} with hue 300 and bri 150`);
    });
    resetLightsOn = true;
  }
});

//modes
const modeSettings = {
  //study
  mode1: [
    { lightNum: 1, ct: 250, bri: 254 },
    { lightNum: 8, ct: 250, bri: 254 },
    { lightNum: 9, ct: 250, bri: 254 },
    { lightNum: 10, ct: 250, bri: 254 },
    { lightNum: 7, ct: 250, bri: 254 },
    { lightNum: 4, ct: 250, bri: 254 },
  ],
  //meeting
  mode2: [
    { lightNum: 1, ct: 370, bri: 220 },
    { lightNum: 8, ct: 350, bri: 220 },
    { lightNum: 9, ct: 280, bri: 240 },
    { lightNum: 10, ct: 280, bri: 240 },
    { lightNum: 7, ct: 350, bri: 220 },
    { lightNum: 4, ct: 370, bri: 220 },
  ],
  //severance
  mode3: [
    { lightNum: 1, ct: 250, bri: 0 },
    { lightNum: 8, ct: 250, bri: 254 },
    { lightNum: 9, ct: 250, bri: 10 },
    { lightNum: 10, ct: 250, bri: 10 },
    { lightNum: 7, ct: 250, bri: 254 },
    { lightNum: 4, ct: 250, bri: 0 },
  ],
  //party
  mode4: [
    { lightNum: 1, ct: 450, bri: 130 },
    { lightNum: 8, ct: 400, bri: 20 },
    { lightNum: 9, ct: 400, bri: 20 },
    { lightNum: 10, ct: 400, bri: 20 },
    { lightNum: 7, ct: 400, bri: 20 },
    { lightNum: 4, ct: 450, bri: 130 },
  ],
  //sleep
  mode5: [
    { lightNum: 1, ct: 450, bri: 20 },
    { lightNum: 8, ct: 450, bri: 20 },
    { lightNum: 9, ct: 420, bri: 1 },
    { lightNum: 10, ct: 420, bri: 1 },
    { lightNum: 7, ct: 450, bri: 20 },
    { lightNum: 4, ct: 450, bri: 20 },
  ],
};

function activateMode(modeName) {
  const settings = modeSettings[modeName];
  if (!settings) {
    console.error("No settings found for mode:", modeName);
    return;
  }

  settings.forEach((setting) => {
    const lightNum = setting.lightNum;

    const briRequestPath = `lights/${lightNum}/state/`;
    const briState = {
      on: true,
      bri: setting.bri,
    };
    console.log(`Updating brightness for light ${lightNum}:`, briState);
    sendRequest(briRequestPath, "PUT", briState);

    setTimeout(() => {
      const ctRequestPath = `lights/${lightNum}/state/`;
      const ctState = {
        on: true,
        ct: setting.ct,
      };
      console.log(`Updating color temperature for light ${lightNum}:`, ctState);
      sendRequest(ctRequestPath, "PUT", ctState);
    }, 100);
  });
}

const modeButton1 = document.getElementById("toggle-btn1");
modeButton1.addEventListener("change", function () {
  if (this.checked) {
    console.log("Mode 1 activated");
    activateMode("mode1");
    modeActive = true;
  } else {
    console.log("Mode 1 deactivated");
    modeActive = false;
  }
});

const modeButton2 = document.getElementById("toggle-btn2");
modeButton2.addEventListener("change", function () {
  if (this.checked) {
    console.log("Mode 2 activated");
    activateMode("mode2");
    modeActive = true;
  } else {
    console.log("Mode 2 deactivated");
    modeActive = false;
  }
});

const modeButton3 = document.getElementById("toggle-btn3");
modeButton3.addEventListener("change", function () {
  if (this.checked) {
    console.log("Mode 3 activated");
    activateMode("mode3");
    modeActive = true;
  } else {
    console.log("Mode 3 deactivated");
    modeActive = false;
  }
});

const modeButton4 = document.getElementById("toggle-btn4");
modeButton4.addEventListener("change", function () {
  if (this.checked) {
    console.log("Mode 4 activated");
    activateMode("mode4");
    modeActive = true;
  } else {
    console.log("Mode 4 deactivated");
    modeActive = false;
  }
});

const modeButton5 = document.getElementById("toggle-btn5");
modeButton5.addEventListener("change", function () {
  if (this.checked) {
    console.log("Sleep mode activated - Toggle is ON");
    activateMode("mode5");
    modeActive = true;
  } else {
    console.log("Sleep mode deactivated - Toggle is OFF");
    modeActive = false;
  }
});

//toggles
const toggles = document.querySelectorAll(".mode input[type='checkbox']");

toggles.forEach((toggle) => {
  toggle.addEventListener("change", function () {
    if (this.checked) {
      toggles.forEach((other) => {
        if (other !== this) {
          other.checked = false;
        }
      });
      console.log(`Toggle for ${this.id} is ON`);
    } else {
      console.log(`Toggle for ${this.id} is OFF`);
    }
  });
});

const map = document.querySelector(".heading-map");
//map
map.addEventListener("click", function () {
  console.log("Map clicked");
  const image = document.getElementById("map");
  image.classList.toggle("hidden");
});
