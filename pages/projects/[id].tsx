import palettevault from "../../projects/palettevault";
import raebef from "../../projects/raebef";
import strangeastronaut from "../../projects/strangeastronaut";
import splatoon from "../../projects/splatoon3";
import diary from "../../projects/diary";
import placereview from "../../projects/placereview";
import metabeef from "../../projects/metabeef";
import memorytest from "../../projects/memorytest";
import simplememo from "../../projects/simplememo";
import digitalclock from "../../projects/clock";
import Footer from "../../components/Footer";
import Project from "../../components/Project";
import Seo from "../../components/Seo";
import styles from "../index.module.scss";
import { useRouter } from "next/router";
import { projectDataType } from "../../types";
import ClockApp from "../../components/ClockApp";
import MemoryTestApp from "../../components/MemoryTestApp";
import StrangeAstronautConsole from "../../components/StrangeAstronautConsole";

const Projects = (projectData: projectDataType) => {
  const { query } = useRouter();

  return (
    <main className={styles.container}>
      <Seo
        title={projectData?.name[0].toUpperCase() || "PORTFOLIO"}
        description={projectData?.description}
        img={projectData?.imgs && projectData.imgs[0].src}
        url={`https://rarebeef.co.kr/projects/${query.id}`}
      />
      {!projectData ? null : query.id === "digitalclock" ? (
        <Project data={projectData}>
          <ClockApp />
        </Project>
      ) : query.id === "memorytest" ? (
        <Project data={projectData}>
          <MemoryTestApp />
        </Project>
      ) : query.id === "strangeastronaut" ? (
        <Project data={projectData}>
          <StrangeAstronautConsole />
        </Project>
      ) : (
        <Project data={projectData} />
      )}
      <Footer />
    </main>
  );
};

export default Projects;

export async function getStaticProps({ params }: any) {
  const { id } = params;

  switch (id) {
    case "strangeastronaut":
      return {
        props: strangeastronaut,
      };
    case "raebef":
      return {
        props: raebef,
      };
    case "splatoon3":
      return {
        props: splatoon,
      };
    case "diary":
      return {
        props: diary,
      };
    case "palettevault":
      return {
        props: palettevault,
      };
    case "placereview":
      return {
        props: placereview,
      };
    case "metabeef":
      return {
        props: metabeef,
      };
    case "simplememo":
      return {
        props: simplememo,
      };
    case "digitalclock":
      return {
        props: digitalclock,
      };
    case "memorytest":
      return {
        props: memorytest,
      };
    default:
      return {
        props: {},
      };
  }
}

export async function getStaticPaths() {
  const paths: Array<{ params: { id: string } }> = [
    { params: { id: "strangeastronaut" } },
    { params: { id: "raebef" } },
    { params: { id: "splatoon3" } },
    { params: { id: "diary" } },
    { params: { id: "palettevault" } },
    { params: { id: "placereview" } },
    { params: { id: "metabeef" } },
    { params: { id: "simplememo" } },
    { params: { id: "digitalclock" } },
    { params: { id: "memorytest" } },
  ];

  return { paths, fallback: false };
}
