const calculateMatchScore = (candidateSkills, requiredSkills) => {
  const matchedSkills = candidateSkills.filter((skills) =>
    requiredSkills.includes(skills.toLowerCase())
  );
  const score = (matchedSkills.length / requiredSkills.length) * 100;
  return {
    matchedSkills,
    score: Math.round(score),
  };
};
