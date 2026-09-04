import WindowShutter from "@/components/experience/WindowShutter";
import TrainLEDInfo from "@/components/experience/TrainLEDInfo";
import Timeline from "@/components/experience/TimeLine";

const ExperiencePage = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center  py-10">
      <WindowShutter />
      {/* <TrainLEDInfo /> */}
      <Timeline />
    </section>
  );
};

export default ExperiencePage;
