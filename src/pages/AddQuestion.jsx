import { useEffect, useState } from 'react';
import './AddQuestion.css'; // Style as needed

const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    questionName: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: '',
    subject: '',
  });
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track if we are editing

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions(); 
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:4500/questions/get-questions'); // Replace 'maths' with the correct subject
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      alert('Error fetching questions: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleAddOrEditQuestion = async () => {
    if (
      questionData.questionName &&
      questionData.optionA &&
      questionData.correctAnswer &&
      questionData.subject
    ) {
      try {
        if (editingId) {
          // Update existing question
          const response = await fetch(`http://localhost:4500/questions/update-question/${editingId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...questionData,
              options: {
                optionA: questionData.optionA,
                optionB: questionData.optionB,
                optionC: questionData.optionC,
                optionD: questionData.optionD,
              },
            }),
          });

          console.log(response)

          const data = await response.json();
          if (response.ok) {
            alert('Question updated successfully!');
          } else {
            alert('Error updating question: ' + data.msg);
          }
        } else {
          // Add new question
          const response = await fetch('http://localhost:4500/questions/add-question', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...questionData,
              options: {
                optionA: questionData.optionA,
                optionB: questionData.optionB,
                optionC: questionData.optionC,
                optionD: questionData.optionD,
              },
            }),
          });

          const data = await response.json();
          if (response.ok) {
            alert('Question added successfully!');
          } else {
            alert('Error adding question: ' + data.msg);
          }
        }
        
        fetchQuestions(); // Refresh questions list after add or edit
        resetForm();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleEditQuestion = (question) => {
    setQuestionData({
      questionName: question.questionName,
      optionA: question.options.optionA,
      optionB: question.options.optionB,
      optionC: question.options.optionC,
      optionD: question.options.optionD,
      correctAnswer: question.correctAnswer,
      subject: question.subject,
    });
    setEditingId(question._id); // Set the ID of the question being edited
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const response = await fetch(`http://localhost:4500/questions/delete-question/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        if (response.ok) {
          alert('Question deleted successfully!');
          fetchQuestions(); // Refresh questions list after deletion
        } else {
          alert('Error deleting question: ' + data.msg);
        }
      } catch (error) {
        alert('Error deleting question: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setQuestionData({
      questionName: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: '',
      subject: '',
    });
    setEditingId(null); // Reset editing ID
  };

  return (
    <div className="add-question-form">
      <h2>Manage Questions</h2>
      {/* Form Inputs */}
      <label>Question Name</label>
      <input
        type="text"
        name="questionName"
        value={questionData.questionName}
        onChange={handleInputChange}
        placeholder="Enter Question Name"
      />
      <label>Option A</label>
      <input
        type="text"
        name="optionA"
        value={questionData.optionA}
        onChange={handleInputChange}
        placeholder="Enter Option A"
      />
      <label>Option B</label>
      <input
        type="text"
        name="optionB"
        value={questionData.optionB}
        onChange={handleInputChange}
        placeholder="Enter Option B"
      />
      <label>Option C</label>
      <input
        type="text"
        name="optionC"
        value={questionData.optionC}
        onChange={handleInputChange}
        placeholder="Enter Option C"
      />
      <label>Option D</label>
      <input
        type="text"
        name="optionD"
        value={questionData.optionD}
        onChange={handleInputChange}
        placeholder="Enter Option D"
      />
      <label>Correct Answer</label>
      <input
        type="text"
        name="correctAnswer"
        value={questionData.correctAnswer}
        onChange={handleInputChange}
        placeholder="Enter Correct Answer (not A, B, C, D)"
      />
      <label>Subject</label>
      <input
        type="text"
        name="subject"
        value={questionData.subject}
        onChange={handleInputChange}
        placeholder="Enter Subject"
      />

      <div className="form-buttons">
        <button className="add-btn" onClick={handleAddOrEditQuestion}>
          {editingId ? 'Update' : 'Add'} Question
        </button>
        <button className="go-back-btn" onClick={() => window.history.back()}>
          Go back
        </button>
      </div>

      <h3>Existing Questions</h3>
      <ul className="questions-list">
        {questions.map((question) => (
          <li key={question._id}>
            <div>
              <strong>{question.questionName}</strong>
              <div>Options: {question.options.optionA}, {question.options.optionB}, {question.options.optionC}, {question.options.optionD}</div>
              <div>Correct Answer: {question.correctAnswer}</div>
              <button onClick={() => handleEditQuestion(question)}>Edit</button>
              <button onClick={() => handleDeleteQuestion(question._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddQuestion;





