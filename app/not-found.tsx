
import CustomButton from "@/components/common/CustomButton";
import PaperTrace from "@/components/pagenotfound/PaperTrace";

const NotFoundPage = () => {
  return (
    <div className="relative h-dvh min-h-fit gap-7 w-full flex flex-col items-center  px-5 sm:px-8 md:px-12 py-10 md:py-20">
      <div className="text-center space-y-1">
        <h2 className="font-mono text-2xl font-semibold">
          404 — Off the Track
        </h2>
        <p className="text-muted-foreground text-sm">
          Looks like this route doesn't exist. Trace your way back and keep
          exploring.
        </p>
      </div>
      <div className="flex justify-center gap-5">
        <CustomButton label="Explore Playground" href="/playground" />
      </div>
      <PaperTrace />
    </div>
  );
};

export default NotFoundPage;
