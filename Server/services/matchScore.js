const calculateMatchScore = (candidateSkills, requiredSkills) => {
  const matchedSkills = candidateSkills.filter((skill) =>
    requiredSkills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
  );

  const score =
    requiredSkills.length === 0
      ? 0
      : (matchedSkills.length / requiredSkills.length) * 100;

  return {
    matchedSkills,
    score: Math.round(score),
  };
};

export default calculateMatchScore;
