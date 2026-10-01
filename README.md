# DriveNest Automotive Platform

![DriveNest Platform Showcase](site.jpg)

DriveNest is a full stack automotive rental and marketplace application built with Next.js, React, TypeScript, and Tailwind CSS. The platform features verified real world vehicle catalogs covering production years from 1990 to 2026, authentic transparent vehicle imagery, loan financing calculators, and an operations management console.

## Overview

DriveNest delivers a modern vehicle discovery and booking experience. The platform combines verified manufacturer vehicle specifications, generation tracking, and intuitive rental workflows.

## Key Features

* Real World Vehicle Catalog covering verified models from 1990 to 2026
* Accurate manufacturer generation and platform codes
* Transparent background authentic vehicle photography
* Advanced multi tab search console with multi parameter filtering
* Interactive loan financing and monthly payment calculator
* Instant vehicle listing modal for sellers
* Responsive operations management console with revenue analytics
* Real time vehicle insights powered by Gemini AI

## Structured Vehicle Schema

Every vehicle in the catalog is stored using a standardized structured data schema:

* Unique Vehicle Identifier
* Manufacturer and Official Model Name
* Generation and Platform Code
* Model Year
* Trim Specification
* Body Type and Vehicle Class
* Fuel Type, Transmission, and Drivetrain
* Engine Details including displacement, cylinders, horsepower, and torque
* Seating Capacity and Door Count
* Production Start and End Years
* Electric and Hybrid Classification Flags
* Rental Terms including daily rates, driver age minimums, and security deposit rules
* Verified Image Metadata with authentic source attribution

## Tech Stack

* Framework: Next.js 13 with App Router
* Language: TypeScript
* Styling: Tailwind CSS
* Icons: Lucide React
* Headless UI Components: Headless UI
* Artificial Intelligence: Google Gen AI SDK

## Project Setup

### Prerequisites

Ensure Node.js version 18 or higher is installed on your system.

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/example/drivenest.git
cd drivenest
```

2. Install project dependencies:

```bash
npm install
```

3. Set up environment variables by copying the example environment configuration:

```bash
cp .env.example .env.local
```

4. Launch the local development server:

```bash
npm run dev
```

5. Open your browser and navigate to:

```text
http://localhost:3000
```

## Production Build

To compile and build the application for production deployment:

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License.
