import React from "react";
import css from "./seminar.module.css";
import ModalDelete from "./ModalDelete";
import { useState } from "react";
import Spinner from "./Spinner";
import ModalEdit from "./ModalEdit";

export default function Seminar({ el, setSeminars }) {
  const [isOpenModal, setIsOpenModal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onClickDelete = () => {
    setIsOpenModal("delete");
  };

  const onClickEdit = () => {
    setIsOpenModal("edit");
  };

  const photoLoading = () => {
    setIsLoading(false);
  };

  return (
    <li>
      <h2>{el.title}</h2>
      <div className={css.container}>
        {isLoading && <Spinner />}
        <img
          src={el.photo}
          alt={el.title}
          onLoad={photoLoading}
          style={{ display: isLoading ? "none" : "block" }}
        />
        <div className={css.container__info}>
          <p>{el.description}</p>
          <p>
            {el.date} в {el.time}
          </p>
        </div>
      </div>
      <div className={css.block_buttons}>
        <button onClick={onClickDelete}>Delete</button>
        <button onClick={onClickEdit}>Edit</button>
      </div>
      {isOpenModal === "delete" && (
        <ModalDelete
          setSeminars={setSeminars}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          el={el}
        />
      )}
      {isOpenModal === "edit" && (
        <ModalEdit el={el} setIsOpenModal={setIsOpenModal} setSeminars={setSeminars} />
      )}
    </li>
  );
}
