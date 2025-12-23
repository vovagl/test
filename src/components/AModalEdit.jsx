import { useState } from "react";
import React from "react";
import css from "./modalEdit.module.css";
import axios from "axios";

export default function ModalEdit({ el, setIsOpenModal, setSeminars }) {
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState({
    title: el.title,
    description: el.description,
    date: el.date,
    time: el.time,
    photo: el.photo,
  });

  const onClickChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickEdit = (id) => {
    axios
      .patch(`http://localhost:3500/seminars/${id}`, edit)
      .then((res) => {
        setSeminars((cur) =>
          cur.map((seminar) =>
            seminar.id === id ? { ...seminar, ...edit } : seminar
          )
        );
        setIsOpenModal("");
      })
      .catch((err) => setError("Editing error"));
  };
  const onClickCancel = () => {
    setIsOpenModal("");
  };

  return (
    <div className={css.modal}>
      <h1>Вы можете внести изменения</h1>
      {error && <div className={css.error}>{error}</div>}
      <form>
        <label>
          <input
            name="title"
            placeholder="название"
            value={edit.title}
            onChange={onClickChange}
          />
        </label>
        <label>
          <input
            name="description"
            placeholder="описание"
            value={edit.description}
            onChange={onClickChange}
          />
        </label>
        <label>
          <input
            name="date"
            placeholder="дата"
            value={edit.date}
            onChange={onClickChange}
          />
        </label>
        <label>
          <input
            name="time"
            placeholder="время"
            value={edit.time}
            onChange={onClickChange}
          />
        </label>
        <label>
          <input
            name="photo"
            placeholder="URL фото"
            value={edit.photo}
            onChange={onClickChange}
          />
        </label>
      </form>
      <div className={css.block_buttons}>
        <button onClick={() => onClickEdit(el.id)}>Редактировать</button>
        <button onClick={onClickCancel}>Отмена</button>
      </div>
    </div>
  );
}
