import React, { useEffect, useState } from "react";
import Questions from "./Questions.js";
import { nanoid } from "nanoid";
import Start from "./Start.js";
//to decode html entites properly
import { decode } from "html-entities";

export default function App() {
    //storing values retrieved from an api in state
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
                questionData.results.forEach((result) => {
                    decodeHtmlEntites(result);
                });
                setQuestions(() => questionData.results);
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

    //mapping over the array to create multiple question elements
    const questionElements = questions.map((ques, index) => {
        const questionText = ques.question;
        const options = [ques.correct_answer, ...ques.incorrect_answers];
        //shuffle options
        return (
            <Questions
                key={index + 1}
                question={questionText}
                options={options}
            />
        );
    });

    return <main className="question-container">{questionElements}</main>;
}
