# Welcome to HaxDock 👋

![](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&align=center&titleAlign=center&fontSize=20&lineHeight=14&lineCount=2&theme=ayu&width=500&bg=%230B0E14&titleColor=%231c9eff&line1=typescript%2Ctypescript%2Cauto%3Breact%2Creact%2Cauto%3Bnestjs%2Cnestjs%2CE0234E&line2=graphql%2Cgraphql%2CE10098%3Bprisma%2Cprisma%2Cffffff%3Bmongodb%2Cmongodb%2Cauto%3Bdocker%2Cdocker%2Cauto%3B)

## ❓Why

- **Lack of Flexible Tools:** The project was born out of a lack of flexible solutions for creating rooms that are easy to use, scalable, and encourage code organization.
- **Developer Community:** The desire to create a project that not only facilitates individual work but also fosters the exchange of experiences and collaboration within the developer community.
- **Education and Skill Development:** The motivation to support the development of programming skills by providing clear project patterns, understandable documentation, and practical tools, utilizing a cutting-edge tech stack through which I enhanced my own skills.

## 📖 Project description

- The project aims to deliver a scalable platform for creating rooms (game servers), facilitating easy addition of new features and areas.
- Emphasis is placed on user-friendliness, providing an intuitive API, maintaining code consistency while ensuring code aesthetics to enhance readability.

#### Concept of "sharedable"

To simplify working with multiple rooms that have unique code, the concept of the "sharedable" folder has been introduced. This folder contains hooks and functions shared across all rooms.
For example, when the project includes 10 different rooms with individual files, managing them becomes a challenge, making it difficult to maintain a consistent structure and functionality. In this context, the "sharedable" folder becomes crucial, not only making it easier to maintain uniform code but also streamlining the process of opening and managing different rooms through a central access point to shared resources.

#### Strong Type Safety

To increase code safety and quality, the project implements strong type safety mechanisms at all levels. In practice, this means that all data operations are tightly bound to their types, eliminating many potential errors during compilation and facilitating code understanding and maintenance. With strong type safety, developers can be confident they are using the correct data types, resulting in more reliable and efficient code.

---

#### Room as a HaxBall Server

In the context of this project, a "room" refers to a server hosted on the HaxBall platform. HaxBall provides a powerful API (Application Programming Interface) through its Headless Host, allowing developers to create custom game rooms and implement bots that operate within these rooms.

#### HaxBall Headless Host API

The HaxBall Headless Host API, documented [here](https://github.com/haxball/haxball-issues/wiki/Headless-Host), serves as the foundation for interacting with HaxBall servers programmatically. This API exposes various events and functions that developers can leverage to control and manipulate game rooms.

---

The project goal, therefore, encompasses not only the ease of managing and expanding rooms through the "sharedable" concept but also a commitment to code safety and quality by implementing strong type safety at all stages of application development.

## 💻 Project workflow

![Schema](https://media.discordapp.net/attachments/1159211106087215204/1207000323785490473/image.png?ex=65de0da6&is=65cb98a6&hm=dd888a0b504c51d04930cd0ecb1af24bdadeec674a5070872c59eb2fba968161&=&format=webp&quality=lossless&width=1810&height=888)
