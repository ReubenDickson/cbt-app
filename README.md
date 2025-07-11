# Computer-Based Testing System  

## Overview  
This project is a Computer-Based Testing (CBT) system designed for a University. The application provides a platform for students to take exams online, while administrators can manage exams, questions, and results efficiently.  

## Purpose  
The CBT system is developed as a portfolio project to showcase my Backend and DevOps engineering skills. It demonstrates proficiency in building scalable, secure, and efficient web applications using modern technologies.  

## Features  
- **Student Features**:  
    - User authentication and authorization  
    - Take exams online  
    - View exam results  

- **Admin Features**:  
    - Manage users (students and administrators)  
    - Create and manage exams  
    - Add, edit, and delete questions  
    - View and export results  

## Tech Stack  
- **Backend**: Node.js with Express.js  
- **Database**: MongoDB  
- **DevOps**: Docker, CI/CD pipelines, and deployment automation  

## Installation  

### Prerequisites  
- Node.js (v16 or higher)  
- MongoDB  
- Docker (optional for containerized deployment)  

### Steps  
1. Clone the repository:  
     ```bash  
     git clone https://github.com/ReubenDickson/cbt-app.git  
     cd cbt-app  
     ```  

2. Install dependencies:  
     ```bash  
     npm install  
     ```  

3. Configure environment variables:  
     Create a `.env` file in the root directory and add the following:  
     ```env  
     MONGO_URI=your_mongodb_connection_string  
     JWT_SECRET=your_jwt_secret  
     PORT=3000  
     ```  

4. Start the application:  
     ```bash  
     npm start  
     ```  

5. Access the application at `http://localhost:3000`.  

## DevOps Workflow  
- **Containerization**: The application is containerized using Docker for consistent deployment across environments.  
- **CI/CD**: Automated pipelines are set up for testing, building, and deploying the application.  
- **Monitoring**: Tools like Prometheus and Grafana are integrated for application monitoring.  

## Future Improvements  
- Add support for multiple-choice and essay questions.  
- Implement real-time monitoring of exams.  
- Enhance security with role-based access control (RBAC).  
- Deploy the application on cloud platforms like AWS or Azure.  

## License  
This project is licensed under the MIT License.  

## Contact  
For any inquiries, feel free to reach out:  
- **Email**: reubendicksonebong@gmail.com  
- **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/reuben-dickson-10b071106/)  
- **GitHub**: [Your GitHub Profile](https://github.com/ReubenDickson)  
