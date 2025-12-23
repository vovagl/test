import React, { useState } from "react";
import css from "./modalDelete.module.css";

export default function ModalDelete({ setSeminars, setIsOpenModal, el }) {
  const [error, setError] = useState(null);

  const onClickConfirm = (id) => {
    try {
      // Обновляем локальный state
      setSeminars((cur) => {
        const updated = cur.filter((seminar) => seminar.id !== id);
        // Сохраняем в localStorage
        localStorage.setItem("seminars", JSON.stringify(updated));
        return updated;
      });
      setIsOpenModal("");
    } catch (err) {
      setError("Error deleting seminar");
    }
  };

  const onClickCancel = () => {
    setIsOpenModal("");
  };

  return (
    <div className={css.modal}>
      <h1>Вы уверены, что хотите удалить этот семинар?</h1>
      {error && <div className={css.error}>{error}</div>}
      <div className={css.block_buttons}>
        <button type="button" onClick={() => onClickConfirm(el.id)}>Да</button>
        <button type="button" onClick={onClickCancel}>Отмена</button>
      </div>
    </div>
  );
}
