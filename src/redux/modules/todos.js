// Action value
const ADD_TODO = 'ADD_TODO';
const GET_TODO_BY_ID = 'GET_TODO_BY_ID';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_STATUS_TODO = 'TOGGLE_STATUS_TODO';

// Action Creator
// Todo를 추가하는 action creator
export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

// Todo를 지우는 action creator
export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

// Todo를 isDone를 변경하는 action creator
export const toggleStatusTodo = (payload) => {
  return {
    type: TOGGLE_STATUS_TODO,
    payload,
  };
};

// 상세 페이지에서 특정 Todo만 조회하는 action creator
export const getTodoByID = (payload) => {
  return {
    type: GET_TODO_BY_ID,
    payload,
  };
};

// initial state
const initialState = {
  todos: [
    {
      id: '1',
      title: '리액트',
      body: '리액트를 배워봅시다',
      isDone: false,
    },
  ],
  todo: {
    id: '0',
    title: '',
    body: '',
    isDone: false,
  },
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      /* 
      2. 추가하기 버튼을 누르면 기존에 있던 모든 값들이 삭제되는데
      아마 리턴을 기존에 있던 값을 지우고 리턴 해주어서 그런 것 같음.
      스프레드 문법으로 기존에 있던 객체들 불러와줌.
      */
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    /*
      3. 삭제하기 버튼을 눌러도 동작을 안하는데 모듈 안에 DELETE_TODO에 대한 case가
      정의되어 있지 않음
      Lise.jsx에서 payload로 id값을 보내주고 있음.
    */
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };

    case TOGGLE_STATUS_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          } else {
            return todo;
          }
        }),
      };

    case GET_TODO_BY_ID:
      return {
        ...state,
        todo: state.todos.find((todo) => {
          return todo.id === action.payload;
        }),
      };
    default:
      return state;
  }
};

export default todos;
