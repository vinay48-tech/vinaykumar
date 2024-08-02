import React, { useState } from 'react';

const InputForm = () => {
  const [inputJson, setInputJson] = useState('');
  const [response, setResponse] = useState({});
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const inputData = JSON.parse(inputJson);
      const res = await fetch('/api/user', { // Use relative path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const responseData = await res.json();
      setResponse(responseData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input JSON:
        <textarea
          value={inputJson}
          onChange={(event) => setInputJson(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </form>
  );
};

export default InputForm;
