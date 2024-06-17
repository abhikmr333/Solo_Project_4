import React from "react";

function checkAndUpdate(option, selectedOption, correctAnswer) {
    if (option === selectedOption && option === correctAnswer)
        return "options correct";
    else if (option === selectedOption) return "options selected";
    else return "options";
}

export default function Questions(props) {
    return (
        <section className="question">
            <p className="question-text">{props.question}</p>
            <div className="options-container" onClick={props.selectAnswer}>
                <button
                    className={checkAndUpdate(
                        props.options[0],
                        props.selectedAnswer,
                        props.correctAnswer
                    )}
                >
                    {props.options[0]}
                </button>
                <button
                    className={checkAndUpdate(
                        props.options[1],
                        props.selectedAnswer,
                        props.correctAnswer
                    )}
                >
                    {props.options[1]}
                </button>
                <button
                    className={checkAndUpdate(
                        props.options[2],
                        props.selectedAnswer,
                        props.correctAnswer
                    )}
                >
                    {props.options[2]}
                </button>
                <button
                    className={checkAndUpdate(
                        props.options[3],
                        props.selectedAnswer,
                        props.correctAnswer
                    )}
                >
                    {props.options[3]}
                </button>
            </div>
            <hr />
        </section>
    );
}
