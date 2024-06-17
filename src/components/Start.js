import React from "react";

//start screen
export default function Start() {
    return (
        <section className="start-container">
            <main className="start">
                <h1 className="start--title">Quizzical</h1>
                <p className="start--description">
                    Press Start Quiz to start the quiz!
                </p>
                <button className="start--button">Start quiz</button>
            </main>
        </section>
    );
}
