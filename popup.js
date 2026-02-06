document.addEventListener('DOMContentLoaded', async () => {
  const fillBtn = document.getElementById("fill");
  const spinner = document.getElementById("spinner");
  const passengerCountSpan = document.getElementById("passengerCount");

  // Get number of passengers from page
  async function getPassengerCountFromTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const bottomBar = document.querySelector('div.details__bottom-bar .person-icon');
        if (!bottomBar) return 1;
        let count = 1;
        bottomBar.parentElement.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const num = parseInt(node.textContent.trim());
            if (!isNaN(num)) count = num;
          }
        });
        return count;
      }
    });
    return result[0].result;
  }

  // Update passenger count in popup
  const numPassengers = await getPassengerCountFromTab();
  passengerCountSpan.textContent = `Passengers detected: ${numPassengers}`;

  fillBtn.addEventListener("click", async () => {
    spinner.classList.remove("hidden");
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [numPassengers],
      func: (num) => {
        const firstNames = [
          "John","Alice","Michael","Emma","David","Olivia","James","Sophia","Robert","Isabella",
          "William","Mia","Joseph","Charlotte","Charles","Amelia","Thomas","Harper","Daniel","Evelyn",
          "Matthew","Abigail","Anthony","Emily","Mark","Ella","Paul","Avery","Andrew","Scarlett",
          "Joshua","Grace","Kevin","Chloe","Brian","Lily","George","Sofia","Edward","Madison",
          "Richard","Aria","Samuel","Layla","Jacob","Zoe","Nicholas","Hannah","Alexander","Aurora"
        ];

        const lastNames = [
          "Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez","Wilson",
          "Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White",
          "Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall",
          "Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson",
          "Hill","Ramirez","Campbell","Mitchell","Roberts","Carter","Phillips","Evans","Turner","Torres"
        ];

        const titles = ["Mr", "Mrs", "Ms", "Mx"];

        function triggerInput(el, value) {
          el.focus();
          el.value = value;
          el.dispatchEvent(new InputEvent("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
          el.dispatchEvent(new Event("blur", { bubbles: true }));
        }

        function clickElement(el) {
          ["mousedown","mouseup","click"].forEach(type => {
            el.dispatchEvent(new MouseEvent(type, { bubbles:true, cancelable:true }));
          });
        }

        function selectDropdownTitle(dropdown, title) {
          const button = dropdown.querySelector('button.dropdown__toggle');
          if (!button) return;

          clickElement(button); // open dropdown

          const interval = setInterval(() => {
            const options = dropdown.querySelectorAll('ry-dropdown-item button');
            const match = Array.from(options).find(btn => btn.textContent.trim() === title);
            if (match) {
              clickElement(match);
              clearInterval(interval);
            }
          }, 50);
        }

        for (let i = 0; i < num; i++) {
          setTimeout(() => {
            const firstName = firstNames[i % firstNames.length];
            const lastName = lastNames[i % lastNames.length];
            const title = titles[i % titles.length];

            const container = document.querySelectorAll('pax-passenger-container')[i];
            if (!container) return;

            // Names
            const firstInput = container.querySelector(`input[name="form.passengers.ADT-${i}.name"]`);
            const lastInput = container.querySelector(`input[name="form.passengers.ADT-${i}.surname"]`);
            if (firstInput) triggerInput(firstInput, firstName);
            if (lastInput) triggerInput(lastInput, lastName);

            // Title
            const dropdown = container.querySelector('ry-dropdown[data-ref="pax-details__title"]');
            if (dropdown) selectDropdownTitle(dropdown, title);

          }, i * 400);
        }
        console.log(`Ryanair autofill executed for ${num} passengers`);
      }
    });

    setTimeout(() => spinner.classList.add("hidden"), numPassengers * 400 + 500);
  });
});
