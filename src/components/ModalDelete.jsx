import React from "react";
import { useState } from "react";
import css from "./modalDelete.module.css";
import axios from "axios";

export default function ModalDelete({ setSeminars, setIsOpenModal, el }) {
  const [error, setError] = useState(null);

  const onClickConfirm = (id) => {
    axios
      .delete(`http://localhost:3500/seminars/${id}`)
      .then(() => {
        setSeminars((cur) => cur.filter((seminar) => seminar.id !== id));
        setIsOpenModal("");
      })
      .catch((err) => setError("Error deleting seminar"));
  };
  const onClickCancel = () => {
    setIsOpenModal("");
  };

  return (
    <div className={css.modal}>
      <h1>Вы уверены, что хотите удалить этот семинар?</h1>
      {error && <div className={css.error}>{error}</div>}
      <div className={css.block_buttons}>
        <button onClick={() => onClickConfirm(el.id)}>Да</button>
        <button onClick={onClickCancel}>Отмена</button>
      </div>
    </div>
  );
}
