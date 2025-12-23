import { useState } from "react";
import React from "react";
import css from "./modalEdit.module.css";

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
    try {
      // Обновляем локальный state
      setSeminars((cur) =>
        cur.map((seminar) => (seminar.id === id ? { ...seminar, ...edit } : seminar))
      );

      // Сохраняем изменения в localStorage
      const stored = JSON.parse(localStorage.getItem("seminars")) || [];
      const updated = stored.map((seminar) => (seminar.id === id ? { ...seminar, ...edit } : seminar));
      localStorage.setItem("seminars", JSON.stringify(updated));

      setIsOpenModal("");
    } catch (err) {
      setError("Editing error");
    }
  };

  const onClickCancel = () => {
    setIsOpenModal("");
  };

  return (
    <div className={css.modal}>
      <h1>Вы можете внести изменения</h1>
      {error && <div className={css.error}>{error}</div>}
      <form>
        {["title", "description", "date", "time", "photo"].map((field) => (
          <label key={field}>
            <input
              name={field}
              placeholder={field}
              value={edit[field]}
              onChange={onClickChange}
            />
          </label>
        ))}
      </form>
      <div className={css.block_buttons}>
        <button type="button" onClick={() => onClickEdit(el.id)}>Редактировать</button>
        <button type="button" onClick={onClickCancel}>Отмена</button>
      </div>
    </div>
  );
}
