# Persontest404 - The Ultimate Bad UI Personality Test

Welcome to **Persontest404**, a personality test designed from the ground up to be an intentionally frustrating, confusing, and anxiety-inducing user experience. This project is a satirical take on modern web design, data privacy concerns, and the often-absurd nature of online quizzes. It's not broken; it's just built differently.

## What is this?

This is a **Bad UI/UX project**. The goal is not to create a functional, user-friendly application, but to explore and implement design choices that are deliberately counter-intuitive, distracting, and stressful. It's a playground for anti-patterns and a commentary on how not to build a web application.

Every "feature" is designed to make the user question their sanity, their choices, and whether their webcam is actually watching them.

## Features (or Anti-Features)

This "personality test" is packed with user-hostile features to create a uniquely terrible experience:

*   **Draggable Header**: Why should the main title stay put? Grab it and move it around the screen for no reason at all.
*   **Shy "Next" Button**: Try to click the "Next" button, and it will run away from your cursor. You'll have to be quick or find the... alternative way to proceed.
*   **Moving Answer Options**: Just as you're about to click an answer, it might just shift its position. Better have good reflexes!
*   **"Unreliable" Answer Saving**: With a 20% chance, the app will "forget" your selected answer and force you to choose again, accompanied by an unhelpful popup.
*   **Anxiety-Inducing Background Words**: Random, unsettling phrases like "ARE YOU SURE?", "WRONG!", and "YOUR IP IS BEING SAVED" flash across the screen to keep you on edge.
*   **Intrusive Popups**: Randomly timed popups appear with "helpful" information, like "5 other people are currently watching you take this test."
*   **The "Human Verification" Captcha**: A nonsensical captcha that forces you to select all "happy" emojis to prove you're human... or at least, that you can follow bizarre instructions.
*   **Fake Webcam Feed**: A persistent "recording" light and a fake webcam popup that "analyzes" your facial expressions and body language, adding to the feeling of being watched.
*   **Audio Glitches**: Annoying, randomly generated glitch sounds play to enhance the feeling of a system on the verge of collapse.
*   **Randomly Generated Results**: After all that effort, your personality is determined completely at random. Your answers meant nothing.

## Tech Stack

This masterpiece of bad design was built with:

*   **HTML5**: For the structure of the chaos.
*   **CSS3**: For the `Comic Sans MS` typography and clashing color schemes.
*   **Vanilla JavaScript (ES6 Modules)**: To orchestrate the entire symphony of user frustration. No frameworks, just pure, unadulterated DOM manipulation.
*   **Web Audio API**: For generating the delightful glitch sounds in real-time.

## How to Run

Since this project uses modern JavaScript Modules (`import`/`export`), you need to run it from a local web server. You cannot simply open the `index.html` file directly in your browser.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
    cd YOUR_REPOSITORY_NAME
    ```

2.  **Start a local server:**
    If you have Python installed, you can use its built-in server:
    ```bash
    # For Python 3
    python -m http.server

    # For Python 2
    python -m SimpleHTTPServer
    ```
    Alternatively, if you have Node.js, you can use `live-server`:
    ```bash
    npm install -g live-server
    live-server
    ```

3.  **Open in your browser:**
    Navigate to `http://localhost:8000` (or the address provided by your server) in your web browser.

## Motivation

This project was created as a fun experiment in interactive design and a creative outlet to build everything you're told *not* to do in a web application. It serves as a humorous portfolio piece showcasing JavaScript skills in DOM manipulation, event handling, and creating dynamic, stateful experiences.

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to fork it, learn from it, and create your own terrible user experiences.
