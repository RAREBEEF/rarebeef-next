import Seo from "../../components/Seo";
import styles from "../index.module.scss";
import ReactNative from "../../components/ReactNative";
import Footer from "../../components/Footer";
import img from "../../public/screenshots/react-native.png";

const Reactnative = () => {
  return (
    <main className={styles.container}>
      <Seo
        title="REACT NATIVE"
        description="ToDo와 날씨 모바일 애플리케이션입니다.\nReact Native와 Expo를 사용해 프로젝트를 진행하였습니다. ToDo 앱에는 Drag & Drop, Progress bar 등의 기능을 구현하였고 날씨 앱에는 geoLocation, weather api 등의 기능을 구현하였습니다.\n앱이 배포까지 이뤄지지 못한 대신 3D 모델과 Three.js로 앱의 모습을 대신 표현해 보았습니다."
        url={`https://rarebeef.co.kr/projects/reactnative`}
        img={img.src}
      />
      <ReactNative />
      <Footer />
    </main>
  );
};

export default Reactnative;
