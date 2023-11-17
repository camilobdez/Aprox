import React, { useState } from 'react';
import axios from 'axios';

const Newton = () => {
  const [x, setX] = useState([1, 3, 4, 5]);
  const [y, setY] = useState([5, 7, 7, 9]);
  const [result, setResult] = useState([]);
  const polynomialTerms = [];


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/newton', {
        x: x,
        y: y,
      });

      setResult(response.data.result);
    } catch (error) {
      setResult('Error: Unable to calculate the result.');
    }
  };

  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >Newton</a></div>
      <div className='content-method'>
        <div className='form-container'>

          <form className='form' onSubmit={handleFormSubmit}>

            {/* Input for x values */}
            <label>
              x Values (separate values with commas):
              <input
                type='text'
                value={x.join(',')}
                onChange={(e) => setX(e.target.value.split(',').map((val) => parseFloat(val)))}
              />
            </label>

            {/* Input for y values */}
            <label>
              y Values (separate values with commas):
              <input
                type='text'
                value={y.join(',')}
                onChange={(e) => setY(e.target.value.split(',').map((val) => parseFloat(val)))}
              />
            </label>

            <button type="submit" style={{ color: '#00ce7c' }}>run</button>

          </form>
        </div>

        <div className='result'>
          {result && (
            <table>
              <thead>
                <tr>
                  <th colSpan={result.length}>Coeficientes</th>
                </tr>
              </thead>
              <tbody>
                {result.map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tbody>
            </table>
          )}
          <br />
          <th>
            Polinomio:
            {result.map((value, index) => (
              <React.Fragment key={index}>
                {value !== 0 && ( // Show only non-zero terms
                  <span>
                    {index === 0
                      ? ` ${value}`
                      : ` ${value > 0 ? '+' : '-'} ${Math.abs(value)}${index > 1 ? ` * ...` : ''}(x - ${x[index - 1]})${index > 2 ? `  ` : ''}`
                    }
                  </span>
                )}
              </React.Fragment>
            ))}
          </th>
          <br />
        </div>
      </div>
    </div>
  )
}

export default Newton;
