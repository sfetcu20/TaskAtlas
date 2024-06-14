import createSkillsArray from '../../functions/create-skills-array';
import generateHash from '../../functions/generate-hash';
import JobCardPill from './JobCardPill';

const JobsSkillsPills = ({ post, maxPills }) => {
  const skills = createSkillsArray(post, maxPills);

  const showPills = (skill) => {
    return <JobCardPill name={skill} key={generateHash()} />;
  };

  return <div className="no-scrollbar flex gap-4">{skills?.map(showPills)}</div>;
};

export default JobsSkillsPills;
