# Buildzy

Buildzy is a web application built with Angular 16 that helps users connect with skilled engineers. The platform is designed to facilitate the process of hiring engineers for various tasks. Buildzy includes modules for users and engineers, each with specific functionalities.

## **Table of Contents**
- [Features](#features)
  - [User Modules](#user-modules)
  - [Engineer Modules](#engineer-modules)
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
  - Search for engineers (filters: location, work experience, rating)
  - Post a work request (details, budget)
  - View work requests (past and present)
  - Work details page (full details, status updates)
  - Accept work request forms created by engineers based on user preferences
  - Chat with engineer team (text, video call)
  - Review engineers after work starts and after work completion
  - Invoice download option
- **User Dashboard**
  - View all work requests (with links to details)
  - Manage account settings

### **Engineer Modules**
- **Engineer Management**
  - Edit profile (details, team information)
- **Work Management**
  - View all work requests
  - Create and send work request forms based on user preferences
  - Accept/decline work requests
  - Update work status with details
  - Chat with users (text, video call)
- **Engineer Dashboard**
  - View committed works (accepted requests)
  - Manage account settings

### **Additional Modules**
- **Authentication and Authorization**
  - Secure user login with role-based access control (RBAC) using JWT tokens
- **Chat Functionality**
  - Real-time messaging with video call integration
- **Notification System**
  - Notifications for work status updates, chat messages, etc.

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
    ng serve --port 5003
    ```
    The application will be available at `http://localhost:5003`.

## **Usage**

- Navigate to `http://localhost:5003` in your browser.
- Signup as a user or engineer to access different features.
- Explore the functionalities based on the role.

## **Live Application**

You can access the live application at [https://buildzy.solutions](https://buildzy.solutions).

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
