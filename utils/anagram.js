function sortWord(word) {
  return word.toLowerCase().split('').sort().join('');
}

export function anagram(words) {
  if (!Array.isArray(words)) {
    return [];
  }

  const anagramMap = new Map();

  words.forEach(word => {
    const sorted = sortWord(word);

    if (!anagramMap.has(sorted)) {
      anagramMap.set(sorted, []);
    }

    if (!anagramMap.get(sorted).includes(word.toLowerCase())){
          anagramMap.get(sorted).push(word.toLowerCase());
    }
  });

  const groups = [];
  anagramMap.forEach(group => {
    if (group.length >= 2){
      groups.push(group.sort());
    }
  });

  groups.sort();

  return groups;
}