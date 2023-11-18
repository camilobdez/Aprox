import React, { useState } from 'react';
import axios from 'axios';

const FalsePosition = () => {
  const [funct, setFunct] = useState('log(sin(x)^2 + 1)-(1/2)');
  const [a, setA] = useState('0');
  const [b, setB] = useState('1');
  const [typeError, setTypeError] = useState('absolute');
  const [lastTypeError, setLastTypeError] = useState('absolute');
  const [tolerance, setTolerance] = useState('1e-7');
  const [maxIterations, setMaxIterations] = useState('100');
  const [result, setResult] = useState(null);

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/falseposition', {
              funct: funct,
              a: a,
              b: b,
              typeError: typeError === 'relative' ? 1 : 0,
              tolerance: tolerance,
              maxIterations: maxIterations,
          });

          setResult(response.data.result);
          setLastTypeError(typeError);
      } catch (error) {
          setResult('Error: Unable to calculate the result.');
      }
  };

  return (
    <div className='container-method'>
      <div className='title-method'><a className='method-title' >false position</a></div>

      <div className='content-method'>
        <div className='form-container'>
          
          <form className='form' onSubmit={handleFormSubmit}>

            <label >
              function
              <input type="text"value={funct} onChange={(e) => setFunct(e.target.value)}/>
            </label>

            <label>
              left endpoint
              <input type="number" value={a} onChange={(e) => setA(e.target.value)}/>
            </label>

            <label>
              right endpoint
              <input type="number" value={b} onChange={(e) => setB(e.target.value)}/>
            </label>

            <label>
              error type 
              <select value={typeError} onChange={(e) => setTypeError(e.target.value)}>
                <option value="absolute">absolute</option>
                <option value="relative">relative</option>
              </select>
            </label>
            
            <label>
              tolerance 
              <input type="number"value={tolerance} onChange={(e) => setTolerance(e.target.value)}/>
            </label>

            <label>
              max iterations
              <input type="number"value={maxIterations} onChange={(e) => setMaxIterations(e.target.value)}/>
            </label>

            <button type="submit" style={{color: '#00ce7c'}}>run</button>

            <a className='button-graph'
            href={"/graph?function=" + encodeURIComponent(funct.replace(/e\^(\w+)/g, 'exp($1)').replace(/e\^\((.*?)\)/g, 'exp($1)'))}
            target="_blank"
            rel="noopener noreferrer">
              graph {funct}
            </a>
            
          </form>
        </div>

        <div className='result'>
          {result && (
                  <table>
                      <thead>
                          <tr>
                              <th>i</th>
                              <th>a</th>
                              <th>b</th>
                              <th>x_m</th>
                              <th>f(x_m)</th>
                              <th>{lastTypeError  === "relative" ? "ε" : "E"}</th>
                          </tr>
                      </thead>
                      <tbody>
                          {result.map((iteration, index) => (
                              <tr key={index}>
                                  <td>{iteration[0]}</td>
                                  <td>{iteration[1]}</td>
                                  <td>{iteration[2]}</td>
                                  <td>{iteration[3]}</td>
                                  <td>{iteration[4]}</td>
                                  <td>{iteration[5]}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          
        </div>
      </div>
     

    </div>
  )
}
export default FalsePosition;