import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [
    { name: 'Все', active: true },
    { name: 'ММА', active: false },
    { name: 'Бокс', active: false },
    { name: 'Хоккей', active: false },
    { name: 'Баскетбол', active: false },
    { name: 'Борьба', active: false },
    { name: 'Футбол', active: false },
    { name: 'Волейбол', active: false },
    { name: 'Шахматы', active: false },
    { name: 'Киберспорт', active: false },
    { name: 'Гимнастика', active: false },
    { name: 'Фигурное катание', active: false },
    // { name: 'Чемпион', active: false },
  ],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeCategory: (state, index) => {
      if (state.list[index.payload].active) {
        state.list[index.payload].active = false;
        state.list[0].active = true;
      } else {
        state.list.map((item, i) => {
          if (index.payload === i) {
            item.active = true;
          } else {
            item.active = false;
          }
          return item;
        })
      }
    },
  },
});

export const { changeCategory } = filterSlice.actions;

export default filterSlice.reducer;
