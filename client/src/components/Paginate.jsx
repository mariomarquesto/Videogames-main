import React from "react";
import { useDispatch } from "react-redux";
import { prev, next } from "../redux/actions";
import style from "./CSS/Paginate.module.css"


export default function Paginate({ page, cantPage }) {
  const dispatch = useDispatch();
  return (
    <div  className={style.container}  >
      <div  className={style.paginate} >
        {page <= 1 ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <button onClick={() => dispatch(prev()) } className={style.buttons}>PREV</button>
            <p>{page - 1}</p>
          </>
        )}
        <h3>{page}</h3>
        {page >= cantPage ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <p>{page + 1}</p>
            <button onClick={() => dispatch(next()) } className={style.buttons}>NEXT</button>
          </>
        )}
      </div>
    </div>
  );
}