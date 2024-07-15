const NavigationHeader = ({ role }) => {
  return (
    <div className="flex gap-5 mb-3">
      <a href={`/${role}/jobs`} className="text-xl">
        Browse On-Site jobs
      </a>
      <a href={`/${role}/all-jobs`} className="text-xl">
        Browse All Jobs
      </a>
    </div>
  );
};
export default NavigationHeader;
