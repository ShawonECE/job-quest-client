# JobQuest

### Live Link

```
https://job-quest1.netlify.app
```

## Introduction

Welcome to JobQuest, your go-to platform for finding the perfect job! Whether you’re a seasoned professional or just starting your career journey, we’ve got you covered. Our mission is to connect talented individuals with exciting job opportunities across various industries.

## Top Features

- Users can search for jobs and find job listings by category.
- Employers can post job opportunities directly on the platform and manage their posted jobs, including viewing, updating, or deleting listings.
- Job seekers can apply to jobs seamlessly through the platform and can download a summary of their applied jobs as a PDF.
- View applied jobs by filtering based on job categories (e.g., On-Site, Remote, Hybrid).
- User's posted jobs or applications data is secured by jwt.

## Used packages

- React-pdf to implement download of applied jobs summary.
- React Hook Form to handle forms with ease.
- Tanstack query to manage fetched data states.
- Axios to handle API requests.
- Framer-motion to show beautiful transition in home page.

## Running Locally

### Prerequisites:

This project uses Vite for development and build processes. To clone and run the Compass project locally, follow these steps:

- Node.js (version 18 or above) installed on your system. You can check your version by running `node -v` in your terminal.
- Git version control installed.

### Steps:

1. Clone the Repository: Open your terminal and navigate to your desired directory. Then, clone the Compass repository using the following command.
    ```
    git clone https://github.com/ShawonECE/job-quest-client.git
    ```
2. Install Dependencies: Navigate to the cloned project directory.
    ```
    cd compass-client
    ```
    Install all project dependencies using npm or yarn:
    ```
    npm install  # or yarn install
    ```
3. Set Up Firebase Configuration (Important): This project relies on Firebase for authentication features. To use Firebase functionalities, you'll need to configure it with your own project's credentials. Here's how: 
    - Create `.env.local`: In your project directory (where you cloned the repository), create a new file named `.env.local`.
    -  Define Firebase Configurations: Inside the `.env.local` file, define each Firebase configuration property with its corresponding value. Here's an example:
        ```
        VITE_API_KEY=your_api_key
        VITE_AUTH_DOMAIN=your_auth_domain
        VITE_PROJECT_ID=your_project_id
        VITE_STORAGE_BUCKET=your_storage_bucket
        VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
        VITE_APP_ID=your_app_id
        ```
    #### Important Note
    - Replace `your_api_key`, `your_auth_domain`, etc. with your actual Firebase project configuration values.
    - Never commit the `.env.local` file to your version control system (e.g., Git) as it contains sensitive information.

5. Development Server: With the `.env.local` file in place, you can start the development server as usual:
    ```
    npm run dev  # or yarn dev
    ```
