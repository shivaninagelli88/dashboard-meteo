GeoWeather Insights

GeoWeather Insights is a geospatial analytics dashboard I built from scratch using Next.js, TypeScript, and Shadcn/UI. It allows users to draw polygons on a map, fetch real-time weather data for those areas using the Open-Meteo API, and visualize the data with fully customizable color rules.

It also features a GenAI-based tool to suggest the optimal initial zoom level for the map.

Features:

Interactive Map – Built using the Google Maps API with a fixed zoom.

Polygon Drawing Tool – Draw, view, and delete custom polygons (3–12 points).

Timeline Slider – Select a single hour or a time range within a 30-day window.

Color Rules – Define thresholds to color polygons based on temperature data.

Dynamic Weather Data – Fetch and update polygon temperature values using Open-Meteo API.

AI Zoom Advisor – Suggests initial zoom level using a GenAI model.

State Persistence – Saves polygons, timeline, and rules to localStorage.

Tech Stack:

Framework: Next.js (App Router)

Language: TypeScript

UI: Shadcn/UI, Tailwind CSS

Maps: @vis.gl/react-google-maps

State Management: React Context + useReducer

Date/Time: date-fns

Icons: Lucide React

Weather API: Open-Meteo

Getting Started

Prerequisites:

Node.js (v18 or later)

npm or yarn

Installation:

Clone the repository:
git clone https://github.com/shivaninagelli88/geoweather-insights.git
cd geoweather-insights

Install dependencies:
npm install

Create a .env.local file in the root of the project:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

Make sure you've enabled "Maps JavaScript API" in your Google Cloud Console.

Run locally:
npm run dev

The app will be available at http://localhost:9002

Deployment (Vercel Recommended)

Push your code to a GitHub repo.

Import your repo in Vercel.

Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in project environment variables.

Click Deploy.

How to Use:

Draw Polygons: Click Start Drawing > click on the map to add points > click Finish Drawing.

Select Time: Use the slider at the bottom to choose a specific hour or time range.

Define Color Rules: In the sidebar, click Add Rule and set conditions (e.g., temp > 25 = red).

View & Manage: Polygons update based on data; hover to see average values; delete if needed.

License:
MIT License © 2025 Sai Shivani Nagelli

Author:
Sai Shivani Nagelli
Hyderabad, India
Email: shivanisai1753@gmail.com
LinkedIn: https://www.linkedin.com/in/sai-shivani-nagelli-bb1566248/
GitHub: https://github.com/shivaninagelli88
