# 🌾 HarvestHub

**HarvestHub** is a comprehensive agricultural management dashboard designed to streamline the tracking of harvest yields, farmer data, land allocation, and commodity transactions.

> **Note:** This is a frontend demonstration using a **Dummy Database** (Mock Data). It simulates a CRUD environment but is not currently connected to a live backend server.

## 🔗 Live Demo
**Access the public application here:**
### [🚀 https://harvesthubid.vercel.app/](https://harvesthubid.vercel.app/)

---

## ✨ Key Features

### 1. 🔐 Authentication & Security
* **Login Interface:** Clean UI with Logo, Email, and Password fields.
* **UX Experience:** * Real-time input validation.
    * Clear, user-friendly error messages for invalid credentials.

### 2. 📊 Dashboard Overview
Get a bird's-eye view of operations with summary cards and metrics:
* **Total Transactions:** Count of all harvest records.
* **Total Farmers:** Registered active farmers.
* **Total Commodities:** Crops currently managed.
* **Total Land Area:** Count of registered field units.
* *Optional:* Monthly transaction volume chart.

### 3. 👨‍🌾 Farmer Management
Manage the workforce effectively.
* **List View:** Display names and addresses with a Quick Search bar.
* **Actions:** Floating Action Button (FAB) for adding new farmers.
* **Data Integrity:** * Prevents duplication of farmer names.
    * Ensures transactions cannot be created without a valid linked farmer.

### 4. 🗺️ Land & Territory
Track agricultural zones.
* **Land Codes:** Unique identifiers for every plot of land.
* **Location:** Physical location mapping for every code.
* **Relation:** Directly linked to harvest transactions.

### 5. 🌽 Commodity Pricing
Manage market rates.
* **Catalog:** List of available crops (e.g., Rice, Corn, Chili).
* **Pricing:** Set and update the **Price per Kg** for automated calculations.

### 6. 📝 Harvest Transaction (3-Step Wizard)
A robust data entry system designed to reflect **3NF (Third Normal Form)** database logic.

* **Step 1: Transaction Info**
    * Auto-generated Transaction ID.
    * Date selection.
    * Farmer selection (Dropdown).
    * Land Code selection (Dropdown).
    * Collector Name input.
* **Step 2: Commodities (Repeater)**
    * Add multiple commodities to a single transaction.
    * Input Weight (kg).
    * **Auto-Calculation:** Subtotal is calculated instantly based on the commodity's current price.
* **Step 3: Confirmation**
    * Review transaction summary.
    * View Grand Total.
    * Save to database.

### 7. 📄 Transaction Details
* **Read-Only View:** A detailed receipt view of past transactions.
* **Data Joining:** Displays joined data (Farmer Name, Land Location) alongside numerical data.

### 8. 📈 Reports & Analysis
Generate insights based on filtered data.
* **Filters:** Filter by Date Range, Specific Farmer, or Commodity type.
* **Output:** Detailed list of filtered transactions and **Total Revenue** calculation.

---

## 🛠️ Tech Stack

* **Framework:** React (Vite)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Icons:** Lucide React / Heroicons
* **Data:** Local Mock Data / JSON

---

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/tiqdy/harvesthub.git](https://github.com/tiqdy/harvesthub.git)
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 👤 Author

**Atiqah Pramudya**

* **Project:** HarvestHub
* **Role:** Student
---

## 📄 License

Copyright © 2025 **Atiqah Pramudya**.

This project is created for educational and portfolio purposes. All rights reserved.
