const NavigationHeader = () => {
  return (
    <div className="flex gap-5 mb-3">
      <a href="/client/jobs" className="text-xl">
        Browse On-Site jobs
      </a>
      <a href="/client/all-jobs" className="text-xl">
        Browse All Jobs
      </a>
    </div>
  );
};
export default NavigationHeader;
