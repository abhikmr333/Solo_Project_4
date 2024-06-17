import React, { useEffect, useState } from "react";
import Questions from "./Questions.js";
import { nanoid } from "nanoid";
import Start from "./Start.js";
//to decode html entites properly
import { decode } from "html-entities";

export default function App() {
    //question state
    const [questions, setQuestions] = useState([]);

    //useEffect to retrieve data from api which also setQuestions - one off fetch request so no cleanup neeeded
    useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
        )
            .then((response) => {
                if (!response.ok) throw new Error("Not Found");
                return response.json();
            })
            .then((questionData) => {
                //at first decoding the html entites to properly to text then update the state
                const questionArray = questionData.results.map((result) => {
                    decodeHtmlEntites(result);
                    const optionsShuffled = [
                        result.correct_answer,
                        ...result.incorrect_answers,
                    ];
                    randomShuffle(optionsShuffled);
                    return {
                        question: result.question,
                        options: optionsShuffled,
                        correctAnswer: result.correct_answer,
                        selectedAnswer: "",
                        isSelected: false,
                        id: nanoid(),
                    };
                });
                setQuestions(() => questionArray);
            })
            .catch((err) => console.log(err.message));
    }, []);

    //decoding html entities using html-entities package
    function decodeHtmlEntites(result) {
        result.question = decode(result.question);
        result.correct_answer = decode(result.correct_answer);
        result.incorrect_answers[0] = decode(result.incorrect_answers[0]);
        result.incorrect_answers[1] = decode(result.incorrect_answers[1]);
        result.incorrect_answers[2] = decode(result.incorrect_answers[2]);
    }

    function selectAnswer(event, id) {
        const { target } = event;
        //change the color of the button
        if (target.nodeName === "BUTTON") {
            //unselect previous selected button
            const allSiblingButtons = event.target.parentElement.childNodes;
            //unselecting all buttons
            allSiblingButtons.forEach((btn) => (btn.className = "options"));
            //select new button
            target.className += " selected";
            setQuestions((prevQuestions) => {
                return prevQuestions.map((question) => {
                    return question.id === id
                        ? {
                              ...question,
                              selectedAnswer: target.innerText,
                              isSelected: true,
                          }
                        : { ...question };
                });
            });
        }
    }

    //mapping over the array to create multiple question elements
    const questionElements = questions.map((ques, index) => {
        const questionText = ques.question;
        return (
            <Questions
                key={index + 1}
                question={ques.question}
                options={ques.options}
                correct_answer={ques.correctAnswer}
                selected_answer={ques.selectedAnswer}
                isSelected={ques.isSelected}
                id={ques.id}
                selectAnswer={(event) => selectAnswer(event, ques.id)}
            />
        );
    });

    //randomly Shuffles the corrent answer
    function randomShuffle(option) {
        const random = Math.floor(Math.random() * 4);
        const temp = option[0];
        option[0] = option[random];
        option[random] = temp;
    }

    console.log(questions);
    return <main className="question-container">{questionElements}</main>;
}
