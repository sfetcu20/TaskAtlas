// default maxPills value was selected to be higher than the maximum possible specifications depending on property type
const createSkillsArray = (post, maxPills = 6) => {
  const skills = post?.skillsRequired;

  if (!skills) {
    return [];
  }

  return skills.slice(0, maxPills);
};

export default createSkillsArray;
