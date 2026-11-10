# Q&A

1. Як обробити помилку у маршрутизації ?
2. Які є способи програмно зробити редірект на певний маршрут ?
3. Який хук дозволяє працювати з рядком запиту та параметрами в url ?
4. Розібрати наступний код, пояснити що робить useMemo() та метод fromEntries()

```jsx
const [searchParams] = useSearchParams(); users:id /users/1 useParams() => {id: 1}

const params = useMemo(
  () => Object.fromEntries([...searchParams]),
  [searchParams],
);
```

5. Який хук з бібліотеки react-router повертає об'єкт місцезнаходження
   Розібрати url на частини згідно об'єкту location

   **http://localhost:5173/producst?query=fpv-drones&type=fiber-optic#ronni**

```js
{
  pathname: "/products";
  search: "?query=fpv-drones&type=fiber-optic";
  hash: "#ronni;
  state: any;
  key: string;
}
```

## Tasks

1. Refactor search query for search articles. Add check if search is Empty
2. Create program navigation (redirect) after logout
3. Code splitting (lazy) + search (знайти) and update import paths in entire project page (see vite.config.js)
4. Create Reset btn in ArticleSearch
5. Refactor class component to functional component Cart.jsx, Timer.jsx, LoginForm.jsx

### Results (ВИСНОВКИ)
