import React from "react";

export default function Questions(props) {
    return (
        <section className="question">
            <p className="question-text">{props.question}</p>
            <div className="options-container">
                <button className="options">{props.options[0]}</button>
                <button className="options"> {props.options[1]} </button>
                <button className="options"> {props.options[2]} </button>
                <button className="options"> {props.options[3]} </button>
            </div>
            <hr />
        </section>
    );
}
