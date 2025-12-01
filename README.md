# Cyber Intelligence Dashboard Portfolio

A high-tech, immersive portfolio project designed to demonstrate advanced frontend development skills, API integration, and cybersecurity concepts. This application simulates a "hacker terminal" interface that gathers and visualizes real-time intelligence about the visitor.

## 🚀 Features

### 1. Visitor Intelligence Module (`visitor_intel.exe`)
Automatically scans the visitor's network connection to extract and display detailed geolocation and ISP data.
- **IP Analysis**: Displays IP address, ISP/Organization, and connection type.
- **Geographic Details**: Shows City, Region, Country, Postal Code, and even the **County** (via reverse geocoding).
- **Threat Intelligence Score**: A simulated risk analysis algorithm that assigns a "Threat Score" (0-100) to the visitor's connection, complete with visual risk indicators (Green/Yellow/Red).

### 2. Live Signal Tracking
- **Interactive Map**: Integrates `react-leaflet` to render a live, interactive map centered on the visitor's exact coordinates.
- **Custom Styling**: Features a dark-mode, high-contrast "night vision" aesthetic with a grid overlay to match the terminal theme.

### 3. Atmospheric Conditions
- **Real-Time Weather**: Fetches live weather data (Temperature, Wind Speed, Sky Conditions) for the visitor's location using the Open-Meteo API.
- **Intelligent Unit Conversion**: Automatically detects if the visitor is in the **United States** and switches units to Imperial (°F, mph). For all other locations, it defaults to Metric (°C, km/h).

### 4. Sherlock OSINT Module (`sherlock_module.py`)
A functional Open Source Intelligence (OSINT) tool that allows users to perform cross-platform reconnaissance.
- **Multi-Platform Search**: Executes advanced Google Dork queries to find a username across **Instagram, Twitter, LinkedIn, Facebook, GitHub, TikTok, Reddit, Pinterest, YouTube, and Tumblr**.

### 5. Immersive Visuals
- **Matrix Rain Effect**: A custom HTML5 Canvas implementation of the iconic "digital rain" effect, running smoothly in the background to enhance the cyberpunk atmosphere.
- **Terminal UI**: Authentic command-line interface design with blinking cursors, monospaced fonts, and retro color schemes.

## 🛠️ Technical Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Mapping**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet](https://leafletjs.com/)
- **APIs**:
  - **ipapi.co**: For IP address and initial geolocation data.
  - **Open-Meteo**: For real-time weather data.
  - **Nominatim (OpenStreetMap)**: For reverse geocoding (County extraction).

## 📦 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 License

This project is open-source and available under the MIT License.
