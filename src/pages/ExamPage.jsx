import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ExamPage.css'; // Assuming you have some styles

const ExamPage = () => {
  const { subject } = useParams();
  const normalizedSubject = subject.toLowerCase();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://project-be-qpt1.onrender.com/questions/get-questions/${normalizedSubject}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [normalizedSubject]);

  // Handle answer selection
  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: answer
    }));
  };

  // Submit exam answers
  const handleSubmitExam = async () => {
    try {
      console.log('Submitting exam answers:', answers);
      const response = await fetch(`https://project-be-qpt1.onrender.com/exams/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: normalizedSubject,
          answers,
        }),
      });
      console.log(response)
      if (!response.ok) {
        console.error('Failed to submit exam:', response.statusText);
        return;
      }

      const result = await response.json();
      console.log('Exam result:', result);

      // Navigate to result page with the result data
      navigate(`/exam-result/${normalizedSubject}`, { state: { result } });
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  return (
    <div className="exam-page">
      <h2>{subject} Exam</h2>
      {questions.length === 0 ? (
        <p>No questions available for this subject.</p>
      ) : (
        questions.map((question, index) => (
          <div key={index} className="question-block">
            <h3>{question.questionName}</h3>
            <div className="options">
              <label>
                <input 
                  type="radio" 
                  name={`question-${index}`} 
                  value="A" 
                  onChange={() => handleAnswerChange(index, 'A')} 
                />
                {question.options.optionA}
              </label>
              <label>
                <input 
                  type="radio" 
                  name={`question-${index}`} 
                  value="B" 
                  onChange={() => handleAnswerChange(index, 'B')} 
                />
                {question.options.optionB}
              </label>
              <label>
                <input 
                  type="radio" 
                  name={`question-${index}`} 
                  value="C" 
                  onChange={() => handleAnswerChange(index, 'C')} 
                />
                {question.options.optionC}
              </label>
              <label>
                <input 
                  type="radio" 
                  name={`question-${index}`} 
                  value="D" 
                  onChange={() => handleAnswerChange(index, 'D')} 
                />
                {question.options.optionD}
              </label>
            </div>
          </div>
        ))
      )}
      <button onClick={handleSubmitExam} className="submit-button">Submit Exam</button>
    </div>
  );
};

export default ExamPage;

