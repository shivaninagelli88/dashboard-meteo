Sure! Below is the **full `README.md` content** ready for **copy-pasting** directly into your GitHub repository:

---

````markdown
# 🌍 GeoWeather Insights

**GeoWeather Insights** is a geospatial analytics dashboard I built from scratch using **Next.js**, **TypeScript**, and **Shadcn/UI**. It allows users to draw polygons on a map, fetch real-time weather data for those areas using the **Open-Meteo API**, and visualize the data with fully customizable color rules.

It also features a GenAI-based tool to suggest the optimal initial zoom level for the map.

---

## ✨ Features

- 🗺️ **Interactive Map** – Built using the Google Maps API with a fixed zoom.
- ✏️ **Polygon Drawing Tool** – Draw, view, and delete custom polygons (3–12 points).
- 🕓 **Timeline Slider** – Select a single hour or a time range within a 30-day window.
- 🎨 **Color Rules** – Define thresholds to color polygons based on temperature data.
- 🔄 **Dynamic Weather Data** – Fetch and update polygon temperature values using Open-Meteo API.
- 🤖 **AI Zoom Advisor** – Suggests initial zoom level using a GenAI model.
- 💾 **State Persistence** – Saves polygons, timeline, and rules to `localStorage`.

---

## 🛠️ Tech Stack

| Category         | Libraries / Tools |
|------------------|-------------------|
| Framework        | [Next.js](https://nextjs.org/) (App Router) |
| Language         | [TypeScript](https://www.typescriptlang.org/) |
| UI               | [Shadcn/UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/) |
| Maps             | [@vis.gl/react-google-maps](https://vis.gl/modules/react-google-maps) |
| State Management | React Context + `useReducer` |
| Date/Time        | [date-fns](https://date-fns.org/) |
| Icons            | [Lucide React](https://lucide.dev/) |
| Weather API      | [Open-Meteo](https://open-meteo.com/) |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js (v18 or later)
- npm or yarn

### 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/shivaninagelli88/geoweather-insights.git
cd geoweather-insights
````

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env.local` file:**

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

> Make sure you've enabled "Maps JavaScript API" in your [Google Cloud Console](https://console.cloud.google.com/).

---

### ▶️ Running Locally

```bash
npm run dev
```

App runs at: `http://localhost:9002`

---

## 🌐 Deployment

This app is production-ready and optimized for platforms like **Vercel** or **Netlify**.

### 🧭 Vercel Deployment Steps:

1. Push your code to a GitHub repo.
2. Import your repo in Vercel.
3. Add the environment variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel project settings.
4. Click **Deploy** – you're done!

---

## 🧑‍💻 How to Use

1. **Draw Polygons:** Click **Start Drawing** → click on map to add points → click **Finish Drawing**.
2. **Select Time:** Use the bottom timeline slider to pick a single hour or a time range.
3. **Define Color Rules:** In the sidebar, use **Add Rule** to configure how polygons are colored based on temperature.
4. **View & Manage:** Polygons fetch temperature data and change color based on your rules. You can hover for tooltips and delete polygons individually or all at once.

---

## 📄 License

MIT License © 2025 Sai Shivani Nagelli

---

## 🙋‍♀️ Author

**Sai Shivani Nagelli**
📍 Hyderabad, India
📧 [shivanisai1753@gmail.com](mailto:shivanisai1753@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/sai-shivani-nagelli-bb1566248/)
🔗 [GitHub](https://github.com/shivaninagelli88)
