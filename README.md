# OHMAdminPortal

## About
Open Health Manager will provide users with the ability to interact with their account and the data contained within it through the user portal.

## Tech Stack
The initial app implementation is built by using React.js as the front-end web framework. Node.js and Express are used to set up a back-end server which is used to make API calls to the HAPI FHIR Server.

## Usage
### Running the OHMAdminPortal locally
To run the OHMAdminPortaln locally:
1. first clone the repository (github repo) and open it in Visual Studio code. 
2. next cd into the client folder and install project dependencies using npm install
3. open up the Visual Studio terminal and start up the local Express server via npm run server
4. another terminal should be used to run npm start which starts the main development environment for the front-end client
5. to return a list of Patient Data Receipts and resources for a user, simply type in a valid user name into the form and select the submit button. 
