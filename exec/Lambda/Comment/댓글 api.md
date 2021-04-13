# 댓글 api

댓글 공통 api: `https://{}.execute-api.ap-northeast-2.amazonaws.com`

1. 댓글 생성

   * 요청 방식: `POST`

   * body에 보내야 하는 형식:

     * ```json
       {
         "review_id": number, //어떤 게시글에 댓글을 달았는지에 대한 정보
         "content": "String", //댓글 내용
         "nickname": "String", //댓글 단 닉네임
         "password": "String" //댓글에 대한 비밀번호
       }
       ```

     * 예시

       ```
       {
         "review_id": 4,
         "content": "안녕하세요",
         "nickname": "때껄룩",
         "password": "q1w2e3r4"
       }
       ```

   * 결과: `statusCode`:`200`,  `데이터 저장에 성공했습니다.` 라고 옴

   * 실패했을 시 {message: 인터벌 서버 오류} 이런식으로 옴

2. 댓글 조회

   * 요청 방식: `GET`

   * QueryString에 보내야 하는 형식:

     * `review_id=number`
     * 예시: `https://{}.execute-api.ap-northeast-2.amazonaws.com?review_id=4` 처럼 queryString으로 보내주세요!

   * 결과:`statusCode`:`200`,

   * 해당하는 리뷰에 달려 있는 댓글을 댓글 고유 id의 내림차순으로, nickname과 content 함께 보내줍니다. json배열로 보내줍니다.

   * 예시:

     ```json
     [{"nickname": "반가워", "content": "안녕하세요", "id": 9}, {"nickname": "반가워", "content": "안녕하세요", "id": 10}, {"nickname": "반가워", "content": "안녕하세요", "id": 11}, {"nickname": "반가워", "content": "안녕하세요", "id": 12}, {"nickname": "반가워", "content": "안녕하세요", "id": 13}, {"nickname": "반가워", "content": "안녕하세요", "id": 17}, {"nickname": "반가워", "content": "안녕하세요", "id": 18}, {"nickname": "반가워", "content": "안녕하세요", "id": 19}, {"nickname": "반가워", "content": "안녕하세요", "id": 20}, {"nickname": "반가워", "content": "안녕하세요", "id": 21}, {"nickname": "반가워", "content": "안녕하세요", "id": 22}, {"nickname": "반가워", "content": "안녕하세요", "id": 23}, {"nickname": "반가워", "content": "안녕하세요", "id": 25}, {"nickname": "반가워", "content": "안녕하세요", "id": 26}]
     ```

     

   * 댓글이 없거나 review_id가 없는 상태로 오면 `[]`가 옵니다.

3. 댓글 수정

   * 요청 방식: `PUT`

   * QueryString에 보내야 하는 방식

     * ```json
       id(수정할 댓글 고유 아이디), content(수정된 댓글내용), password(처음에 작성했던 비밀번호), nickname(바꿀 닉네임)
       ```

       예시: `https://{}.execute-api.ap-northeast-2.amazonaws.com?id=24&password=111&content=이히히 수정본이다&nickname=껄룩이` 등으로 보내주세요.

   * 결과: **비밀번호가 초기에 작성했던 비밀번호와 같으면** "데이터 수정에 성공했습니다"

     * 다르면 "패스워드가 다릅니다" --> 수정 실패

4. 댓글 삭제

   * 요청 방식: `DELETE`

   * QueryString에 보내야 하는 방식

     * ```json
       id(삭제할 댓글 고유 아이디), content(수정된 댓글내용), password(처음에 작성했던 비밀번호), nickname(바꿀 닉네임)
       ```

       예시: `https://{}.execute-api.ap-northeast-2.amazonaws.com?id=24&password=111` 등으로 보내주세요.

   * 결과: **비밀번호가 초기에 작성했던 비밀번호와 같으면** "데이터 삭제에 성공했습니다"

     * 다르면 "패스워드가 다릅니다" --> 삭제 실패