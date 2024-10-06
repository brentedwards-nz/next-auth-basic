"use client";

import { useState } from "react";

const TestUsers = () => {
  const [result, setResult] = useState("Nada");
  const [error, setError] = useState("Nada");

  function handleSubmit(e: any) {
    console.log("*** handle submit ***");

    e.preventDefault();
    const postData = async () => {
      console.log("*** post data ***");
      const response = await fetch("/api/protected/users", {
        method: "GET",
      });
      console.log("*****************");

      if (response.status === 200) {
        return response.json();
      }
      return { status: response.status };
    };
    postData()
      .then((data) => {
        console.log("****", data);
        setResult(JSON.stringify(data));
      })
      .catch((err) => {
        setError(JSON.stringify(err));
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
      <h1>Result</h1>
      <p>{result}</p>
      <h1>Error</h1>
      <p>{error}</p>
    </form>
  );
};

export default TestUsers;
