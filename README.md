# FaceFlicker
Hackathon Project for 2023 VTHacks: https://devpost.com/software/faceflicker

## Development setup instructions:
Several steps are required to test the app in the current development state. To run the app, you will need to clone the repository and install the packages for the front-end via `npm install`. 
Docker compose is used to start the docker containers for the database and image search model, with the flask backend running on the same computer. The api endpoint url used in the react native frontend should be modified to reference the 
server running the backend. To test on iOS or Android mobile devices, install the Expo Go app. Then use the QR code provided by starting expo with `npx expo start` to load the app onto the device. 
