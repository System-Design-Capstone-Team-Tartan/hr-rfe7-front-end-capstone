import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api.js';
import ls from 'local-storage';

export const MarkAnswerHelpfulAndReported = ({answer}) => {
  let markedAnswers = ls.get('markedAnswers') || [];
  let markedReported = ls.get('markedReported') || [];

  let [alreadyMarked, setAlreadyMarked] = useState(
    markedAnswers.includes(answer.id)
  );
  let [alreadyReported, setAlreadyReported] = useState(
    markedReported.includes(answer.id)
  );

  useEffect(() => {
    setAlreadyMarked(markedAnswers.includes(answer.id));
    setAlreadyReported(markedReported.includes(answer.id));
  }, [answer.id]);

  // TODO: check this PUT/PATCH is correct
  let MarkAnswerHelpful = () => {
    ls.set('markedAnswers', [...markedAnswers, answer.id]);
    api.markAnswerAsHelpful({answer_id: answer.id});
    setAlreadyMarked(true);
  };

  // TODO: check this PUT/PATCH is correct
  let MarkAnswerReported = () => {
    ls.get('markedReported', [...markedReported, answer.id]);
    api.reportAnswer({answer_id: answer.id});
    setAlreadyReported(true);
  };


  return (
    <span>
      <span>
        {alreadyMarked === true && <>✓ Helpful  <u>Yes</u>({answer.helpfulness + 1})&emsp;|&emsp;</>}
        {alreadyMarked === false && <span>Helpful? <u onClick={MarkAnswerHelpful}>Yes</u>({answer.helpfulness})&emsp;|&emsp;</span>}
      </span>
      <span>
        {alreadyReported === true && <u>Reported</u>}
        {alreadyReported === false && <u onClick={MarkAnswerReported}>Report</u>}
      </span>
    </span>
  );
};

export const MarkQuestionHelpfulAndReported = ({question}) => {
  let markedQuestions = ls.get('markedQuestions') || [];
  let [alreadyMarked, setAlreadyMarked] = useState(
    markedQuestions.includes(question.question_id)
  );

  useEffect(() => {
    setAlreadyMarked(markedQuestions.includes(question.question_id));
  }, [question.question_id]);

  // TODO: check this PUT/PATCH is correct
  let MarkQuestionHelpful = () => {
    ls.set('markedQuestions', [...markedQuestions, question.question_id]);
    api.markQuestionAsHelpful({question_id: question.question_id});
    setAlreadyMarked(true);
  };

  return (
    <AlignRight>
      {alreadyMarked === true && <>✓ Helpful  <u>Yes</u>({question.question_helpfulness + 1})&emsp;|&emsp;</>}
      {alreadyMarked === false && <span>Helpful? <u onClick={MarkQuestionHelpful}>Yes</u>({question.question_helpfulness})&emsp;|&emsp;</span>}
    </AlignRight>
  );
};

const AlignRight = styled.span`
  float: right;
  font-size: smaller;
  font-weight: normal;
`;




