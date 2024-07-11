# Health Appointment

Health Appointment is a web application designed to facilitate booking medical appointments in Dakar. This project is built using Next.js and MongoDB, with features for both patients, secretaries and doctors.

The app is done using information of Senegalese hospitals and characters.

## Table of Contents
- [Preview](#preview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Authentication](#authentication)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Deployment](#deployment)

## Preview
<table>
  <tr>
    <td><img src="/preview1.webp" alt="preview1" width="200"/></td>
    <td><img src="/preview2.webp" alt="preview2" width="200"/></td>
  </tr>
  <tr>
    <td><img src="/preview3.webp" alt="preview3" width="200"/></td>
    <td><img src="/preview4.webp" alt="preview4" width="200"/></td>
  </tr>
</table>


## Features
- User registration and login
- Appointment booking and management
- Requests Management for secretaries

## Getting Started

### Prerequisites
- Node.js v14.x or later
- MongoDB

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Josh012006/Appointment-App.git
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env.local` file in the root of your project and add the following variables:
    ```bash
    EMAIL_USER=your_email
    EMAIL_PASSWORD=your_email_password_for_nodemailer_see_https://www.youtube.com/watch?v=QDIOBsMBEI0&t=707s
    MONGO_URI=your_mongo_uri
    NEXT_PUBLIC_DISTANCE_MATRIX_API_KEY=your_distance_matrix_api_from_https://distancematrix.ai/
    NEXT_PUBLIC_API_URL='http://localhost:3000'
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Keeping track of appointments and consultations
Each user has a calendar to keep track of its planned appointments or consultations.

### Booking Appointments
- Patients can book appointments with doctors.
- Doctors' secretaries can manage the requests.
- The Doctors can see the planned consultations and the patient's infos.


## Authentication

### Cookie-based Authentication
- User authentication is handled using cookies with the `js-cookie` library.

## Technologies Used
- Next.js
- MongoDB
- Tailwind CSS
- Mongoose
- Nodemailer (for sending emails)
- bcrypt (for encrypting passwords)
- Redux Toolkit (for managing global state of the app)
- js-cookie (for handling cookies)

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new Pull Request

## Deployment
You can see the final product on https://health-appointment.vercel.app/

Hope you enjoy! And give a star 🌟💫 to the repository if possible!
