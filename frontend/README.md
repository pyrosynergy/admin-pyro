# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






Great, now I can see the structure. The only file you need to modify is App.jsx. Your Header.jsx, Hero.jsx, FAQ.jsx, and Footer.jsx already receive openCalendarPopup as a prop, so they'll automatically use the new behavior.

1. Install the package
npm install @calcom/embed-react
2. At the top of App.jsx, add:
import { getCalApi } from "@calcom/embed-react";
3. Inside the App() component, add this useEffect (after your other useEffects is fine):
useEffect(() => {
  (async function () {
    const cal = await getCalApi();

    cal("ui", {
      theme: "dark",
    });
  })();
}, []);
4. Replace your current openCalendarPopup

Delete this:

const openCalendarPopup = () => {
  const calendarUrl =
    "https://cal.com/javali-reddy-xb9jed/stratergy-call";

  const popup = window.open(calendarUrl, "_blank");

  if (popup) popup.focus();
};

Replace it with:

const openCalendarPopup = async () => {
  const cal = await getCalApi();

  cal("modal", {
    calLink: "javali-reddy-xb9jed/stratergy-call",
  });
};
5. That's it.

Since you're already passing:

<Header openCalendarPopup={openCalendarPopup} />
<Hero openCalendarPopup={openCalendarPopup} />
<FAQ openCalendarPopup={openCalendarPopup} />
<Footer openCalendarPopup={openCalendarPopup} />

all of those buttons will now open the embedded booking modal instead of a new tab.