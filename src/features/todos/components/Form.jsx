import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import nextId from 'react-id-generator';
import { addTodo } from '../../../redux/modules/todos.js';

const Form = () => {
  const dispatch = useDispatch();
  const id = nextId();
  /* 
  4 - 1. id값을 0으로 고정해주고 보내주고 있어서 상세페이지로 들어갔을 때
  무조건 id가 0으로 들어감 따라서 todo를 생성할때마다 무작위의 id를 주어야함
  */
  const [todo, setTodo] = useState({
    id: id,
    title: '',
    body: '',
    isDone: false,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (todo.title.trim() === '' || todo.body.trim() === '') return;
    /* 1. todos.js에서 ADD_TODO부분에 console.log를 찍어봤을 때 콜솔이 찍히지 않음. 
    todos.js로 값이 보내지지 않음을 알 수 있는데, Form.jsx에서 addToDo를 사용해서
    값을 보내줘야함 */

    /* 
    4-2. 첫 렌더링 시에 nextId로 무작위 id를 생성하면
    잘 보내지고, dispatch로 보낸 이후에 
    그리고 원래 있던 todo를 초기화 해줌으로서 다시 id를 생성
    */
    dispatch(addTodo({ ...todo }));
    setTodo({
      id: id,
      title: '',
      body: '',
      isDone: false,
    });
  };

  return (
    <StAddForm onSubmit={onSubmitHandler}>
      <StInputGroup>
        <StFormLabel>제목</StFormLabel>
        <StAddInput type="text" name="title" value={todo.title} onChange={onChangeHandler} />
        <StFormLabel>내용</StFormLabel>
        <StAddInput type="text" name="body" value={todo.body} onChange={onChangeHandler} />
      </StInputGroup>
      <StAddButton>추가하기</StAddButton>
    </StAddForm>
  );
};

export default Form;

const StInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StFormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const StAddForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const StAddInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;
