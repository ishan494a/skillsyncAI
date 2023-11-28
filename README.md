# SkillSync AI

SkillSync AI is a platform designed to make learning and hiring more efficient. This is a server-side application for a Chatbot Resume App. The app allows users to create profiles, upload resumes in PDF format, converts them to text, and allows other users to interact with a Chatbot that was created based on the users profile. Users can send messages to the chatbot, which responds based on the content of the uploaded resumes.

## Prerequisites

Before running the application, ensure you have the following:

- [Node.js](https://nodejs.org/) installed on your machine.
- API key for the [OpenAI GPT-3.5 API](https://beta.openai.com/signup/).

## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/ishan494a/skillsyncai.git
    cd skillsyncai
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your OpenAI API key:**

    - Open `index.js` and replace the empty string in `const apiKey = "";` with your actual OpenAI API key.

4. **Run the application:**

    ```bash
    node index.js
    ```

   The app will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.

## Usage

1. Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.
2. Register or log in to create a user profile.
3. Upload a resume in PDF format. (In progress)
4. Explore the user profile and interact with the chatbot.
5. The chatbot uses OpenAI's GPT-3.5 to generate responses based on the user's resume.

## Endpoints

- `/`: Home page.
- `/searchuser`: Display user information based on the provided user tag.
- `/login`: Login page.
- `/register`: Registration page.
- `/sendMessage`: API endpoint for sending messages to the chatbot.

## Dependencies

- [Express](https://expressjs.com/): Web framework for Node.js.
- [Axios](https://axios-http.com/): HTTP client for making requests.
- [Body Parser](https://www.npmjs.com/package/body-parser): Middleware to parse incoming request bodies.
- [EJS](https://ejs.co/): Templating engine for rendering views.
