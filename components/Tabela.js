import { Container } from "postcss";
import { Fragment, useRef, useState, useCallback, useEffect } from "react";

function Tabela({ jedenWydatek, czas, postawaValue, partiaCialaValue }) {





    return (
        <div className="border p-4 flex">
            <h1 className="pr-6">{jedenWydatek} </h1>
            <h1>{czas} </h1>
        </div>
    );
}

export default Tabela;