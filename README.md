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

## Q&A Part 2

1.
2.
3.
4.

### Tasks

1. Refactor search query for search articles. Add check if search is Empty ✅
2. Create program navigation (redirect) after logout ✅
3. Code splitting (lazy) + search (знайти) and update import paths in entire project page (see vite.config.js) ✅
4. Create Reset btn in ArticleSearch ✅
5. Refactor class component to functional component Cart.jsx, Timer.jsx ✅,

#### Tasks Part 2

1. Explain in ArticlesPage.jsx
2. Add search Articles in ArticlesPage.jsx with save search string

```jsx
const fetchArticles = useCallback(
  () => getArticles(queryParam, pageParam),
  [pageParam, queryParam],
);
```

2. Add render item by id using Link in ArticleItem.jsx

- get id from url
- set id in Async func
- add back link with save prev search url

3. Refactor get Data in useEffect on async/await in SingleArticlesPage.jsx

4. Refactor get Data in useEffect on async/await CommentsPage.jsx

5. Refactor class component to functional component Cart.jsx, LoginForm.jsx

6. Add Private and RestrictedRoute

##### Results
