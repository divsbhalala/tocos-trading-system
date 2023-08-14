# Toco's Trading System

This project is a small-scale simulation of Toco's trading system, a digital platform for managing carbon mitigation assets (Tocos). It allows users to create accounts, perform transactions, and manage their Toco balances.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Dockerization](#dockerization)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm or yarn
- MongoDB (running or accessible)

## Getting Started

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/tocos-trading-system.git

1. Clone this repository:
   ```bash
   cd tocos-trading-system

3. Install dependencies:
      ```bash
   
       npm install
### Dockerization

1. Running the Application using Docker:
    ```bash
     docker-compose up -d

### Testing

1. Run the test cases using the following command:
    ```bash
       npm test
   
### API Endpoints
        POST /users: Create a new user with an initial balance of Tocos.
        Request Body: {"name": "Alice", "balance": 100}
        GET /users/{id}: Retrieve details of a user.
        POST /transactions: Perform a transaction between two users.
        Request Body: {"senderId": "user1Id", "receiverId": "user2Id", "amount": 50}

### Docker Setup doc 
https://docs.docker.com/engine/install/ubuntu/