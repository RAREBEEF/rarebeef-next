import Link from "next/link";

const NotFound = () => {
  return (
    <main>
      <h2>404 Not Found</h2>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          row-gap: 20px;
          padding: 10px;
          word-break: keep-all;
          text-align: center;
          h2 {
            font: {
              size: 30px;
              weight: 700;
            }
          }
          p {
            font: {
              size: 20px;
              weight: 500;
            }
          }
          a {
            text-decoration: underline;
          }
        }
      `}</style>
    </main>
  );
};

export default NotFound;
