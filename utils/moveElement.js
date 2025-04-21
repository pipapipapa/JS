export function moveElement(arr, from, to) {
    if (!Array.isArray(arr)) {
      return;
    }

    if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) {
      return;
    }

    if (from === to) {
      return;
    }
  
    const element = arr[from]
    for (let i = from; i < to; ++i){
      arr[i] = arr[i + 1]
    }
    arr[to] = element
  }