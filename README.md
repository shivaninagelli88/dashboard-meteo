# GeoWeather Insights

GeoWeather Insights is a modern geospatial analytics dashboard that allows users to draw polygons on a map, visualize weather data for those areas, and customize the display based on user-defined rules.

This application is built with Next.js, TypeScript, and Shadcn/UI, utilizing the Google Maps API for mapping and the Open-Meteo API for weather data. It also features a GenAI-powered tool to suggest an optimal initial map zoom level.

## Features

- **Interactive Map**: A Google Maps-based interface with a fixed, non-user-scrollable zoom.
- **Polygon Drawing Tool**: Draw, view, and delete custom polygons on the map.
- **Timeline Slider**: Select a specific hour or a time range over a 30-day window to fetch weather data.
- **Customizable Color Rules**: Define rules to color polygons based on fetched temperature data (e.g., temperature > 25°C is red).
- **Dynamic Data Fetching**: Polygons automatically fetch and display the average temperature from the Open-Meteo API based on their centroid and the selected timeline.
- **AI Initial Zoom Advisor**: A tool that suggests an appropriate initial zoom level for the map to best fit a given area.
- **Persistent State**: Application state such as polygons and rules are saved to `localStorage`.

## Libraries & Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API with `useReducer`
- **Mapping**: [@vis.gl/react-google-maps](https://vis.gl/modules/react-google-maps)
- **Date/Time**: [date-fns](https://date-fns.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/geoweather-insights.git
    cd geoweather-insights
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**

    You'll need a Google Maps API key. Make sure to enable the "Maps JavaScript API" in your Google Cloud Console.

    Create a new file named `.env.local` in the root of the project and add your API key:

    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"
    ```

### Running the Application

Once the setup is complete, you can run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Deployment

This Next.js application is optimized for deployment on platforms like Vercel or Netlify.

### Deploying with Vercel

1.  Push your code to a GitHub repository.
2.  Import the repository into your Vercel account.
3.  Vercel will automatically detect that it's a Next.js project.
4.  Add your `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` as an environment variable in the Vercel project settings.
5.  Click "Deploy". Your application will be built and deployed.

## How to Use

1.  **Draw Polygons**: Click "Start Drawing" in the sidebar. Click on the map to add points to your polygon. Click "Finish Drawing" when you're done.
2.  **Select Time**: Use the timeline slider at the bottom to select a specific hour or a time range.
3.  **Set Color Rules**: In the sidebar, click "Add Rule" to define how polygons should be colored based on temperature.
4.  **View Data**: Polygons will automatically update their color based on the fetched data and your rules. Hover over a polygon to see its average temperature.
5.  **Manage Polygons**: You can delete individual polygons or all of them using the buttons in the sidebar.(edit as i did this own )
