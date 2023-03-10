import Joyride from "react-joyride";

const ProjectTour = () => {
  const steps = [
    {
      target: "h2",
      content: (
        <>
          <p>This is the starting point of the app - the projects page</p>
          <hr />
          <p>Click on any individual project to see more details</p>
        </>
      ),
    },
  ];

  return <Joyride run={true} steps={steps} />;
};
export default ProjectTour;
