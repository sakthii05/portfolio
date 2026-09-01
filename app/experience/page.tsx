import WindowShutter from "@/components/experience/WindowShutter";
import TrainLEDInfo from "@/components/experience/TrainLEDInfo";

const ExperiencePage = () => {

  return (
    <>
      <div className="relative w-full h-full max-w-250 overflow-hidden flex flex-col justify-center items-center gap-8">
        <WindowShutter />
        <TrainLEDInfo />
      </div>
    </>
  );
};

export default ExperiencePage;
