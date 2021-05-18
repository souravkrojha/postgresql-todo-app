import React, { Fragment, useState } from 'react';

const InputTodo = () => {
  const [description, setDescritpion] = useState('');
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch('/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setDescritpion('');
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center mt-5">PERN Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => {
            setDescritpion(e.target.value);
          }}
        />
        <button className="btn btn-success" type="submit">
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
