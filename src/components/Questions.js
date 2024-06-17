import React from "react";

export default function Questions() {
    return (
        <section className="question-container">
            <p className="question">How would one say goodbye in Spanish?</p>
            <div calssName="options-container">
                <button className="options"> Adios </button>
                <button className="options"> Hola </button>
                <button className="options"> Au Revoir </button>
                <button className="options"> Salir </button>
            </div>
            <hr />
        </section>
    );
}
