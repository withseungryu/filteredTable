## 상품  필터 구현

VueJS + Typescript + NuxtJS + Toast Chart



주제 :  쇼핑몰에 등록된 상품들이 많은 경우, 상품을 골라내는데에 시간이 많이 들게되는데, 상품들의 특징을 잡아 필터를 걸면, 광고를 생성하는데에 걸리는 시간을 많이 단축시킬 수 있는 필터 개발.

`판매가(sale_price)` , `판매원가(base_price)`, `이름(name)`, `상품 등록일(created_at)`

서버에 검색쿼리를 이용해서 SQL문 생성 후 필터에 맞는 상품들을 API호출 한다.

QUERY 설명

| query              |  type  |      example      | explain                                              |
| ------------------ | :----: | :---------------: | ---------------------------------------------------- |
| page               |  int   |         2         | 페이지 번호                                          |
| per_page           |  int   |        50         | 페이지 별 상품 수                                    |
| orders             | Array  |                   | 기준에 따른 정렬 방법(2개)                           |
| - orders.column    | string |    created_at     | 정렬할 필드                                          |
| - orders.direction | string |       desc        | 정렬 컬럼의 방향 Enum(desc: 내림차순, asc: 오름차순) |
| query              | string | discount_rate > 0 | [**검색쿼리**](../../#참고자료1검색쿼리)             |

- 한 페이지에 나오는 아이템 수를 제어하는 기능
- 현재 페이지를 확인 할 수 있고, 특정페이지로 이동 할 수 있는가(페이지네이션)
- 테이블 헤더를 클릭하여 정렬된 결과를 얻을 수 있는가
- 필드, 연산자, 값을 제대로 입력할 수 있는가
- 여러개의 조건필터를 중첩하여 생성할 수 있는가
- 중간에 필터를 삭제 할 수 있는가
- 필터를 이용해서 생산된 검색쿼리가 필터의 내용과 일치하는가
- 검색쿼리로 서버의 데이터를 잘 가져오는가
- 필터 수정시 마다 적절하게 데이터가 변경되는가
- 필터를 직관적으로 사용할 수 있는가
- 상품을 로딩하는 동안 로딩중 표시가 있는가
- 모바일 화면에서도 테이블의 내용을 확인 할 수 있는가
- 모바일 화면에서도 상품필터를 수정하는데에 무리가 없는가
- 검색된 내용을 그래프로 요약할 수 있는가

`npm run dev` 혹은 
`npm run build` and `npm run start` 로 실행 할 수 있습니다.
