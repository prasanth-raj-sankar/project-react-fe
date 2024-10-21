// import React from 'react';-
import PropTypes from 'prop-types';
import './QuestionList.css'; // Add CSS for styling

const QuestionList = ({ questions, onEdit, onDelete }) => {
  return (
    <div className="question-list">
      <h2>Question List</h2>
      <table className="question-table">
        <thead>
          <tr>
            <th>Question Name</th>
            <th>Option one</th>
            <th>Option two</th>
            <th>Option three</th>
            <th>Option four</th>
            <th>Question Answer</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.questionName}</td>
              <td>{question.optionA}</td>
              <td>{question.optionB}</td>
              <td>{question.optionC}</td>
              <td>{question.optionD}</td>
              <td>{question.correctAnswer}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(index)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="go-back-btn" onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

// Define PropTypes
QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      questionName: PropTypes.string.isRequired,
      optionA: PropTypes.string.isRequired,
      optionB: PropTypes.string.isRequired,
      optionC: PropTypes.string.isRequired,
      optionD: PropTypes.string.isRequired,
      correctAnswer: PropTypes.string.isRequired
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default QuestionList;
