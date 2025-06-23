const calculateMatchScore = (candidateSkills = [], requiredSkills = []) => {
  const normalize = (arr) =>
    arr.map((s) => s.trim().toLowerCase()).filter(Boolean);

  const candidateSet = new Set(normalize(candidateSkills));
  const requiredSet = new Set(normalize(requiredSkills));

  const matchedSkills = [...requiredSet].filter((skill) =>
    candidateSet.has(skill)
  );

  const score =
    requiredSet.size === 0
      ? 0
      : (matchedSkills.length / requiredSet.size) * 100;

  return {
    matchedSkills,
    score: Math.round(score),
  };
};

export default calculateMatchScore;
