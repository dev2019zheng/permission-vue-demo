/**
 * Created by fuyun on 2021/1/11.
 */

export function fetchExampleData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        Array.apply(null, { length: 12 })
          .fill("")
          .map((_, i) => ({
            key: ("" + i).padStart(6, "0"),
            month: i + 1,
            sum: ~~(Math.random() * 9999),
            check: "name" + i
          }))
      );
    }, 100);
  });
}
