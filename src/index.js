import React from 'react';
import {createRoot} from 'react-dom/client';
import {createElement, nextCodeGenerate} from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: nextCodeGenerate(), title: 'Название элемента'},
    {code: nextCodeGenerate(), title: 'Некий объект'},
    {code: nextCodeGenerate(), title: 'Заголовок'},
    {code: nextCodeGenerate(), title: 'Очень длинное название элемента из семи слов'},
    {code: nextCodeGenerate(), title: 'Запись'},
    {code: nextCodeGenerate(), title: 'Шестая запись'},
    {code: nextCodeGenerate(), title: 'Седьмая запись'},
  ]
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
