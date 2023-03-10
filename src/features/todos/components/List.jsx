import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, toggleStatusTodo } from '../../../redux/modules/todos.js';
import { Link } from 'react-router-dom';

const List = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const onDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const onToggleStatusTodo = (id) => {
    dispatch(toggleStatusTodo(id));
  };

  return (
    <StListContainer>
      <h2>Working.. ๐ฅ</h2>
      <StListWrapper>
        {todos.map((todo) => {
          if (!todo.isDone) {
            return (
              <StTodoContainer key={todo.id}>
                <StLink to={`/${todo.id}`} key={todo.id}>
                  <div>์์ธ๋ณด๊ธฐ</div>
                </StLink>
                <div>
                  <h2 className="todo-title">{todo.title}</h2>
                  <div>{todo.body}</div>
                </div>
                <StDialogFooter>
                  <StButton borderColor="red" onClick={() => onDeleteTodo(todo.id)}>
                    ์ญ์ ํ๊ธฐ
                  </StButton>
                  <StButton borderColor="green" onClick={() => onToggleStatusTodo(todo.id)}>
                    {todo.isDone ? '์ทจ์!' : '์๋ฃ!'}
                  </StButton>
                </StDialogFooter>
              </StTodoContainer>
            );
          } else {
            return null;
          }
        })}
      </StListWrapper>
      <h2 className="list-title">Done..! ๐</h2>
      <StListWrapper>
        {todos.map((todo, index) => {
          if (todo.isDone) {
            return (
              <StTodoContainer key={todo.id}>
                {/* 
                5. ์๋ฃ๋ ์ํ์ todo์์๋ง ์์ธํ์ด์ง ์ ๊ทผ์ด ์๋จ. to ์์ฑ ์์ ๊ฐ์ด
                index๋ก ๋์ด์์. ์์ ๊ฐ์ด todo.id๋ก ๋ฐ๊พธ์ด์ค์ผํจ.
                */}
                <StLink to={`/${todo.id}`} key={todo.id}>
                  <div>์์ธ๋ณด๊ธฐ</div>
                </StLink>
                <div>
                  <h2 className="todo-title">{todo.title}</h2>
                  <div>{todo.body}</div>
                </div>
                <StDialogFooter>
                  <StButton borderColor="red" onClick={() => onDeleteTodo(todo.id)}>
                    ์ญ์ ํ๊ธฐ
                  </StButton>
                  {/* 6. ์ทจ์ ๋ฒํผ์ด ๋์ํ์ง ์๋๋ฐ 
                  ํด๋ฆญ ์์ onToggleStatusTodo๊ฐ id๊ฐ์ ํ๋ผ๋ฏธํฐ๋ก ๊ฐ์ง ์ํ์์
                  ์ฝ๋ฐฑํจ์ํํ๋ก ๋์ํด์ผํ๋๋ฐ onTOggleStatusTodo๋ง ์๋ ฅ๋์ด์์์. */}
                  <StButton borderColor="green" onClick={() => onToggleStatusTodo(todo.id)}>
                    {todo.isDone ? '์ทจ์!' : '์๋ฃ!'}
                  </StButton>
                </StDialogFooter>
              </StTodoContainer>
            );
          } else {
            return null;
          }
        })}
      </StListWrapper>
    </StListContainer>
  );
};

export default List;

const StListContainer = styled.div`
  padding: 0 24px;
`;

const StListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StTodoContainer = styled.div`
  width: 270px;
  border: 4px solid teal;
  min-height: 150px;
  border-radius: 12px;
  padding: 12px 24px 24px 24px;
`;

const StLink = styled(Link)`
  text-decoration: none;
`;

const StDialogFooter = styled.footer`
  display: flex;
  justify-content: end;
  padding: 12px;
  gap: 12px;
`;

const StButton = styled.button`
  border: 1px solid ${({ borderColor }) => borderColor};
  height: 40px;
  width: 120px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
`;
