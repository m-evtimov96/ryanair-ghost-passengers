# ryanair-ghost-passengers 👻

Chrome extension that auto-fills ghost passenger details on Ryanair check-in page to improve seat placement for your real bookings.

## Why It Was Created ✈

You’ve probably seen all those Insta/YT “Ryanair seat hacks” where people reserve unwanted seats to improve their random seat allocation later.

I got tired of manually filling the form when reserving the seats I *don’t* want, just to get better random seats during check-in for my real tickets.

This extension was created to quickly autofill “ghost passengers”, improving the chances of getting better random seating for your actual booking.

It’s designed to be simple and usable even by non-technical users — easy setup, no configuration, just one click.

---

## How It Works ⚙

- Detects the number of passengers on the Ryanair page
- Generates realistic passenger names
- Autofills title, first name, and last name
- Runs locally in your browser (no data is sent)

---

## Installation 🔨

1. Clone this repository:
   ```bash
   git clone https://github.com/m-evtimov96/ryanair-ghost-passengers.git
   ```
   **or download it as a ZIP**

2. Open Chrome and go to **chrome://extensions**

3. Enable **Developer mode** (top right)

4. Click **Load unpacked**

5. Select the project folder

The extension will now appear in your browser toolbar.

---

## How To Use 💺

1. Go to the Ryanair booking or check-in page and find your flight

2. Select as much tickets as you can/need (25 max)

3. Procceed through **select flight** and **select fare** steps and click **Log in later**

4. When you get the passengers form open the extension and click **Fill Passengers**

5. After the form is filled click **Continue** and 👻 reserve the seats you don't want for your existing tickets

6. While this session is active check in your actual tickets with the desired random left seats

---

## Limitations, Notes & Legal 📑

- This extension depends on Ryanair’s page structure — changes to the website may break functionality
- Title selection relies on Ryanair’s dropdown behavior and may vary by locale (use /gb/en)
- The extension does **not** submit bookings or bypass payments
- No personal data is collected, stored, or transmitted

**Disclaimer:**  
This project is for educational and personal convenience purposes only.  
It is not affiliated with, endorsed by, or connected to Ryanair. Use at your own discretion.