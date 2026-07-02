Hello! This is a university (UNIFACISA) group project that consist of a Spring Boot Rest API coupled with a React Frontend with TypeScript. It is about a Sales System where an authenticated employee can make sales and view all the available products
and an employee with admin access can perform Create, Update and Delete operations on Products and Employees and, also, Delete Sales.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://sales-system-unifacisa-fullstack-fr.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Online-blue)](https://comfortable-celebration-production-62bc.up.railway.app/)

## Demo Accounts

Default users for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mail.com | admin123 |
| Employee | employee@mail.com | admin123 |

## Technologies Used and Version:

### Backend
- Java 21
- Spring Boot 4.0.6
- Spring Security (JWT Authentication)
- Spring Data JPA
- Hibernate
- MySQL
- MapStruct
- Bean Validation

### Frontend
- React 19
- TypeScript 5.8
- Vite
- Express


### Authorization
 ```text
                   Employee
               ----------------
               id
               password
               firstName
               lastName
               email
               address
               role
                     |
          -----------------------
          |                     |
   ROLE_EMPLOYEE          ROLE_ADMIN
          |                     |
          |                     |
  - View products       - View products
  - Create sales        - Create sales
  - View sales          - View sales
                        - Create products
                        - Update products
                        - Delete products
                        - Create employees
                        - Update employees
                        - Delete employees
                        - Delete sales
```
