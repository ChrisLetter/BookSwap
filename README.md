# BookSwap

## About the Project

BookSwap is an open source project that allows users to exchange books. Unlike other similar services BookSwap is focused on multi-book swap, user can add books that they would like to sell and books that they would like to buy, based on that the algorithm will give them the best matches, so that they can exchange multiple books in one single transaction. Books can be added manually or by scanning the ISBN bar code with the phone camera.

### Built with:

- Front end - React Native, Expo
- Back end - Express, MongoDB, Mongoose
- Others - Google Books API, JWT

## Getting Started:

### Prerequisites:

- Google books API key
- One of the following: ios emulator, android studio or expo go installed on your phone

### Installation

1. Clone the repo
   ```
   git clone https://github.com/ChrisLetter/BookSwap.git
   ```
2. Create an .env file in the client folder and one in the server folder, using as template the .env.example file
3. Create a MongoDb database
4. Install the packages running npm install both in the client and in the server folder
5. Run the application:
   ```
   BookSwap/BookSwapServer % nodemon
   ```
   ```
   BookSwap/BookSwapServer % expo start
   ```
6. Once you run the command "expo start", you can open the app with an emulator or you can scan the QR code with your phone using expo go (you need to download it from the app store or from the play store)


## Screenshots:

![login](screenshots/login.png?raw=true) ![library](screenshots/library.png?raw=true) ![add-new-book](screenshots/add-new-book.png?raw=true) ![isbn](screenshots/isbn.png?raw=true) ![matches](screenshots/matches.png?raw=true) ![requestpage](screenshots/request-page.png?raw=true) ![chat](screenshots/chat.png?raw=true)

