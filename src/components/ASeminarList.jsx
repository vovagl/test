import React from "react";
import axios from "axios";
import css from "./seminarList.module.css";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Seminar from "./Seminar";

export default function SeminarList() {
  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3500/seminars")
      .then((res) => {
        setSeminars(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error fetching");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      {error && <div className={css.error}>{error}</div>}
      {seminars.length < 1 && !isLoading && <h2>Не запланировано</h2>}
      <ul>
        {seminars.map((el) => (
          <Seminar key={el.id} el={el} setSeminars={setSeminars} />
        ))}
      </ul>
    </>
  );
}
