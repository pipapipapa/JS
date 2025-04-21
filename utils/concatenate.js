export function concatenate(arr, separator) {
    if (!Array.isArray(arr)) {
      return "";
    }

    let str = arr[0]

    for (let i = 1; i < arr.length; ++i){
      str += separator + arr[i];
    }

    return str
  }