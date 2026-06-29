# 🎫 NextTrip - Online Ticket Booking Platform

A full-stack MERN-based Online Ticket Booking Platform where users can discover, book, and pay for travel tickets including Bus, Train, Launch, and Plane tickets. The platform supports three different roles: **User**, **Vendor**, and **Admin**, each with their own dashboard and management features.

## 🌐 Live Demo

* Live Site: https://online-tbp-client.vercel.app/
* Client Repository: https://github.com/raklinchakma021-pixel/online-ticket-booking-platform
* Server Repository: https://github.com/raklinchakma021-pixel/serverof-online-ticket-booking-platform

---

## 📌 Project Purpose

NextTrip simplifies the process of finding and booking transportation tickets online. Users can browse available tickets, make bookings, complete payments through Stripe, and track transactions. Vendors can manage their tickets and booking requests, while administrators oversee the entire platform through moderation and management tools.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

* BetterAuth authentication system
* Email & Password Login
* Google Social Login
* Role-based access control (User, Vendor, Admin)
* Protected routes
* JWT-secured APIs

### 🏠 Home Page

* Hero Banner Slider
* Advertisement Section (Admin-controlled)
* Latest Tickets Section
* Popular Routes Section
* Why Choose Us Section
* Fully Responsive Design

### 🎟 Ticket Management

* View all approved tickets
* Search tickets by From → To location
* Filter tickets by transport type
* Sort tickets by price (Low → High / High → Low)
* Pagination support
* Detailed ticket information page
* Departure countdown timer

### 👤 User Dashboard

* User Profile
* My Booked Tickets
* Booking Status Tracking
* Stripe Payment Integration
* Transaction History
* Booking Countdown
* Payment Restriction After Departure Time

### 🏢 Vendor Dashboard

* Vendor Profile
* Add New Tickets
* Update/Delete Tickets
* Booking Request Management
* Accept/Reject Booking Requests
* Revenue Overview
* Charts & Analytics

### 👑 Admin Dashboard

* Admin Profile
* Manage Tickets
* Approve/Reject Tickets
* Manage Users
* Promote Users to Vendor/Admin
* Mark Fraud Vendors
* Advertise Tickets
* Limit Advertisement to Maximum 6 Tickets

### 💳 Payment System

* Stripe Payment Gateway
* Secure Payment Processing
* Transaction Tracking
* Automatic Ticket Quantity Reduction After Successful Payment

### 🌙 Additional Features

* Dark / Light Mode
* Loading Spinners
* Error Pages (404)
* Responsive Dashboard Layout
* Mobile-Friendly Design
* Image Upload via ImgBB
* Countdown Timers
* Dynamic Statistics & Charts

---

## 🛠️ Technologies Used

### Frontend

* Next.js 15
* React 19
* Tailwind CSS
* HeroUI
* Next Themes
* React Hook Form
* React Toastify
* Swiper.js
* Axios
* BetterAuth

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Stripe API
* CORS
* Dotenv

### Database

* MongoDB Atlas

### Deployment

* Vercel (Frontend)
* Render / Railway / VPS (Backend)

---

## 📂 Project Structure

```
client/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── providers/
│   └── hooks/

server/
├── routes/
├── middleware/
├── controllers/
├── utils/
└── index.js
```

---

## 🔑 Environment Variables

### Client (.env.local)

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
BETTER_AUTH_URL=
```

### Server (.env)

```
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

## 📸 Major Functionalities

### User

* Register & Login
* Browse Tickets
* Book Tickets
* Make Payments
* View Transactions
* Track Booking Status

### Vendor

* Add Tickets
* Manage Tickets
* Handle Booking Requests
* Track Revenue

### Admin

* Manage Users
* Manage Tickets
* Advertise Tickets
* Monitor Platform Activities

---

## 📊 Dashboard Analytics

The platform provides visual analytics including:

* Total Tickets Added
* Total Tickets Sold
* Revenue Statistics
* Booking Trends
* Vendor Performance

---

## 🔒 Security Features

* JWT Protected APIs
* Role-Based Authorization
* Secure Environment Variables
* Protected Dashboard Routes
* MongoDB Credential Protection
* Secure Stripe Payment Integration

---

## ⚡ Installation & Setup

### Clone Repository

```bash
git clone <client-repository-url>
git clone <server-repository-url>
```

### Install Dependencies

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
npm install
npm start
```

---

## 🧪 Test Credentials

### Admin

Email: [admin@example.com](mailto:admin@example.com)

Password: ********

### Vendor

Email: [vendor@example.com](mailto:vendor@example.com)

Password: ********

---

## 🎯 Assignment Requirements Completed

✅ BetterAuth Authentication

✅ Google Login

✅ Role-Based Dashboard

✅ Ticket Booking System

✅ Stripe Payment Integration

✅ JWT Protected APIs

✅ Search Functionality

✅ Filter Functionality

✅ Sort by Price

✅ Pagination

✅ Dark/Light Theme

✅ Responsive Design

✅ Loading States

✅ Error Handling

✅ Advertisement System

✅ Revenue Analytics

---

## 👨‍💻 Developer

Developed as part of the **A10_CAT-005 Online Ticket Booking Platform Assignment** using the MERN Stack.

Thank you for visiting this project! ⭐
