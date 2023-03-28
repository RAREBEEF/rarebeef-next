import palettevault from "../../projects/palettevault";
import raebef from "../../projects/raebef";
import splatoon from "../../projects/splatoon";
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
import { sectionDataType } from "../../types";
import { useEffect, useState } from "react";
import ClockApp from "../../components/ClockApp";
import MemoryTestApp from "../../components/MemoryTestApp";

const Projects = () => {
  const { query } = useRouter();
  const [projectData, setProjectData] = useState<sectionDataType | null>(null);

  useEffect(() => {
    if (typeof query.id !== "string") return;

    switch (query.id) {
      case "raebef":
        setProjectData(raebef);
        break;
      case "splatoon":
        setProjectData(splatoon);
        break;
      case "diary":
        setProjectData(diary);
        break;
      case "palettevault":
        setProjectData(palettevault);
        break;
      case "placereview":
        setProjectData(placereview);
        break;
      case "metabeef":
        setProjectData(metabeef);
        break;
      case "simplememo":
        setProjectData(simplememo);
        break;
      case "digitalclock":
        setProjectData(digitalclock);
        break;
      case "memorytest":
        setProjectData(memorytest);
        break;
      default:
        break;
    }
  }, [query]);

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
      ) : (
        <Project data={projectData} />
      )}
      <Footer />
    </main>
  );
};

export default Projects;
