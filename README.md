# Quiz Platform

A modern and interactive quiz platform where users can attempt quizzes, get instant feedback, and track their progress. Built with **React.js**, **Tailwind CSS**, and **IndexedDB** for local storage.

## Features

- **Quiz Creation & Management**:
  - Display a list of questions in a quiz format.
  - Support for both **multiple-choice** and **integer-type** questions.
  - Allow multiple attempts.

- **User Interaction**:
  - Users can select answers and get **instant feedback**.
  - Timer-based quizzes (e.g., 30 seconds per question).
  - Automatic submission when the timer runs out.

- **Progress Tracking**:
  - Show a **scoreboard** at the end of each quiz.
  - Save quiz history using **IndexedDB**.
  - Clear quiz history with a **"Clear History"** button.

- **Error Handling**:
  - Validate user input for integer-type questions.
  - Display error messages for invalid inputs.

- **Responsive Design**:
  - Card-like UI.
  - Fully responsive and works on all screen sizes.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Local Storage**: IndexedDB
- **Deployment**: Vercel/Netlify

## How to Run the App Locally

Follow these steps to run the app on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/quiz-platform.git
   cd quiz-platform

2. **Install Dependencies**:
   ```bash
   npm install

3. **Start the Development Server**:
   ```bash
   npm start

4. **Open the App**:
  - The app will automatically open in your default browser at http://localhost:3000.
  - If it doesn't, manually navigate to the URL.

5. **Test the Quiz**:
  - Attempt the quiz questions.
  - Check your score and review incorrect answers at the end.

## Deployed App
The app is deployed on Vercel. You can access it here:
👉 <a href="https://quiziiee.vercel.app/">Live Demo</a>

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:
-Fork the repository.
-Create a new branch (git checkout -b feature/your-feature-name).
-Commit your changes (git commit -m 'Add some feature').
-Push to the branch (git push origin feature/your-feature-name).
-Open a pull request.

<hr>

Made with ❤️ by ADITI.
