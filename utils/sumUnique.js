export function sumUnique(arr) {
    if (!Array.isArray(arr)) {
      return 0;
    }

    const uniqueNumbers = new Set(arr);
    let sum = 0;
    uniqueNumbers.forEach(num => {
      sum += num;
    });
    return sum;
  }