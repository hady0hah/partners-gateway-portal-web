# Partners Portal

## Overview

The Partners Portal is a web application built using **Vue.js** and **Vuetify** for the frontend, with **Axios** for handling API requests. The project communicates with a **Symfony** backend, utilizing **Sonata Admin** for managing administrative operations. It supports receiving forms, performing CRUD operations, validating forms, and displaying form error messages.

## Features

- **Customers**: Manage customer information and interactions.
- **Owners**: Manage ownership details and assignments.
- **MDF**: Manage Market Development Funds and associated operations.
- **Deals**: Create, update, and manage deals.
- **Demos**: Manage product demos and related data.
- **Forecasting**: Forecast sales and other metrics.
- **Budgets**: Manage and track budgets.
- **Products**: Add, update, and delete products.
- **Programs**: Manage programs and initiatives.
- **Sales**: Track sales data and progress.
- **Dashboard**: View real-time data and performance insights.

## Technologies

- **Frontend**:
  - Vue.js: JavaScript framework for building user interfaces.
  - Vuetify: Material Design component framework for Vue.js.
  - Axios: HTTP client for making requests to the backend.
  - Event Bus: Used for cross-component communication.
  - Emits: For emitting custom events across the application.
  - Components: Modular UI components for a maintainable structure.

- **Backend**:
  - Symfony: PHP framework used for the backend.
  - Sonata Admin: Provides a powerful admin panel to manage backend data.

## Features in Detail

- **Form Operations**: 
  - Receive form data from users for different entities (e.g., customers, deals, products).
  - Handle form validations and display error messages.
  - CRUD operations are performed via the backend using Axios.

- **Dashboard**: 
  - A central place for tracking performance, sales, forecasting, and other key metrics.

- **Event-driven Architecture**: 
  - The application utilizes Vue.js’s event bus to manage communication between components.

## Prerequisites

To run this project, you need:

- Node.js and npm
- MySQL or any supported database

## Usage

### Frontend

1. Install dependencies:
   ```bash
   npm install
