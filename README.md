
## 실행 방법
1. 터미널에 `yarn install`을 입력해주세요
2. 패키지가 설치되면 `yarn dev`를 실행해주세요

</br>

## 기술 스택
- 프레임워크: `NextJS`
- 언어: `TypeScript`
- 전역상태관리: `Recoil`
- 스타일: `Emotion`
- 서버통신: `Axios`


</br>

## 기능 구현

### 1. 로그인

<img width="40%" src='https://user-images.githubusercontent.com/81611808/191641893-cca52046-1c95-4837-8a99-ab04b94c92be.gif'/>
<img width="40%" src='https://user-images.githubusercontent.com/81611808/191641901-9ace5a92-b900-41a9-95c5-771e0b78491f.gif'/>(reactStrictMode: true로 인해 렌더링이 2번 되는 이슈. false설정 시 정상 동작합니다.)


</br>
</br>

**주요 파일** 
- components/: `LoginForm.tsx`, `useLoginForm.tsx`
- state/: `user.ts`
- hooks/: `useUser.tsx`
- utils/: `formValidate.ts`

### 1-1. 유효성 검사 로직

**요구 사항**

- 에러 메세지를 input focus가 해제되는 시점에 보여줍니다.
- 유효한 값을 입력하면 에러 메세지가 사라집니다.

**유효성 조건**
- input값이 있으면서 유효성 검사 테스트에 통과하지 못한 것을 
유효하지 않은 것으로 판단합니다.
- 값이 없는 것은 유효하지 않은 것이 아닌 아직 값을 입력하지 않은 것으로 간주해 에러 메세지가 나타나지 않게 합니다.
  > 입력값이 없는 것을 에러로 잡지 않는 것은 사용자가 값을 입력 후 다시 작성하기 위해 모두 지웠을 때,  
  > 에러 메세지가 계속 남아있지 않는게 사용성에 좋다고 생각했기 때문입니다. 하지만 로그인 버튼이 활성화되지 않게 처리했습니다.

**구현 방법**

유효성 검사는 입력될 때마다 실행하지만 에러 메세지는 focus가 해제 시에만 보여줍니다.

- 에러 메세지를 저장하는 객체를 ref, state 총 두개를 만듭니다.
- 입력될 때마다 유효성 검사를 해서 실패 시 ref에 해당 input 이름의 프로퍼티로 에러 메세지를 저장합니다. (ref니까 리렌더링 발생하지 않음)
- 포커스 해제 이벤트 발생 시 에러 state에 에러 ref값을 옮겨 리렌더링해서 에러 메세지를 렌더링합니다.
- 옳은 값이 입력될 경우 ref에는 해당 input 이름의 프로퍼티 자체를 제거하고, state에는 저장된 해당 에러 메세지를 제거해 setState+리렌더링해서 화면에서 메세지를 지웁니다.

</br>

### 1-2. 로그인 버튼 활성화
**조건** 

1. input값들이 모두 입력되어 있어야 합니다.
2. 모두 유효성 검사를 통과해서 에러 객체에 프로퍼티가 없어야 합니다.

**구현 방법**

매 렌더링 마다 이 로직들을 순회하며 조건을 체크합니다.
1. input값들을 모아둔 values state의 모든 프로퍼티의 값을 순회하며 빈 값이 있는지 체크합니다.
2. 에러 객체의 프로퍼티 갯수를 체크합니다.

위 조건들이 전부 달성됐을 때 로그인 버튼을 렌더링합니다.

</br>

### 1-3. 로그인 상태 저장

**조건**
- 새로 고침과 페이지 이동 시에도 로그인 상태가 유지되어야 합니다.
- 로그인 상태에 따라 동적으로 Header가 다르게 렌더링되어야 합니다.

**구현 방법**
- 로그인 요청 시 토큰을 세션스토리지에 저장하고 받은 응답인 유저 정보를 전역상태에 저장합니다. (recoil이용)
- 유저정보 전역 상태를 세션스토리지에도 저장해 창을 닫기 전까지 유지되도록합니다. (recoil-persist기능 이용)
- Header컴포넌트에서 전역 상태인 유저 정보를 불러와 값의 유무에 따라 조건부 렌더링합니다. (로그인되었을 시: 유저네임과 로그아웃, 안되었을 시 로그인 텍스트 렌더링)
- 로그아웃 텍스트를 클릭하면 세션 스토리지와 전역 상태에서 토큰과 유저 정보를 제거합니다.


> [로그인 구현 중의 트러블 슈팅 기록 링크입니다.](https://yoonnote.notion.site/f7b5c4ebcf4d493eb0dde2f21b3cc243)


</br>

### 2. 페이지네이션

<img width="40%" src='https://user-images.githubusercontent.com/81611808/191642259-c3189450-5c95-4681-877f-77fc5eb3eddb.gif'/>

**주요 파일** 
- components/: `Pagination.tsx`, `usePagination.tsx`
- pages/: `pagination.tsx`

**조건**
- 한 번에 보이는 페이지의 갯수는 5개 여야합니다.
- 페이지 클릭 시 url path가 변경되어야 합니다.
- 이전 범위 버튼 클릭 시 이전 범위의 마지막 페이지를 보여줘야 합니다.
- 다음 범위 버튼 클릭 시 다음 범위의 첫 번째 페이지를 보여줘야 합니다.
- 한 페이지 당 보여지는 상품의 개수는 10개입니다.

**ui를 만들기 위해 필요한 값들**
- 전체 페이지 갯수 (totalPageCount)
  - `Math.round(allProducts.length / PRODUCTS_LENGTH)`
- 보여지는 페이지 갯수 (limitPageCount)
- 현재 속한 페이지 숫자 (currentPage)
  - 현재 머물고 있는 페이지의 url path로 설정됩니다.

**ui구현 방법**

1. 모든 페이지를 5개씩 그룹지은 배열을 생성합니다.(`[1,2,3,4,5], [6,7,8,9,10],[11]`)
2. 현재 페이지가 속한 그룹의 index를 구합니다.
3. 위의 두 값들을 이용해 현재 페이지가 속한 그룹으로 페이지네이션을 렌더링합니다. (`pagesGroupList[currentGroupIndex]`)
4. 현재 페이지에 해당하는 페이지는 스타일을 다르게 주어 표시하고 비활성화합니다.
5. 이전 범위 버튼 클릭 시 `currentGroupIndex`가 1감소되고 이 값을 이용해 이전 범위 그룹으로 리렌더링합니다.
6. 현재 페이지는 현재 그룹의 가장 마지막 요소의 숫자로 변경합니다.
7. 다음 범위 버튼 클릭 시 `currentGroupIndex`가 1증가, 현재 그룹의 가장 첫번째 요소의 숫자로 현재 페이지가 변경됩니다.

**기능 구현 방법**

1. 페이지를 클릭하면 해당 페이지 번호를 포함한 url로 변경됩니다.
2. url에 속한 현재 페이지 번호로 currentPage상태를 변경해 ui를 리렌더링합니다.
3. url에 속한 페이지 숫자를 이용해 해당 범위의 데이터를 불러와 productList를 렌더링합니다.

**기타 구현 사항**
- 페이지에 직접 접속해도 동일하게 동작합니다.
- next의 Image태그를 사용해 lazyLoding되도록했습니다.
- 페이지 이동 시 스크롤이 가장 위로 이동하도록 했습니다.

</br>

### 3. 무한 스크롤

<img width="40%" src='https://user-images.githubusercontent.com/81611808/191642401-9d53835e-5273-4cef-9e72-3cd2f7da4787.gif'/>

**주요 파일** 
- pages/: `infinite-scroll.tsx`, `_app.tsx`
- hooks/: `useIntersect.tsx`

**조건**
- 스크롤이 페이지 하단에 도달하면 다음 상품을 이어서 보여줍니다.
- 더 이상 가져올 데이터가 없는 경우 요청이 나가지 않아야 합니다.
- 상품 상세 화면으로 이동했다가 다시 이전 페이지(/infinite-scroll)로 돌아오면 기존의 스크롤 위치로 되돌아와야합니다.

**무한 스크롤 구현 방법**
- 상품 리스트 가장 하단에 빈 div태그를 만듭니다.
- intersection observer기능을 이용해 div태그를 target으로 설정합니다.
- target요소가 화면에 보여질 때마다 currentPage에 해당하는 데이터를 불러와 기존 데이터(상태)에 누적시키고 상품 리스트를 렌더링합니다. 
- 다음 요청을 위해 currentPage에 1을 증가시킵니다.
- next의 Image태그를 사용해 lazyLoding되도록했습니다.

**스크롤 위치 되돌리기 구현 방법**
- 페이지를 이동할 때마다 세션 스토리지에 직전 페이지 경로를 업데이트하며 저장합니다.
- 상품 클릭 시 현재의 페이지의 정보들을 세션 스토리지에 저장합니다.
  - 상품 데이터
  - 스크롤 위치
  - 현재 페이지 숫자
- 무한 스크롤 페이지에 들어왔을 때 이전 페이지가 상품 페이지일 경우 세션 스토리지에 저장된 데이터들로 상태 값들을 초기화합니다.
 - 화면이 전부 렌더링되면 저장된 스크롤 위치로 이동합니다.


> [무한 스크롤 구현 중의 트러블 슈팅 기록 링크입니다.](https://yoonnote.notion.site/4e0779bc858d4a1cadbdc08896fc6829)


</br>

## 구현 하지 못한 것들
1. 상품 리스트 페이지, 상품 상세 페이지를 getServerSideProps기능을 이용해 프리렌더링하기
> 두 페이지는 검색엔진 최적화가 필요하다고 생각해 서버단에서 데이터를 불러와 프리렌더링을 하고 싶었으나 내부 서버 에러를 해결하지 못해 결국 구현하지 못했습니다.
2. 리액트 쿼리를 사용해 데이터 캐시하기
> 리액트 쿼리는 데이터 캐시를 알아서 해주어 불필요한 api 요청 수를 줄일 수 있고, 서버 통신 시 필요한 상태나 값들을 편리하게 사용할 수 있어 시도해봤으나, 에러 발생 시 에러 객체가 매우 늦게 전달되는 이슈가 있었고 해결하지 못하여 도입하지 못했습니다.

3. 무한 스크롤 페이지에서 새로 고침 시에 도 이전에 기억된 스크롤 위치로 이동하는 문제
> 페이지를 뒤로가기로 진입했을 때를 캐치하는 방법을 아직 찾지 못했습니다.
