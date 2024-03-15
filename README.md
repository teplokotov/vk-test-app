# Тестовое задание VK
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![VKUI](https://img.shields.io/badge/vkui-%23007ACC.svg?style=for-the-badge&logo=vkui&logoColor=white)](https://vkcom.github.io/VKUI/)

[![image](https://github.com/teplokotov/vk-test-app/assets/118915923/65d30fd6-ec08-409c-9b04-e88db24c278b)](https://teplokotov.github.io/is-test-app/)

🌐 [https://teplokotov.github.io/vk-test-app/](https://teplokotov.github.io/vk-test-app/)

Одностраничное веб-приложение состоит из двух панно (panel):

<ol>
	<li>Панно "Интересные факты" содержит блок с кнопкой и текстовым полем. По нажатию на кнопку выполняется запрос к <a href="https://catfact.ninja/fact" target="_blank">https://catfact.ninja/fact</a>. Полученный факт записывается в текстовое поле. Курсор устанавливается после первого слова.</li>
	<li>Панно "Мой возраст" содержит форму с текстовым полем и кнопкой отправки. Пользователь вводит своё имя в текстовом поле. По истечении 3-х секунд после ввода имени или при отправке формы выполняется запрос к <a href="https://api.agify.io/" target="_blank">https://api.agify.io/</a> с введенным именем в параметре <em>name</em>. Ответом будет возраст человека, определенный по имени. Этот ответ отображается под текстовым полем.<br>
	<ul>
		<li>Предусмотрено предотвращение дублирующих запросов (запрос с таким же именем не отправляется).</li>
		<li>Предусмотрена отправка следующего запроса до того, как текущий был обработан. Запрос прерывается, чей ответ нам уже не нужен (частый кейс при медленном интернете).</li>
	</ul>
	</li>
</ol>

<ul>
	<li>В работе использована библиотека VKUI.</li>
	<li>Реализована валидация поля ввода имени (имя может состоять только из латинских букв).</li>
	<li>Приложение также развернуто в виде мини-приложения ВКонтакте.</li>
</ul>

### Запуск проекта в 🖐 5 шагов
1. Клонируйте проект
```bash
git clone https://github.com/teplokotov/vk-test-app.git
```
2. Перейдите в директорию проекта
```bash
cd vk-test-app
```
3. Установите модули
```bash
npm install
```
4. Запустите проект
```bash
npm run dev
```
5. Откройте страницу
```bash
http://localhost:5173
```

### Используемые технологии
- VS Code
- Git Bash
- Vite
- React 18.2
- TypeScript
- VKUI

### Полезные материалы

- <a href="https://vkcom.github.io/VKUI/">Документация VKUI</a>
- <a href="https://dev.vk.com/ru/mini-apps/getting-started">Как создать свое мини-приложение ВКонтакте</a>
- <a href="https://feature-sliced.design/ru/">Документация Feature-Sliced Design</a>

## Контакты
- Филипп Добриков
- philipp.dobrikov@yandex.ru
- https://t.me/hello_philipp
