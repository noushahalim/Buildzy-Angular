# Buildzy

Buildzy is a web application built with Angular 16 that helps users connect with skilled engineers and browse available properties. The platform is designed to facilitate the process of hiring engineers for various tasks and buying properties from engineers who have them for sale. Buildzy includes modules for users, engineers, and administrators, each with specific functionalities.

## **Table of Contents**
- [Features](#features)
  - [User Modules](#user-modules)
  - [Engineer Modules](#engineer-modules)
  - [Admin Modules](#admin-modules)
  - [Additional Modules](#additional-modules)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## **Features**

### **User Modules**
- **User Management**
  - Signup/Login
  - Profile Management (Edit profile details)
- **Work Request**
  - Search for engineers (filters: location, work experience)
  - Post a work request (details, budget)
  - View work requests (past and present)
  - Work details page (full details, status updates)
  - Chat with engineer team (text, video call)
  - Review engineers after work completion
  - Payment to engineer
- **Property Search**
  - Browse all properties (rooms, flats, complexes, buildings)
  - Filter properties (location, type, price)
  - Property details page (full details, images)
  - Chat with seller (text)
  - Purchase property
  - Payment for property
- **User Dashboard**
  - View all work requests and purchased properties (with links to details)
  - Manage account settings

### **Engineer Modules**
- **Engineer Management**
  - Edit profile (details, team information, portfolio)
  - Add work examples (images, descriptions)
- **Work Management**
  - View all work requests
  - Accept/decline work requests
  - Update work status with details
  - Chat with users (text)
- **Property Management**
  - Add properties for sale (details, images)
  - Manage property listings
- **Engineer Dashboard**
  - View committed works (accepted requests)
  - View sold properties
  - Manage account settings

### **Admin Modules**
- **User Management**
  - View all users
  - Ban/suspend users
- **Engineer Management**
  - View all engineer signup requests
  - Approve/reject engineer signups
  - View all engineers
  - Ban/suspend engineers
- **Content Management**
  - Manage system settings (categories, locations, etc.)

### **Additional Modules**
- **Authentication and Authorization**
  - Secure user login with role-based access control (RBAC) using JWT tokens
- **Chat Functionality**
  - Real-time messaging with video call integration
- **Payment Gateway**
  - Secure payment processing for user payments to engineers and property sellers
- **Notification System**
  - Notifications for work status updates, property updates, chat messages, etc. (optional)

## **Installation**

1. Clone the repository:
    ```bash
    git clone https://github.com/noushahalim/Buildzy-Angular.git
    cd Buildzy-Angular
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    ng serve
    ```
    The application will be available at `http://localhost:4200`.

## **Usage**

- Navigate to `http://localhost:4200` in your browser.
- Signup as a user, engineer, or log in as an admin to access different features.
- Explore the functionalities based on the role.

## **Contributing**

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

Please make sure your code follows the project's coding standards and passes all tests.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
