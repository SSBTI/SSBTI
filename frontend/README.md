# frontend

### Navigate into frontend dir

---

```jsx
cd frontend
```

### Project setup

---

```jsx
npm install
```

or

```jsx
yarn install
```

### Start development server on port 3000

---

```jsx
npm run dev
```

or

```jsx
yarn dev
```

### Build the production application in the .next folder

---

```jsx
npm run build
```

or

```jsx
yarn build
```

### Start a Node.js server

---

```jsx
npm run start
```

or

```jsx
yarn start
```

### Add .env.local on Root Path of frontend

---

각 주소는 해당 기능의 lambda function url과 배포된 url로 변경 해서 관리 가능

```jsx
NEXT_PUBLIC_MBTI_API=https://pkl7xls62b.execute-api.us-east-2.amazonaws.com
NEXT_PUBLIC_API=http://j4f003.p.ssafy.io/api
NEXT_PUBLIC_SEPARATOR=%!rn!qns!wk!%
NEXT_PUBLIC_CHAT=wss://9wguyns9p2.execute-api.us-east-1.amazonaws.com/Prod
NEXT_PUBLIC_KAKAO_KEY={발급받은 kakao api key}
NEXT_PUBLIC_NICKNAME_API=https://lxo44gok6l.execute-api.ap-northeast-2.amazonaws.com
NEXT_PUBLIC_COMMENT_API=https://6ukyq5n88b.execute-api.ap-northeast-2.amazonaws.com
```