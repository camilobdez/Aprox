import React, { useState } from 'react';
import axios from 'axios';

const Jacobi = () => {
  const [coefficients, setCoefficients] = useState([[10, 5, 6], [-2, 11, 1], [-1, -1, 4]]);
  const [constants, setConstants] = useState([15, 15, 20]);
  const [initialGuess, setInitialGuess] = useState([1, 1, 1]);
  const [tolerance, setTolerance] = useState(0.5);
  const [maxIterations, setMaxIterations] = useState(100);
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/jacobi', {
        coefficients: coefficients,
        constants: constants,
        initialGuess: initialGuess,
        tolerance: tolerance,
        maxIterations: maxIterations,
      });

      setResult(response.data.result);
    } catch (error) {
      setResult('Error: Unable to calculate the result.');
    }
  };

  return (
    <div className='container-method'>
      <div className='title-method'>
        <a className='method-title'>Jacobi Method</a>
      </div>

      <div className='content-method'>
        <div className='form-container'>
          <form className='form' onSubmit={handleFormSubmit}>
            {/* Input for coefficients */}
            <label>
              Coefficients (separate values with commas):
              <input
                type='text'
                value={coefficients.map((row) => row.join(',')).join(';')}
                onChange={(e) =>
                  setCoefficients(
                    e.target.value.split(';').map((row) => row.split(',').map((val) => parseFloat(val)))
                  )
                }
              />
            </label>

            {/* Input for constants */}
            <label>
              Constants (separate values with commas):
              <input
                type='text'
                value={constants.join(',')}
                onChange={(e) => setConstants(e.target.value.split(',').map((val) => parseFloat(val)))}
              />
            </label>

            {/* Input for initial guess */}
            <label>
              Initial Guess (separate values with commas):
              <input
                type='text'
                value={initialGuess.join(',')}
                onChange={(e) => setInitialGuess(e.target.value.split(',').map((val) => parseFloat(val)))}
              />
            </label>

            {/* Input for tolerance */}
            <label>
              Tolerance
              <input type='number' value={tolerance} onChange={(e) => setTolerance(parseFloat(e.target.value))} />
            </label>

            {/* Input for max iterations */}
            <label>
              Max Iterations
              <input
                type='number'
                value={maxIterations}
                onChange={(e) => setMaxIterations(parseInt(e.target.value))}
              />
            </label>

            <button type='submit' style={{ color: '#00ce7c' }}>
              Run
            </button>
          </form>
        </div>

        <div className='result'>
          {result && (
            <table>
              <thead>
                <tr>
                  <th>Iteration</th>
                  {initialGuess.map((_, i) => (
                    <th key={i}>{`x${i + 1}`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {Array.isArray(result) ? (
                result.map((iteration, index) => (
                    <tr key={index}>
                    {Array.isArray(iteration) ? (
                        iteration.map((val, i) => (
                        <td key={i}>{typeof val === 'number' ? val.toFixed(4) : val}</td>
                        ))
                    ) : (
                        <td colSpan="7">Solution data x{index}: {JSON.stringify(iteration)}</td>
                    )}
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="7">No result data available</td>
                </tr>
                )}

              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jacobi;
