# 👋 Welcome to HaxDock - scalable way for HaxBall Rooms

![](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&align=center&titleAlign=center&fontSize=20&lineHeight=14&lineCount=2&theme=ayu&width=500&bg=%230B0E14&titleColor=%231c9eff&line1=typescript%2Ctypescript%2Cauto%3Breact%2Creact%2Cauto%3Bnestjs%2Cnestjs%2CE0234E&line2=graphql%2Cgraphql%2CE10098%3Bprisma%2Cprisma%2Cffffff%3Bmongodb%2Cmongodb%2Cauto%3Bdocker%2Cdocker%2Cauto%3B)

## 💻 Workflow

![Schema](https://i.imgur.com/1vW2zNX.png)

## 📰 Structure

- [room-manager](https://github.com/SMALIE/haxdock/tree/main/manager#readme) - Manages room containers
- [server](https://github.com/SMALIE/haxdock/tree/main/server#readme) - Backend server functionality
- [website](https://github.com/SMALIE/haxdock/tree/main/website#readme) - Frontend web application
- [rooms](https://github.com/SMALIE/haxdock/tree/main/rooms#readme) - Source code for haxball rooms

## ❓ Why

- **Lack of Flexible Tools:** The project was born out of a lack of flexible solutions for creating rooms that are easy to use, scalable, and encourage code organization.
- **Developer Community:** The desire to create a project that not only facilitates individual work but also fosters the exchange of experiences and collaboration within the developer community.
- **Education and Skill Development:** The motivation to support the development of programming skills by providing clear project patterns, understandable documentation, and practical tools, utilizing a cutting-edge tech stack through which I enhanced my own skills.

## 📖 Description

- The project aims to deliver a scalable platform for creating rooms (game servers), facilitating easy addition of new features and areas.
- Emphasis is placed on user-friendliness, providing an intuitive API, maintaining code consistency while ensuring code aesthetics to enhance readability.

#### Concept of "sharedable"

To simplify working with multiple rooms that have unique code, the concept of the "sharedable" folder has been introduced. This folder contains hooks and functions shared across all rooms.
For example, when the project includes 10 different rooms with individual files, managing them becomes a challenge, making it difficult to maintain a consistent structure and functionality. In this context, the "sharedable" folder becomes crucial, not only making it easier to maintain uniform code but also streamlining the process of opening and managing different rooms through a central access point to shared resources.

#### Strong Type Safety

To increase code safety and quality, the project implements strong type safety mechanisms at all levels. In practice, this means that all data operations are tightly bound to their types, eliminating many potential errors during compilation and facilitating code understanding and maintenance. With strong type safety, developers can be confident they are using the correct data types, resulting in more reliable and efficient code.

#### End2End Type Safety

The End-to-End Type Safety approach encompasses full consistency of data types throughout the application stack. The goal is to maintain a single source of truth regarding types across all layers of the application. Ideally, this consistency should be automatically maintained in the event of changes to the database schema.

---

#### Room as a HaxBall Server

In the context of this project, a "room" refers to a server hosted on the HaxBall platform. HaxBall provides a powerful API (Application Programming Interface) through its Headless Host, allowing developers to create custom game rooms and implement bots that operate within these rooms.

#### HaxBall Headless Host API

The HaxBall Headless Host API, documented [here](https://github.com/haxball/haxball-issues/wiki/Headless-Host), serves as the foundation for interacting with HaxBall servers programmatically. This API exposes various events and functions that developers can leverage to control and manipulate game rooms.

---

The project goal, therefore, encompasses not only the ease of managing and expanding rooms through the "sharedable" concept but also a commitment to code safety and quality by implementing strong type safety at all stages of application development.

## ⚙️ Configuration of GitHub Actions Secrets

To configure the GitHub Actions secrets for your project, follow these steps:

1. **SSH User (secrets.SSH_USER):**
   - This should be the username of the VPS (Virtual Private Server) you are using to host your HaxDock application.

2. **SSH Host (secrets.SSH_HOST):**
   - Use the IP address of your VPS as the value for this secret. This is the host where your application will be deployed.

3. **SSH Key (secrets.SSH_KEY):**
   - This secret requires the private key for SSH access to your VPS. Follow these steps to set it up:
     - Generate an SSH key pair on your local machine if you haven't already using the following command:
       ```
       ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
       ```
     - Copy the contents of the public key (by default, it's stored in `~/.ssh/id_rsa.pub`).
     - Add the public key to the `~/.ssh/authorized_keys` file on your VPS to enable authentication.
     - Copy the private key (by default, it's stored in `~/.ssh/id_rsa`) and add it as the value for the `secrets.SSH_KEY` secret in your GitHub repository.
