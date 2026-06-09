# DataOrbit 🌍🛰️

> **DataOrbit** is a B2B satellite data marketplace platform. It allows companies and developers to rent capacity from real satellites without needing their own infrastructure. Users can select the satellite, data type, access period, and integrate via API, webhook, or direct download.

This project was developed as the MVP for the **Global Solution 2026/1** academic delivery at **FIAP** (Software Engineering), themed around the Space Economy.

## 🚀 Features

*   **Interactive 3D Globe**: Real-time visualization of satellite orbits using Three.js.
*   **Marketplace Catalog**: Browse through a simulated database of 3,200+ real-world satellites.
*   **Filtering & Searching**: Easily find data by category (Imagery, Climate, Connectivity, etc.).
*   **Checkout Flow**: Seamless process for selecting access options, periods, and integration types.
*   **Theming**: Dynamic Dark/Light mode support.
*   **Internationalization**: Multi-language support structure (English default).

## 🛠️ Technology Stack

*   **HTML5 & CSS3** (Vanilla)
*   **JavaScript** (ES6+ Vanilla)
*   **Tailwind CSS** (via CDN for rapid UI styling)
*   **Three.js** (for 3D globe rendering)
*   **Google Fonts** (DM Sans) & **Material Symbols**

## 📂 Project Structure

*   `index.html`: The main landing page.
*   `pages/`: Contains all subpages (`marketplace.html`, `satellite.html`, `checkout.html`, `login.html`).
*   `assets/`: Images, logos, textures, and favicons.
*   `css/`: Custom stylesheets (`styles.css`).
*   `javascript/`: Core logic, divided into `components/`, `pages/`, `utils/`, and mock `data/`.

## ⚙️ How to Run Locally

Since this project relies on vanilla HTML/JS and CDNs, it requires no build process.

1.  Clone this repository:
    ```bash
    git clone https://github.com/Grupo-GLYFFS/GlobalSolution.git
    cd GlobalSolution
    ```
2.  Open the project using a local development server (e.g., VS Code Live Server, or Python's `http.server`):
    ```bash
    python -m http.server 8000
    ```
3.  Open your browser and navigate to `http://localhost:8000`.

## 🧑‍💻 Development Notes

*   **Design System**: The project follows strict guidelines outlined in our design system documents (spacing base of 4px/8px, monochrome base palette, DM Sans typography).
*   **Components**: We use vanilla JavaScript to load and manage components (like navbars and footers) to maintain a DRY codebase without a heavy framework.

---
*Created by [FIAP Software Engineering Students]*
