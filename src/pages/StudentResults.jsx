import { useEffect, useState } from 'react';
// import './StudentResults.css';

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const studentId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://localhost:4500/exams/result/${studentId}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [studentId]);

  return (
    <div className="student-results">
      <h2>My Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Marks</th>
            <th>Marks Obtained</th>
            <th>Pass Marks</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.subjectName}</td>
              <td>{result.totalMarks}</td>
              <td>{result.marksObtained}</td>
              <td>{result.passMarks}</td>
              <td>{result.marksObtained >= result.passMarks ? 'Passed' : 'Failed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentResults;
